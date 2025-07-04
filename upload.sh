#!/bin/bash

# This script reads markdown files from flashduty/zh and flashduty/en,
# formats them into JSON, and uploads them to a Meilisearch instance one by one.

# Exit immediately if a command exits with a non-zero status.
set -e

# Check for required environment variables.
if [[ -z "$MEILI_ENDPOINT" || -z "$MEILI_API_KEY" || -z "$MEILI_INDEX" ]]; then
  echo "错误: 请设置 MEILI_ENDPOINT, MEILI_API_KEY, 和 MEILI_INDEX 环境变量。" >&2
  exit 1
fi

# Check for jq, which is required for JSON manipulation.
if ! command -v jq &> /dev/null; then
    echo "错误: 未找到 jq 命令。请安装 jq 后再运行此脚本。" >&2
    echo "在 macOS 上, 可以通过 Homebrew 安装: brew install jq" >&2
    exit 1
fi

# Global counters
total_success=0
total_files=0
total_errors=0

# Function to upload a single document to Meilisearch
upload_document() {
    local json_payload=$1
    local title=$2
    
    # Upload the JSON payload to Meilisearch
    response=$(curl -sS -X POST "$MEILI_ENDPOINT/indexes/$MEILI_INDEX/documents?primaryKey=id" \
      -H "Authorization: Bearer $MEILI_API_KEY" \
      -H "Content-Type: application/json" \
      --data-binary "$json_payload")

    # Check if the upload was successful by inspecting the response.
    if echo "$response" | jq -e '.taskUid' > /dev/null 2>&1; then
        echo "✓ 成功上传: $title"
        return 0
    else
        echo "✗ 上传失败: $title" >&2
        echo "响应内容:" >&2
        echo "$response" >&2
        return 1
    fi
}

# Function to clean content for JSON processing - simplified version
clean_content() {
    local file=$1
    # Simple approach: just read the file and let jq handle the escaping
    cat "$file"
}

# Function to process files in a directory
process_directory() {
    local dir=$1
    local locale=$2
    local success_count=0
    local error_count=0
    local file_count=0
    
    echo "正在处理 $dir 目录..."
    
    # Create temporary files to store results due to subshell variable scope issues
    local temp_success=$(mktemp)
    local temp_error=$(mktemp)
    local temp_total=$(mktemp)
    
    # Initialize temp files
    echo "0" > "$temp_success"
    echo "0" > "$temp_error"
    echo "0" > "$temp_total"
    
    # Process each markdown file using a different approach to avoid subshell
    # Exclude index.md files from processing
    find "$dir" -type f -name "*.md" ! -name "index.md" | while IFS= read -r file; do
        # Extract title from filename
        title=$(basename "$file" .md | sed 's/^[0-9.]*[[:space:]]*//')
        
        # Generate MD5 hash for ID
        id=$(echo -n "$title" | openssl md5 | awk '{print $NF}')

        # Create JSON payload for single document
        if json_payload=$(jq -n \
            --arg id "$id" \
            --arg title "$title" \
            --rawfile content "$file" \
            --arg locale "$locale" \
            '{id: $id, title: $title, content: $content, locale: $locale}' 2>/dev/null); then
            
            # Upload this document
            if upload_document "$json_payload" "$title"; then
                echo $(($(cat "$temp_success") + 1)) > "$temp_success"
            else
                echo $(($(cat "$temp_error") + 1)) > "$temp_error"
            fi
        else
            echo "✗ JSON解析失败: $title (文件: $file)" >&2
            echo $(($(cat "$temp_error") + 1)) > "$temp_error"
        fi
        
        echo $(($(cat "$temp_total") + 1)) > "$temp_total"
        current_total=$(cat "$temp_total")
        echo "当前目录进度: $current_total 个文件处理完成"
    done
    
    # Read final counts from temp files
    final_success=$(cat "$temp_success")
    final_error=$(cat "$temp_error")
    final_total=$(cat "$temp_total")
    
    # Update global counters
    total_success=$((total_success + final_success))
    total_errors=$((total_errors + final_error))
    total_files=$((total_files + final_total))
    
    echo "完成处理 $dir: 成功 $final_success 个, 失败 $final_error 个"
    
    # Clean up temp files
    rm -f "$temp_success" "$temp_error" "$temp_total"
}

echo "开始处理文档并逐个上传到 Meilisearch 索引: $MEILI_INDEX"

# Process directories
if [ -d "flashduty/zh" ]; then
    process_directory "flashduty/zh" "zh-CN"
else
    echo "警告: flashduty/zh 目录不存在"
fi

if [ -d "flashduty/en" ]; then
    process_directory "flashduty/en" "en-US"
else
    echo "警告: flashduty/en 目录不存在"
fi

# Summary
echo ""
echo "=== 上传总结 ==="
echo "总文件数: $total_files"
echo "成功上传: $total_success"
echo "失败数量: $total_errors"

if [ $total_files -gt 0 ]; then
    success_rate=$((total_success * 100 / total_files))
    echo "成功率: ${success_rate}%"
fi

if [ $total_errors -gt 0 ]; then
    echo "存在失败的文件上传，请检查错误信息。"
    exit 1
else
    echo "所有文件上传成功！"
fi

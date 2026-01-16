# Apifox 文档批量管理脚本

用于批量管理 Apifox 文档的工具脚本。

## 脚本列表

| 脚本 | 功能 |
|------|------|
| `apifox-rename.mjs` | 批量去掉文档名称中的数字前缀 |
| `apifox-seo-sync.mjs` | 从文档 frontmatter 同步 SEO 配置 |

## 前置准备

### 1. 获取认证信息

在浏览器中打开 Apifox，按 F12 打开开发者工具，切换到 Network 面板，然后执行任意操作（如修改文档），从请求中获取以下信息：

- **Cookie**: 包含 `Authorization=Bearer xxx` 的完整 Cookie
- **x-project-id**: 项目 ID
- **x-branch-id**: 分支 ID
- **x-device-id**: 设备 ID

### 2. 更新脚本配置

编辑脚本文件，更新 Configuration 部分的常量：

```javascript
const PROJECT_ID = "your_project_id";
const BRANCH_ID = "your_branch_id";
const DEVICE_ID = "your_device_id";
const COOKIE = "your_cookie";
```

或通过环境变量设置：

```bash
export APIFOX_COOKIE="your_cookie"
```

### 3. 准备数据文件

#### docs-backup.json

从 Apifox API 获取文档列表并保存：

```
GET https://api.apifox.com/api/v1/docs?locale=zh-CN
```

将返回的 JSON 保存到 `scripts/docs-backup.json`。

#### seo-infos-backup.json（仅 SEO 同步需要）

从 Apifox API 获取 SEO 配置并保存：

```
GET https://api.apifox.com/api/v1/projects/{projectId}/seo-infos?locale=zh-CN
```

将返回的 JSON 保存到 `scripts/seo-infos-backup.json`。

---

## apifox-rename.mjs

批量去掉文档名称中的数字前缀，如 `1. Introduction` → `Introduction`。

### 使用方法

```bash
# 1. 预览要修改的文档
node scripts/apifox-rename.mjs preview

# 2. 检查 rename-preview.json 确认无误后执行
node scripts/apifox-rename.mjs apply
```

### 匹配规则

去掉以下格式的前缀：
- `1. ` → 空
- `1.2 ` → 空
- `1.2.3 ` → 空

---

## apifox-seo-sync.mjs

从文档内容的 frontmatter 中提取 `title` 和 `url`，同步到 Apifox SEO 配置。

### 使用方法

```bash
# 1. 预览要更新的 SEO 配置
node scripts/apifox-seo-sync.mjs preview

# 2. 检查 seo-sync-preview.json 确认无误后执行
node scripts/apifox-seo-sync.mjs apply
```

### Frontmatter 格式

脚本会解析文档开头的 YAML frontmatter：

```markdown
---
title: "Document Title"
description: "Document description"
url: "https://docs.flashcat.cloud/en/path/to/doc"
---

文档内容...
```

提取规则：
- `title` → SEO 标题
- `url` → 去掉域名后作为 SEO 路径（如 `/en/path/to/doc`）

---

## API 参考

| 操作 | Method | Endpoint |
|------|--------|----------|
| 获取文档列表 | GET | `/api/v1/docs?locale=zh-CN` |
| 修改文档名称 | PUT | `/api/v1/doc/{docId}?locale=zh-CN` |
| 获取 SEO 配置 | GET | `/api/v1/projects/{projectId}/seo-infos?locale=zh-CN` |
| 更新 SEO 配置 | POST | `/api/v1/projects/{projectId}/seo-infos?locale=zh-CN` |

### 必需的请求头

```
Content-Type: application/json;charset=UTF-8
Cookie: Authorization=Bearer xxx; Authorization.sig=xxx
Origin: https://app.apifox.com
Referer: https://app.apifox.com/
x-project-id: {projectId}
x-branch-id: {branchId}
x-device-id: {deviceId}
x-client-mode: web
x-client-version: 2.8.2-alpha.2
```

---

## 注意事项

1. **Cookie 有效期**：Cookie 会过期，如遇 401/403 错误，需重新获取
2. **分支 ID**：不同分支的 `x-branch-id` 不同，切换分支后需更新
3. **请求频率**：脚本默认每次请求间隔 300ms，避免触发限流
4. **预览优先**：始终先运行 `preview` 确认无误后再 `apply`

# 告警规则 Description 模板使用手册

本文档说明告警规则 `Description` 字段中可使用的变量和函数。

`Description` 字段使用 Go `text/template` 渲染。模板语法遵循 Go template 规则，包括 `{{ ... }}`、`if`、`range`、变量赋值、管道和比较操作等。

## 基本语法

使用 `{{ ... }}` 输出变量或表达式结果：

```gotemplate
当前值：{{ printf "%.2f" $value }}
```

使用 `if` 做条件判断：

```gotemplate
{{- if eq $status "firing" }}
告警已触发。
{{- else }}
告警已恢复。
{{- end }}
```

使用 `range` 遍历列表：

```gotemplate
{{- range $row := $relates.R1 }}
- 日志内容：{{ $row.Fields._msg }}
{{- end }}
```

如果 map 的 key 包含 `.`, `/`, `-`, `$` 等特殊字符，应使用 Go template 内置的 `index` 函数读取：

```gotemplate
{{ index $labels "service.name" }}
{{ index $values "$A.latency" }}
{{ index $row.Fields "log.message" }}
```

## 内置变量

以下短变量会在用户模板渲染前自动注入。

| 变量 | 类型 | 说明 |
| --- | --- | --- |
| `$labels` | `map[string]string` | 告警数据点的标签，等价于 `.DataLabels`。 |
| `$values` | `map[string]float64` | 告警计算中使用到的数值，等价于 `.Values`。 |
| `$value` | `float64` | 主告警值，等价于 `.Value`。 |
| `$appendLabels` | `map[string]string` | 规则上配置的附加标签，已完成标签变量替换，等价于 `.AppendLabels`。 |
| `$annotations` | `map[string]string` | 规则上配置的自定义字段，已完成标签变量替换，等价于 `.Annotations`。 |
| `$dsType` | `string` | 数据源类型，等价于 `.DataSourceType`。 |
| `$dsName` | `string` | 数据源名称，等价于 `.DataSourceName`。 |
| `$dsAddress` | `string` | 数据源地址，不包含认证信息，等价于 `.DataSourceAddress`。 |
| `$checkMode` | `string` | 检测模式，例如 `threshold`、`anydata`、`nodata`，等价于 `.CheckMode`。 |
| `$relates` | `map[string][]*ResultRow` | 关联查询结果，key 是关联查询名称，等价于 `.Relates`。 |
| `$status` | `string` | 事件状态：`firing` 或 `recovered`，等价于 `.Status`。 |
| `$severity` | `string` | 告警级别，例如 `Critical`、`Warning`、`Info`，等价于 `.Severity`。 |

示例：

```gotemplate
{{- if eq $status "firing" }}
{{ $dsName }} 触发 {{ $severity }} 告警，当前值为 {{ printf "%.2f" $value }}。
{{- else }}
{{ $dsName }} 告警已恢复。
{{- end }}
```

```gotemplate
实例：{{ index $labels "instance" }}
A 查询值：{{ getvalue $values "$A" "%.2f" }}
```

## 根对象字段

模板的根对象是完整的告警事件，可以通过 `.FieldName` 访问字段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `.Hash` | `string` | 稳定的事件 hash。同一个事件的告警和恢复使用相同 hash。 |
| `.DataSourceType` | `string` | 数据源类型。 |
| `.DataSourceName` | `string` | 数据源名称。 |
| `.DataSourceAddress` | `string` | 数据源地址，不包含认证信息。 |
| `.RuleName` | `string` | 告警规则名称。 |
| `.RuleID` | `uint64` | 告警规则 ID。 |
| `.Queries` | `[]Query` | 规则查询定义。 |
| `.RelateQueries` | `[]RelateQuery` | 关联查询定义。 |
| `.CheckMode` | `string` | 检测模式。 |
| `.DataLabels` | `map[string]string` | 告警标签。 |
| `.AppendLabels` | `map[string]string` | 规则上配置的附加标签。 |
| `.EnrichLabels` | `map[string]string` | enrichment 返回的标签。通常在渲染 `Description` 时为空，因为 enrichment 发生在描述渲染之后。 |
| `.Values` | `map[string]float64` | 告警计算中使用到的数值。 |
| `.Annotations` | `map[string]string` | 规则自定义字段。 |
| `.Relates` | `map[string][]*ResultRow` | 关联查询结果行。 |
| `.Status` | `string` | `firing` 或 `recovered`。 |
| `.Severity` | `string` | 告警级别。 |
| `.EvalTime` | `int64` | 本次评估时间，Unix 秒级时间戳。 |
| `.Description` | `string` | 渲染后的描述。该字段在模板执行完成后才设置。 |
| `.DescriptionType` | `string` | 描述类型，例如 `text` 或 `markdown`。 |
| `.Value` | `float64` | 主告警值。 |
| `.TitleRule` | `string` | edge 上配置的标题规则。 |
| `.DebugLogEnabled` | `bool` | 当前规则是否启用调试日志。该字段主要用于内部诊断。 |
| `.LogPrefix` | `string` | 本次评估的内部日志前缀。该字段主要用于内部诊断。 |

示例：

```gotemplate
规则 {{ .RuleID }} / {{ .RuleName }} 在 {{ .DataSourceName }} 上触发。
```

`.Queries` 中的 `Query` 对象包含以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `.Name` | `string` | 查询名称，通常是 `A`、`B`、`C` 等。 |
| `.Expr` | `string` | 查询表达式。 |
| `.LabelFields` | `[]string` | 作为标签使用的字段。 |
| `.ValueFields` | `[]string` | 作为数值使用的字段。 |
| `.Args` | `map[string]string` | 部分数据源需要的额外查询参数。 |

`.RelateQueries` 中的 `RelateQuery` 对象包含以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `.Name` | `string` | 关联查询名称，例如 `R1`。 |
| `.Expr` | `string` | 关联查询表达式。 |
| `.Args` | `map[string]string` | 部分数据源需要的额外查询参数。 |

## 关联查询结果行

关联查询结果通过 `$relates` 访问。map 的 key 是关联查询名称，例如 `R1`。

每一行包含以下字段和方法：

| 字段或方法 | 类型 | 说明 |
| --- | --- | --- |
| `$row.Fields` | `map[string]interface{}` | 关联查询返回的非数值字段或展示字段。 |
| `$row.Values` | `map[string]float64` | 关联查询返回的数值字段。 |
| `$row.Field "name"` | `interface{}` | 从 `$row.Fields` 读取一个字段。 |
| `$row.Value` | `float64` | 返回 `$row.Values` 中的第一个数值；如果没有数值则返回 `NaN`。 |
| `$row.Value "name"` | `float64` | 从 `$row.Values` 读取一个数值；如果 key 不存在则返回 `NaN`。 |
| `$row.String` | `string` | 返回该行的调试字符串。 |

示例：

```gotemplate
{{- range $row := $relates.R1 }}
- 日志：{{ $row.Fields._msg }}
- 次数：{{ printf "%.0f" ($row.Value "count") }}
{{- end }}
```

```gotemplate
{{- range $row := $relates.R1 }}
  {{- $msg := printf "%v" ($row.Field "_msg") }}
  {{- if sprig_contains "Unknown column" $msg }}
    {{- $field := sprig_regexReplaceAll ".*Unknown column '([^']+)'.*" $msg "$1" }}
- 缺失字段：{{ $field }}
  {{- end }}
{{- end }}
```

## Go Template 内置函数

以下函数由 Go `text/template` 提供。

| 函数 | 说明 | 示例 |
| --- | --- | --- |
| `and` | 逻辑 AND。结果确定后停止继续求值。 | `{{ if and $a $b }}yes{{ end }}` |
| `or` | 逻辑 OR。结果确定后停止继续求值。 | `{{ if or $a $b }}yes{{ end }}` |
| `not` | 逻辑 NOT。 | `{{ if not $ok }}failed{{ end }}` |
| `eq` | 等于。 | `{{ if eq $status "firing" }}...{{ end }}` |
| `ne` | 不等于。 | `{{ if ne $severity "Info" }}...{{ end }}` |
| `lt` | 小于。 | `{{ if lt $value 10.0 }}...{{ end }}` |
| `le` | 小于等于。 | `{{ if le $value 10.0 }}...{{ end }}` |
| `gt` | 大于。 | `{{ if gt $value 10.0 }}...{{ end }}` |
| `ge` | 大于等于。 | `{{ if ge $value 10.0 }}...{{ end }}` |
| `index` | 从 map、slice 或 array 中读取元素。 | `{{ index $labels "instance" }}` |
| `slice` | 对字符串、slice 或 array 做切片。 | `{{ slice "abcdef" 0 3 }}` |
| `len` | 返回长度。 | `{{ len $relates.R1 }}` |
| `printf` | 使用 `fmt.Sprintf` 语法格式化文本。 | `{{ printf "%.2f" $value }}` |
| `print` | 使用默认格式拼接多个值。 | `{{ print $dsName ":" $status }}` |
| `println` | 类似 `print`，但会追加换行。 | `{{ println $dsName }}` |
| `call` | 调用函数值。Description 中通常很少使用。 | `{{ call .SomeFunc }}` |
| `html` | 按 HTML 规则转义文本。 | `{{ html $text }}` |
| `js` | 按 JavaScript 规则转义文本。 | `{{ js $text }}` |
| `urlquery` | 按 URL query 规则转义文本。 | `{{ urlquery $text }}` |

## monit-edge 自定义函数

以下函数由 monit-edge 注册，使用时不需要前缀。

| 函数 | 说明 | 示例 |
| --- | --- | --- |
| `pathEscape text` | 对 URL path 做转义。 | `{{ pathEscape "a/b c" }}` |
| `queryEscape text` | 对 URL query 做转义。 | `{{ queryEscape "level=error msg" }}` |
| `getvalue values key [format]` | 从 `map[string]float64` 中读取数值并格式化。默认格式是 `%.4f`。如果 key 为空或不存在，会返回 `template_function_error: ...` 文本。 | `{{ getvalue $values "$A" "%.2f" }}` |
| `getfvalue values key` | 从 `map[string]float64` 中读取数值。如果 key 为空或不存在，返回 `NaN`。 | `{{ if gt (getfvalue $values "$A") 10.0 }}high{{ end }}` |
| `trunc count text` | `truncRune` 的别名。按 Unicode 字符截断，不按字节截断。`count` 为负数时从末尾保留字符。 | `{{ trunc 10 $msg }}` |
| `truncRune count text` | 按 Unicode 字符截断。 | `{{ truncRune -8 "abcdef你好" }}` |
| `runeCount text` | 统计 Unicode 字符数。 | `{{ runeCount "你好abc" }}` |
| `args ...` | 构造一个 map，key 为 `arg0`、`arg1` 等。主要用于组合 helper 调用。 | `{{ args "a" 1 }}` |
| `reReplaceAll pattern repl text` | 正则替换。参数顺序是 `pattern`、`replacement`、`text`。正则非法时会导致模板渲染失败。 | `{{ reReplaceAll ".*id=([0-9]+).*" "$1" $msg }}` |
| `safeHtml text` | 将文本标记为 HTML 安全文本。普通 text 或 markdown 描述不建议使用，除非明确需要 HTML 输出。 | `{{ safeHtml "<b>OK</b>" }}` |
| `match pattern text` | 正则匹配，等价于 Go `regexp.MatchString`。正则非法时会导致模板渲染失败。 | `{{ if match "Unknown column" $msg }}...{{ end }}` |
| `toUpper text` | 转成大写。 | `{{ toUpper $severity }}` |
| `toLower text` | 转成小写。 | `{{ toLower $status }}` |
| `stripPort hostPort` | 从 `host:port` 中去掉端口。如果解析失败，返回原始值。 | `{{ stripPort "example.com:9100" }}` |
| `stripDomain hostPort` | 去掉主机名中的域名后缀，并保留端口。IP 地址会原样返回。 | `{{ stripDomain "node01.prod.local:9100" }}` |
| `humanize value` | 使用 SI 单位格式化数字。 | `{{ humanize 12345 }}` |
| `humanize1024 value` | 使用 1024 进制单位格式化数字。 | `{{ humanize1024 1048576 }}` |
| `humanizeDuration seconds` | 将秒数格式化为可读时长。 | `{{ humanizeDuration 3661 }}` |
| `humanizePercentage value` | 将比例格式化为百分比。`0.1234` 会变成 `12.34%`。 | `{{ humanizePercentage 0.95 }}` |
| `humanizeTimestamp seconds` | 将 Unix 秒级时间戳转为 UTC 时间文本。 | `{{ humanizeTimestamp .EvalTime }}` |
| `toTime seconds` | 将 Unix 秒级时间戳转为 `time.Time`。 | `{{ (toTime .EvalTime).Format "2006-01-02 15:04:05" }}` |
| `nanoTime value [tzOffset]` | 将 Unix 纳秒级时间戳转为 `time.Time`。可选时区偏移单位为小时。 | `{{ (nanoTime $row.Fields.__time__ 8).Format "2006-01-02 15:04:05" }}` |
| `timeFormat value format [tzOffset]` | 格式化 `time.Time`、`*time.Time`、RFC3339 字符串或 RFC3339Nano 字符串。可选时区偏移单位为小时。 | `{{ timeFormat "2026-01-06T11:48:12Z" "2006-01-02 15:04:05" 8 }}` |
| `parseDuration duration` | 解析时长字符串并返回秒数。支持的单位遵循 monit-edge 的 duration 解析规则。 | `{{ parseDuration "5m" }}` |
| `add a b` | 数值加法。 | `{{ add 1 2 }}` |
| `sub a b` | 数值减法。 | `{{ sub 10 3 }}` |
| `mul a b` | 数值乘法。 | `{{ mul $value 100 }}` |
| `div a b` | 数值除法。除零会导致模板渲染失败。 | `{{ div $value 1024 }}` |
| `now` | 当前时间，类型为 `time.Time`。 | `{{ now.Format "2006-01-02 15:04:05" }}` |
| `toString value` | 使用 `fmt.Sprint` 将值转为字符串。 | `{{ toString $row.Fields._msg }}` |

## Sprig 函数

monit-edge 也注册了 Sprig 函数，但所有 Sprig 函数都必须带 `sprig_` 前缀。

例如：

```gotemplate
{{ sprig_contains "error" $msg }}
{{ sprig_regexMatch "Unknown column" $msg }}
{{ sprig_regexFind "Unknown column '[^']+'" $msg }}
```

不要使用不带前缀的 Sprig 函数名，例如 `contains`、`regexMatch`、`regexFind`；这些名字没有注册。

正则使用注意事项：`sprig_regexFind` 返回的是完整匹配文本，不返回捕获组。如果要提取捕获组，请使用 `sprig_regexReplaceAll`：

```gotemplate
{{- $msg := "Unknown column 'community_posts.comment_count' in 'field list'" }}
{{- sprig_regexReplaceAll ".*Unknown column '([^']+)'.*" $msg "$1" }}
```

结果是：

```text
community_posts.comment_count
```

### 常用 Sprig 函数

| 函数 | 说明 | 示例 |
| --- | --- | --- |
| `sprig_contains substr text` | 判断 `text` 是否包含 `substr`。 | `{{ if sprig_contains "Unknown column" $msg }}...{{ end }}` |
| `sprig_hasPrefix prefix text` | 判断前缀。 | `{{ sprig_hasPrefix "prod-" $name }}` |
| `sprig_hasSuffix suffix text` | 判断后缀。 | `{{ sprig_hasSuffix ".log" $file }}` |
| `sprig_regexMatch pattern text` | 正则匹配。 | `{{ sprig_regexMatch "error|failed" $msg }}` |
| `sprig_regexFind pattern text` | 返回第一个完整正则匹配。 | `{{ sprig_regexFind "trace_id=[a-z0-9]+" $msg }}` |
| `sprig_regexFindAll pattern text n` | 返回最多 `n` 个完整正则匹配。`-1` 表示全部返回。 | `{{ sprig_regexFindAll "id=[0-9]+" $msg -1 }}` |
| `sprig_regexReplaceAll pattern text repl` | 正则替换。参数顺序是 `pattern`、`text`、`replacement`。 | `{{ sprig_regexReplaceAll ".*id=([0-9]+).*" $msg "$1" }}` |
| `sprig_trim text` | 去掉首尾空白字符。 | `{{ sprig_trim $msg }}` |
| `sprig_lower text` | 转小写。 | `{{ sprig_lower $severity }}` |
| `sprig_upper text` | 转大写。 | `{{ sprig_upper $severity }}` |
| `sprig_default default value` | 当 `value` 为空时使用默认值。 | `{{ sprig_default "unknown" (index $labels "instance") }}` |
| `sprig_toJson value` | 将值转为 JSON。 | `{{ sprig_toJson $labels }}` |
| `sprig_dict ...` | 创建字典。 | `{{ sprig_dict "name" $dsName "status" $status }}` |
| `sprig_list ...` | 创建列表。 | `{{ sprig_list "a" "b" "c" }}` |

### 完整 Sprig 函数名列表

当前 monit-edge 构建中可使用以下函数名：

```text
sprig_abbrev
sprig_abbrevboth
sprig_add
sprig_add1
sprig_add1f
sprig_addf
sprig_adler32sum
sprig_ago
sprig_all
sprig_any
sprig_append
sprig_atoi
sprig_b32dec
sprig_b32enc
sprig_b64dec
sprig_b64enc
sprig_base
sprig_bcrypt
sprig_biggest
sprig_buildCustomCert
sprig_camelcase
sprig_cat
sprig_ceil
sprig_chunk
sprig_clean
sprig_coalesce
sprig_compact
sprig_concat
sprig_contains
sprig_date
sprig_dateInZone
sprig_dateModify
sprig_date_in_zone
sprig_date_modify
sprig_decryptAES
sprig_deepCopy
sprig_deepEqual
sprig_default
sprig_derivePassword
sprig_dict
sprig_dig
sprig_dir
sprig_div
sprig_divf
sprig_duration
sprig_durationRound
sprig_empty
sprig_encryptAES
sprig_env
sprig_expandenv
sprig_ext
sprig_fail
sprig_first
sprig_float64
sprig_floor
sprig_fromJson
sprig_genCA
sprig_genCAWithKey
sprig_genPrivateKey
sprig_genSelfSignedCert
sprig_genSelfSignedCertWithKey
sprig_genSignedCert
sprig_genSignedCertWithKey
sprig_get
sprig_getHostByName
sprig_gt
sprig_gte
sprig_has
sprig_hasKey
sprig_hasPrefix
sprig_hasSuffix
sprig_hello
sprig_htmlDate
sprig_htmlDateInZone
sprig_htpasswd
sprig_indent
sprig_initial
sprig_initials
sprig_int
sprig_int64
sprig_isAbs
sprig_join
sprig_kebabcase
sprig_keys
sprig_kindIs
sprig_kindOf
sprig_last
sprig_list
sprig_lower
sprig_lt
sprig_lte
sprig_max
sprig_maxf
sprig_merge
sprig_mergeOverwrite
sprig_min
sprig_minf
sprig_mod
sprig_mul
sprig_mulf
sprig_mustAppend
sprig_mustChunk
sprig_mustCompact
sprig_mustDateModify
sprig_mustDeepCopy
sprig_mustFirst
sprig_mustFromJson
sprig_mustHas
sprig_mustInitial
sprig_mustLast
sprig_mustMerge
sprig_mustMergeOverwrite
sprig_mustPrepend
sprig_mustPush
sprig_mustRegexFind
sprig_mustRegexFindAll
sprig_mustRegexMatch
sprig_mustRegexReplaceAll
sprig_mustRegexReplaceAllLiteral
sprig_mustRegexSplit
sprig_mustRest
sprig_mustReverse
sprig_mustSlice
sprig_mustToDate
sprig_mustToJson
sprig_mustToPrettyJson
sprig_mustToRawJson
sprig_mustUniq
sprig_mustWithout
sprig_must_date_modify
sprig_nindent
sprig_nospace
sprig_now
sprig_omit
sprig_osBase
sprig_osClean
sprig_osDir
sprig_osExt
sprig_osIsAbs
sprig_pick
sprig_pluck
sprig_plural
sprig_prepend
sprig_push
sprig_quote
sprig_randAlpha
sprig_randAlphaNum
sprig_randAscii
sprig_randBytes
sprig_randInt
sprig_randNumeric
sprig_regexFind
sprig_regexFindAll
sprig_regexMatch
sprig_regexQuoteMeta
sprig_regexReplaceAll
sprig_regexReplaceAllLiteral
sprig_regexSplit
sprig_repeat
sprig_replace
sprig_rest
sprig_reverse
sprig_round
sprig_semver
sprig_semverCompare
sprig_seq
sprig_set
sprig_sha1sum
sprig_sha256sum
sprig_sha512sum
sprig_shuffle
sprig_slice
sprig_snakecase
sprig_sortAlpha
sprig_split
sprig_splitList
sprig_splitn
sprig_squote
sprig_sub
sprig_subf
sprig_substr
sprig_swapcase
sprig_ternary
sprig_title
sprig_toDate
sprig_toDecimal
sprig_toJson
sprig_toPrettyJson
sprig_toRawJson
sprig_toString
sprig_toStrings
sprig_trim
sprig_trimAll
sprig_trimPrefix
sprig_trimSuffix
sprig_trimall
sprig_trunc
sprig_tuple
sprig_typeIs
sprig_typeIsLike
sprig_typeOf
sprig_uniq
sprig_unixEpoch
sprig_unset
sprig_until
sprig_untilStep
sprig_untitle
sprig_upper
sprig_urlJoin
sprig_urlParse
sprig_uuidv4
sprig_values
sprig_without
sprig_wrap
sprig_wrapWith
```

部分 Sprig 函数可以读取环境变量、生成随机数据、执行网络解析或生成加密材料。它们之所以可用，是因为 monit-edge 以 `sprig_` 前缀原样注册了 Sprig 函数。告警描述中通常建议优先使用确定性的字符串、正则、数学、日期、JSON、字典和列表函数。

## 完整示例：提取 MySQL Unknown Column 字段名

以下模板从关联日志行中提取缺失字段名。

```gotemplate
{{- if eq $status "firing" }}
在过去5分钟的时间内，数据库操作出现缺失字段错误 {{ $value | printf "%.0f" }} 次；
{{- range $x := $relates.R1 }}
  {{- $msg := printf "%v" $x.Fields._msg }}
  {{- if sprig_contains "Unknown column" $msg }}
    {{- $field := sprig_regexReplaceAll ".*Unknown column '([^']+)'.*" $msg "$1" }}

- 缺失字段：{{ $field }}
- 查看地址：https://example.com/logs?query={{ queryEscape "Unknown column" }}
  {{- end }}
{{- end }}
{{- else }}
数据库缺字段错误已恢复
{{- end }}
```

## 常见问题

如果渲染失败并提示：

```text
function "contains" not defined
```

说明模板使用了未加前缀的 Sprig 函数。请改用 `sprig_contains`。

如果渲染失败并提示：

```text
function "regexFind" not defined
```

请改用 `sprig_regexFind`。

如果提取结果包含完整匹配文本，而不是只包含捕获组，请将 `sprig_regexFind` 改为 `sprig_regexReplaceAll`，并在 replacement 中使用 `$1`、`$2` 等捕获组引用。

如果 map key 无法通过点语法读取，请使用 `index`：

```gotemplate
{{ index $labels "service.name" }}
{{ index $x.Fields "_msg" }}
```

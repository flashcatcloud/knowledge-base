# Alert Rule Description Template Manual

This document describes the variables and functions available in the alert rule
`Description` field.

The `Description` field is rendered by Go `text/template`. Template syntax such
as `{{ ... }}`, `if`, `range`, variable assignment, pipelines, and comparison
operators follows Go template rules.

## Basic Syntax

Use `{{ ... }}` to render a value:

```gotemplate
Current value: {{ printf "%.2f" $value }}
```

Use `if` for conditional output:

```gotemplate
{{- if eq $status "firing" }}
Alert is firing.
{{- else }}
Alert has recovered.
{{- end }}
```

Use `range` to iterate over a list:

```gotemplate
{{- range $row := $relates.R1 }}
- message: {{ $row.Fields._msg }}
{{- end }}
```

For map keys that contain special characters such as `.`, `/`, `-`, or `$`, use
the built-in `index` function:

```gotemplate
{{ index $labels "service.name" }}
{{ index $values "$A.latency" }}
{{ index $row.Fields "log.message" }}
```

## Built-in Variables

The following short variables are injected before the user template is rendered.

| Variable | Type | Description |
| --- | --- | --- |
| `$labels` | `map[string]string` | Labels of the alerting data point. Alias of `.DataLabels`. |
| `$values` | `map[string]float64` | Numeric values used by the alert evaluation. Alias of `.Values`. |
| `$value` | `float64` | Main alert value. Alias of `.Value`. |
| `$appendLabels` | `map[string]string` | Extra labels configured on the rule after label interpolation. Alias of `.AppendLabels`. |
| `$annotations` | `map[string]string` | Rule annotations after label interpolation. Alias of `.Annotations`. |
| `$dsType` | `string` | Data source type. Alias of `.DataSourceType`. |
| `$dsName` | `string` | Data source name. Alias of `.DataSourceName`. |
| `$dsAddress` | `string` | Data source address without credentials. Alias of `.DataSourceAddress`. |
| `$checkMode` | `string` | Check mode, for example `threshold`, `anydata`, or `nodata`. Alias of `.CheckMode`. |
| `$relates` | `map[string][]*ResultRow` | Related query results, keyed by related query name. Alias of `.Relates`. |
| `$status` | `string` | Event status: `firing` or `recovered`. Alias of `.Status`. |
| `$severity` | `string` | Alert severity, for example `Critical`, `Warning`, or `Info`. Alias of `.Severity`. |

Examples:

```gotemplate
{{- if eq $status "firing" }}
{{ $dsName }} triggered {{ $severity }} with value {{ printf "%.2f" $value }}.
{{- else }}
{{ $dsName }} recovered.
{{- end }}
```

```gotemplate
Instance: {{ index $labels "instance" }}
Value A: {{ getvalue $values "$A" "%.2f" }}
```

## Root Event Fields

The template root object is the full alert event. These fields can be accessed
with `.FieldName`.

| Field | Type | Description |
| --- | --- | --- |
| `.Hash` | `string` | Stable event hash. Firing and recovery events share the same hash. |
| `.DataSourceType` | `string` | Data source type. |
| `.DataSourceName` | `string` | Data source name. |
| `.DataSourceAddress` | `string` | Data source address without credentials. |
| `.RuleName` | `string` | Alert rule name. |
| `.RuleID` | `uint64` | Alert rule ID. |
| `.Queries` | `[]Query` | Rule query definitions. |
| `.RelateQueries` | `[]RelateQuery` | Related query definitions. |
| `.CheckMode` | `string` | Check mode. |
| `.DataLabels` | `map[string]string` | Alert labels. |
| `.AppendLabels` | `map[string]string` | Extra labels configured on the rule. |
| `.EnrichLabels` | `map[string]string` | Labels returned by enrichment. This is usually empty while rendering `Description`, because enrichment happens after description rendering. |
| `.Values` | `map[string]float64` | Numeric values used by alert evaluation. |
| `.Annotations` | `map[string]string` | Rule annotations. |
| `.Relates` | `map[string][]*ResultRow` | Related query result rows. |
| `.Status` | `string` | `firing` or `recovered`. |
| `.Severity` | `string` | Alert severity. |
| `.EvalTime` | `int64` | Evaluation timestamp in Unix seconds. |
| `.Description` | `string` | Rendered description. This is set after template execution. |
| `.DescriptionType` | `string` | Description type, for example `text` or `markdown`. |
| `.Value` | `float64` | Main alert value. |
| `.TitleRule` | `string` | Title rule configured on the edge. |
| `.DebugLogEnabled` | `bool` | Whether debug logging is enabled for this rule. This field is mainly for internal diagnostics. |
| `.LogPrefix` | `string` | Internal log prefix for this evaluation. This field is mainly for internal diagnostics. |

Example:

```gotemplate
Rule {{ .RuleID }} / {{ .RuleName }} fired on {{ .DataSourceName }}.
```

`Query` objects in `.Queries` have the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `.Name` | `string` | Query name, usually `A`, `B`, `C`, and so on. |
| `.Expr` | `string` | Query expression. |
| `.LabelFields` | `[]string` | Fields used as labels. |
| `.ValueFields` | `[]string` | Fields used as numeric values. |
| `.Args` | `map[string]string` | Extra query arguments for data sources that require them. |

`RelateQuery` objects in `.RelateQueries` have the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `.Name` | `string` | Related query name, such as `R1`. |
| `.Expr` | `string` | Related query expression. |
| `.Args` | `map[string]string` | Extra query arguments for data sources that require them. |

## Related Query Rows

Related query results are available through `$relates`. The map key is the
related query name, such as `R1`.

Each row has:

| Field or Method | Type | Description |
| --- | --- | --- |
| `$row.Fields` | `map[string]interface{}` | Non-numeric or display fields returned by the related query. |
| `$row.Values` | `map[string]float64` | Numeric fields returned by the related query. |
| `$row.Field "name"` | `interface{}` | Returns one field from `$row.Fields`. |
| `$row.Value` | `float64` | Returns the first numeric value in `$row.Values`, or `NaN` if no value exists. |
| `$row.Value "name"` | `float64` | Returns one numeric value from `$row.Values`, or `NaN` if the key does not exist. |
| `$row.String` | `string` | Returns a debug-style string representation of the row. |

Examples:

```gotemplate
{{- range $row := $relates.R1 }}
- msg: {{ $row.Fields._msg }}
- count: {{ printf "%.0f" ($row.Value "count") }}
{{- end }}
```

```gotemplate
{{- range $row := $relates.R1 }}
  {{- $msg := printf "%v" ($row.Field "_msg") }}
  {{- if sprig_contains "Unknown column" $msg }}
    {{- $field := sprig_regexReplaceAll ".*Unknown column '([^']+)'.*" $msg "$1" }}
- Missing field: {{ $field }}
  {{- end }}
{{- end }}
```

## Go Template Built-in Functions

These functions are provided by Go `text/template`.

| Function | Description | Example |
| --- | --- | --- |
| `and` | Boolean AND. Evaluation stops when the result is known. | `{{ if and $a $b }}yes{{ end }}` |
| `or` | Boolean OR. Evaluation stops when the result is known. | `{{ if or $a $b }}yes{{ end }}` |
| `not` | Boolean NOT. | `{{ if not $ok }}failed{{ end }}` |
| `eq` | Equal. | `{{ if eq $status "firing" }}...{{ end }}` |
| `ne` | Not equal. | `{{ if ne $severity "Info" }}...{{ end }}` |
| `lt` | Less than. | `{{ if lt $value 10.0 }}...{{ end }}` |
| `le` | Less than or equal. | `{{ if le $value 10.0 }}...{{ end }}` |
| `gt` | Greater than. | `{{ if gt $value 10.0 }}...{{ end }}` |
| `ge` | Greater than or equal. | `{{ if ge $value 10.0 }}...{{ end }}` |
| `index` | Reads an item from a map, slice, or array. | `{{ index $labels "instance" }}` |
| `slice` | Slices a string, slice, or array. | `{{ slice "abcdef" 0 3 }}` |
| `len` | Returns length. | `{{ len $relates.R1 }}` |
| `printf` | Formats text with `fmt.Sprintf` syntax. | `{{ printf "%.2f" $value }}` |
| `print` | Concatenates values with default formatting. | `{{ print $dsName ":" $status }}` |
| `println` | Like `print`, with a trailing newline. | `{{ println $dsName }}` |
| `call` | Calls a function value. Rarely needed in descriptions. | `{{ call .SomeFunc }}` |
| `html` | Escapes text for HTML. | `{{ html $text }}` |
| `js` | Escapes text for JavaScript. | `{{ js $text }}` |
| `urlquery` | Escapes text for URL query usage. | `{{ urlquery $text }}` |

## monit-edge Custom Functions

These functions are registered by monit-edge without a prefix.

| Function | Description | Example |
| --- | --- | --- |
| `pathEscape text` | URL path escaping. | `{{ pathEscape "a/b c" }}` |
| `queryEscape text` | URL query escaping. | `{{ queryEscape "level=error msg" }}` |
| `getvalue values key [format]` | Reads a numeric value from a `map[string]float64` and formats it. Default format is `%.4f`. Returns `template_function_error: ...` text if the key is invalid or missing. | `{{ getvalue $values "$A" "%.2f" }}` |
| `getfvalue values key` | Reads a numeric value from a `map[string]float64`. Returns `NaN` if the key is invalid or missing. | `{{ if gt (getfvalue $values "$A") 10.0 }}high{{ end }}` |
| `trunc count text` | Alias of `truncRune`. Truncates by Unicode characters, not bytes. Negative count keeps characters from the end. | `{{ trunc 10 $msg }}` |
| `truncRune count text` | Truncates by Unicode characters. | `{{ truncRune -8 "abcdef你好" }}` |
| `runeCount text` | Counts Unicode characters. | `{{ runeCount "你好abc" }}` |
| `args ...` | Builds a map with keys `arg0`, `arg1`, and so on. Mainly useful when composing helper calls. | `{{ args "a" 1 }}` |
| `reReplaceAll pattern repl text` | Regex replacement. Argument order is `pattern`, `replacement`, `text`. Invalid regex will fail rendering. | `{{ reReplaceAll ".*id=([0-9]+).*" "$1" $msg }}` |
| `safeHtml text` | Marks text as HTML-safe. For normal text or markdown descriptions, avoid this unless HTML output is expected. | `{{ safeHtml "<b>OK</b>" }}` |
| `match pattern text` | Regex match. Equivalent to Go `regexp.MatchString`. Invalid regex will fail rendering. | `{{ if match "Unknown column" $msg }}...{{ end }}` |
| `toUpper text` | Converts text to uppercase. | `{{ toUpper $severity }}` |
| `toLower text` | Converts text to lowercase. | `{{ toLower $status }}` |
| `stripPort hostPort` | Removes port from `host:port`. If parsing fails, returns the original value. | `{{ stripPort "example.com:9100" }}` |
| `stripDomain hostPort` | Removes domain suffix from hostname while preserving port. IP addresses are returned unchanged. | `{{ stripDomain "node01.prod.local:9100" }}` |
| `humanize value` | Formats a number using SI units. | `{{ humanize 12345 }}` |
| `humanize1024 value` | Formats a number using base-1024 units. | `{{ humanize1024 1048576 }}` |
| `humanizeDuration seconds` | Formats seconds as a readable duration. | `{{ humanizeDuration 3661 }}` |
| `humanizePercentage value` | Formats a ratio as a percentage. `0.1234` becomes `12.34%`. | `{{ humanizePercentage 0.95 }}` |
| `humanizeTimestamp seconds` | Converts a Unix timestamp in seconds to UTC time text. | `{{ humanizeTimestamp .EvalTime }}` |
| `toTime seconds` | Converts a Unix timestamp in seconds to a `time.Time`. | `{{ (toTime .EvalTime).Format "2006-01-02 15:04:05" }}` |
| `nanoTime value [tzOffset]` | Converts a Unix nanosecond timestamp to `time.Time`. Optional timezone offset is in hours. | `{{ (nanoTime $row.Fields.__time__ 8).Format "2006-01-02 15:04:05" }}` |
| `timeFormat value format [tzOffset]` | Formats a `time.Time`, `*time.Time`, RFC3339 string, or RFC3339Nano string. Optional timezone offset is in hours. | `{{ timeFormat "2026-01-06T11:48:12Z" "2006-01-02 15:04:05" 8 }}` |
| `parseDuration duration` | Parses a duration string and returns seconds. Supported units follow monit-edge duration parsing. | `{{ parseDuration "5m" }}` |
| `add a b` | Numeric addition. | `{{ add 1 2 }}` |
| `sub a b` | Numeric subtraction. | `{{ sub 10 3 }}` |
| `mul a b` | Numeric multiplication. | `{{ mul $value 100 }}` |
| `div a b` | Numeric division. Division by zero fails rendering. | `{{ div $value 1024 }}` |
| `now` | Current time as `time.Time`. | `{{ now.Format "2006-01-02 15:04:05" }}` |
| `toString value` | Converts a value to string using `fmt.Sprint`. | `{{ toString $row.Fields._msg }}` |

## Sprig Functions

monit-edge also registers Sprig functions, but every Sprig function is prefixed
with `sprig_`.

For example, use:

```gotemplate
{{ sprig_contains "error" $msg }}
{{ sprig_regexMatch "Unknown column" $msg }}
{{ sprig_regexFind "Unknown column '[^']+'" $msg }}
```

Do not use unprefixed Sprig names such as `contains`, `regexMatch`, or
`regexFind`; those names are not registered.

Important regex note: `sprig_regexFind` returns the full matched substring. It
does not return a capture group. To extract a capture group, use
`sprig_regexReplaceAll`:

```gotemplate
{{- $msg := "Unknown column 'community_posts.comment_count' in 'field list'" }}
{{- sprig_regexReplaceAll ".*Unknown column '([^']+)'.*" $msg "$1" }}
```

The result is:

```text
community_posts.comment_count
```

### Common Sprig Functions

| Function | Description | Example |
| --- | --- | --- |
| `sprig_contains substr text` | Checks whether `text` contains `substr`. | `{{ if sprig_contains "Unknown column" $msg }}...{{ end }}` |
| `sprig_hasPrefix prefix text` | Checks prefix. | `{{ sprig_hasPrefix "prod-" $name }}` |
| `sprig_hasSuffix suffix text` | Checks suffix. | `{{ sprig_hasSuffix ".log" $file }}` |
| `sprig_regexMatch pattern text` | Regex match. | `{{ sprig_regexMatch "error|failed" $msg }}` |
| `sprig_regexFind pattern text` | Returns the first full regex match. | `{{ sprig_regexFind "trace_id=[a-z0-9]+" $msg }}` |
| `sprig_regexFindAll pattern text n` | Returns up to `n` full regex matches. Use `-1` for all. | `{{ sprig_regexFindAll "id=[0-9]+" $msg -1 }}` |
| `sprig_regexReplaceAll pattern text repl` | Regex replacement. Argument order is `pattern`, `text`, `replacement`. | `{{ sprig_regexReplaceAll ".*id=([0-9]+).*" $msg "$1" }}` |
| `sprig_trim text` | Trims leading and trailing whitespace. | `{{ sprig_trim $msg }}` |
| `sprig_lower text` | Lowercase. | `{{ sprig_lower $severity }}` |
| `sprig_upper text` | Uppercase. | `{{ sprig_upper $severity }}` |
| `sprig_default default value` | Uses a default value when `value` is empty. | `{{ sprig_default "unknown" (index $labels "instance") }}` |
| `sprig_toJson value` | Converts a value to JSON. | `{{ sprig_toJson $labels }}` |
| `sprig_dict ...` | Creates a dictionary. | `{{ sprig_dict "name" $dsName "status" $status }}` |
| `sprig_list ...` | Creates a list. | `{{ sprig_list "a" "b" "c" }}` |

### Complete Sprig Function Names

The following names are available in the current monit-edge build:

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

Some Sprig functions can read environment variables, generate random data, do
network lookup, or generate cryptographic material. They are available because
Sprig is registered as-is with the `sprig_` prefix, but alert descriptions
should normally prefer deterministic string, regex, math, date, JSON, dict, and
list functions.

## Complete Example: Extract MySQL Unknown Column

The following template extracts the missing column name from related log rows.

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

## Troubleshooting

If rendering fails with:

```text
function "contains" not defined
```

the template is using an unprefixed Sprig function. Use `sprig_contains`
instead.

If rendering fails with:

```text
function "regexFind" not defined
```

use `sprig_regexFind`.

If the extracted value contains the whole matched text instead of only the
capture group, replace `sprig_regexFind` with `sprig_regexReplaceAll` and use
`$1`, `$2`, and so on in the replacement string.

If a map key cannot be read with dot syntax, use `index`:

```gotemplate
{{ index $labels "service.name" }}
{{ index $x.Fields "_msg" }}
```

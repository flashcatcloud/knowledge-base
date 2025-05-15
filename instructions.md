Flashduty是一个类似pagerduty的SaaS服务，目前正在做i18n多语言适配。请将中文文档翻译为英文。

## 翻译要求
1. 保持语言简洁专业，不要出现Chinglish
2. 保持句子通顺，不要出现语法错误，保持翻译的一致性
3. 请为完整的句子补上标点符号，遵循Sentence case大小写风格
4. 如果中文原文包含变量或占位符，请确保其顺序在翻译后的文件中保持一致
5. 请确保下方专业术语的翻译保持不变
6. 翻译后的英文文档请按照下方文件结构进行组织
7. 如果原文包含到https://docs.flashcat.cloud/zh/flashduty/xxx的外链，请将外链中的zh替换为en，并增加query参数`nav=01JCQ7A4N4WRWNXW8EWEHXCMF5`

## 专业术语
- "协作空间": "channel"
- "故障": "incident"
- "告警": "alert"
- "分派": "assign"
- "分派策略": "escalation rule"
- "故障升级": "escalation"
- "告警风暴": "alert storm"
- "暂缓": "snooze"
- "取消暂缓": "unsnooze"
- "解决故障": "resolve the incident"
- "关闭故障": "close the incident"
- "抖动": "flapping"
- "静默策略": "silence rule"
- "抑制策略": "inhibit rule"
- "排除规则": "drop rule"
- "处理人员": "responders"
- "响应人员": "responders"
- "分派人员": "responders"
- "值班人员": "responders"
- "严重程度": "severity"
- "等级": "severity"
- "严重": "critical"
- "一般": "warning"
- "轻微": "info"
- "值班表": "schedule"
- "报警": "alert"
- "手机号": "phone"
- "邮箱": "email"
- "降噪": "reduce noise"
- "详情": "details"
- "告警聚合": "alert grouping"
- "触发": "trigger"
- "发生": "trigger"
- "输入不能为空": "the field is required"
- "启用": "Enable"
- "开启": "Enable"
- "禁用": "Disable"
- "删除": "Delete"
- "聚合": "group"
- "视频教学": "watch videos"
- "发生时间": "triggered at"
- "触发时间": "triggered at"
- "结束时间": "ended at"
- "IP段匹配": "CIDR matching"
- "集成来源": "integration"
- "回复": "reply"
- "国内": "mainland China"
- "环节": "level"
- "值班": "schedule"
- "值班轮换": "On-call shift"
- "修改": "change"
- "企业微信": "WeCom"
- "微信": "WeCom"
- "飞书": "Feishu/Lark"
- "钉钉": "Dingtalk"
- "北京快猫星云科技有限公司": "Beijing Flashcat Cloud Technology Co.,Ltd."
- "小型团队": "small team"
- "增长中的团队": "growing team"
- "中大型企业": "Medium to Large Business"
- "属性": "attribute"
- "标签": "label"
- "相同项": "equal item"
- "订阅": "plan"
- "分析看板": "insights"
- "赠送金": "bonus"
- "认领": "acknowledge"
- "关联": "associated"
- "数据源": "integration"
- "告警列表": "Alerts"
- "告警标题": "Title"
- "中文对照": "alias"
- "循环通知": "loop notification"
- "解决办法": "resolution"
- "快速静默": "quick silence"
- "推送地址": "push URL"
- "组合规则": "composition rule"
- "值班轮换": "On-call rotation"
- "跳转链接": "jump link"
- "用户未关联": "user not linked"
- "应用未关联": "app not linked"
- "专业版": "Pro"
- "标准版": "Standard"
- "免费版": "Free"
- "订阅升级": "plan upgrade"
- "主体": "owner"
- "成员": "member"
- "主体账号": "owner"
- "成员账号": "member"
- "未关闭": "open"
- "处理中": "processing"
- "待处理": "triggered"
- "已关闭": "closed"
- "管理团队": "Team"
- "登录": "sign in"
- "登出": "sign out"
- "注册": "sign up"
- "常见问题": "FAQ"
- "新奇故障": "outlier incident"
- "故障数量": "incidents"
- "中断次数": "interruption"
- "通知次数": "notifications"
- "时间段": "hours"
- "工作时间": "work"
- "睡眠时间": "sleep"
- "休息时间": "rest"
- "响应投入": "response effort"


## 文件结构
.
├── README.md
├── flashduty
│   ├── en
│   │   ├── 1. Getting Started
│   │   │   ├── 1.1 Introduction.md
│   │   │   ├── 1.2 Quick start.md
│   │   │   ├── 1.3 FAQ.md
│   │   │   └── 1.4 Product Comparison.md
│   │   ├── 2. Incidents
│   │   │   ├── 2.1 What is an Incident.md
│   │   │   ├── 2.2 Search and View Incidents.md
│   │   │   ├── 2.3 Handle and Update Incidents.md
│   │   │   ├── 2.4 Incident Escalation and Assignment.md
│   │   │   ├── 2.5 Custom Fields.md
│   │   │   ├── 2.6 Custom Actions.md
│   │   │   ├── 2.7 Alert Noise Reduction.md
│   │   │   ├── 2.8 Past Incidents.md
│   │   │   └── 2.9 Outlier Incidents.md
│   │   ├── 3. Configure Flashduty
│   │   │   ├── 3.1 Channels.md
│   │   │   ├── 3.10 Alert Routing.md
│   │   │   ├── 3.11 Silence and Inhibition.md
│   │   │   ├── 3.12 Filters.md
│   │   │   ├── 3.13 Notification Bots.md
│   │   │   ├── 3.2 Integrate Alerts.md
│   │   │   ├── 3.3 Alert Noise Reduction.md
│   │   │   ├── 3.4 Escalation Rules.md
│   │   │   ├── 3.5 Label Enrichment.md
│   │   │   ├── 3.6 Schedules.md
│   │   │   ├── 3.7 Templates.md
│   │   │   ├── 3.8 Service Calendars.md
│   │   │   └── 3.9 Preferences.md
│   │   ├── 5. Platform
│   │   │   ├── 5.1 Teams and Members.md
│   │   │   ├── 5.2 Permissions.md
│   │   │   └── 5.3 Single Sign-On.md
│   │   ├── 6. Advanced
│   │   │   ├── 6.1 Customizing Incidents.md
│   │   │   └── 6.2 Dynamic Assignments.md
│   │   ├── 8. Integrations
│   │   │   ├── 8.1 Alerts integration
│   │   │   │   ├── 8.1.0 Standard Alert Integration.md
│   │   │   │   ├── 8.1.1 Email Integration.md
│   │   │   │   ├── 8.1.10 Alibaba Cloud SLS Integration.md
│   │   │   │   ├── 8.1.11 AWS CloudWatch Integration.md
│   │   │   │   ├── 8.1.12 Azure Monitor Integration.md
│   │   │   │   ├── 8.1.13 Baidu Cloud BCM Integration.md
│   │   │   │   ├── 8.1.14 Huawei Cloud CES Integration.md
│   │   │   │   ├── 8.1.15 Influxdata Integration.md
│   │   │   │   ├── 8.1.16 Open Falcon Integration.md
│   │   │   │   ├── 8.1.17 PagerDuty Integration.md
│   │   │   │   ├── 8.1.18 Tencent BlueKing Integration.md
│   │   │   │   ├── 8.1.19 Tencent Cloud CLS Integration.md
│   │   │   │   ├── 8.1.2 Nightingale or FlashCat Integration.md
│   │   │   │   ├── 8.1.20 Tencent Cloud Monitor CM Integration.md
│   │   │   │   ├── 8.1.21 Tencent Cloud EventBridge.md
│   │   │   │   ├── 8.1.22 OceanBase Integration.md
│   │   │   │   ├── 8.1.23 Graylog Integration.md
│   │   │   │   ├── 8.1.24 Skywalking Integration.md
│   │   │   │   ├── 8.1.25 Sentry Integration.md
│   │   │   │   ├── 8.1.26 Jiankongbao Integration.md
│   │   │   │   ├── 8.1.27 AWS EventBridge Integration.md
│   │   │   │   ├── 8.1.28 Dynatrace Integration.md
│   │   │   │   ├── 8.1.29 Huawei Cloud LTS Integration.md
│   │   │   │   ├── 8.1.3 Prometheus Integration.md
│   │   │   │   ├── 8.1.30 GCP Integration.md
│   │   │   │   ├── 8.1.31 Splunk Alert Events Integration.md
│   │   │   │   ├── 8.1.32 AppDynamics Alert Integration.md
│   │   │   │   ├── 8.1.33 SolarWinds Alert Events Integration.md
│   │   │   │   ├── 8.1.34 Volcengine CM Alert Events Integration.md
│   │   │   │   ├── 8.1.35 Volcengine CM Event Center Integration.md
│   │   │   │   ├── 8.1.36 Volcengine Log Service (TLS) Integration.md
│   │   │   │   ├── 8.1.37 OpManager Interation.md
│   │   │   │   ├── 8.1.38 Meraki Integration.md
│   │   │   │   ├── 8.1.4 Grafana Integration.md
│   │   │   │   ├── 8.1.5 Zabbix Integration.md
│   │   │   │   ├── 8.1.6 Uptime Kuma Integration.md
│   │   │   │   ├── 8.1.7 Alibaba Cloud ARMS Integration.md
│   │   │   │   ├── 8.1.8 Alibaba Cloud Monitor CM Event Integration.md
│   │   │   │   └── 8.1.9 Alibaba Cloud Monitor CM Metrics Integration.md
│   │   │   ├── 8.2 Change integration
│   │   │   │   ├── 8.2.1 Standard Change Event.md
│   │   │   │   └── 8.2.2 Jira Issue Events.md
│   │   │   ├── 8.3 IM integration
│   │   │   │   ├── 8.3.1 Feishu(Lark) Integration Guide.md
│   │   │   │   ├── 8.3.2 Dingtalk Integration Guide.md
│   │   │   │   ├── 8.3.3 WeCom Integration Guide.md
│   │   │   │   ├── 8.3.4 Slack Integration Guide.md
│   │   │   │   └── 8.3.5 Microsoft Teams Integration Guide.md
│   │   │   ├── 8.4 Single Sign-On
│   │   │   │   ├── Authing Guide.md
│   │   │   │   ├── Keycloak Guide.md
│   │   │   │   └── OpenLDAP Guide.md
│   │   │   └── 8.5 Webhooks
│   │   │       ├── 8.5.1 Alert webhook.md
│   │   │       ├── 8.5.2 Incident webhook.md
│   │   │       └── 8.5.3 Custom action.md
│   │   └── 9. Terms
│   │       ├── 9.1 Terms of Service.md
│   │       ├── 9.2 User Agreement.md
│   │       └── 9.3 SLA.md
│   └── zh
│       ├── 1. 快速开始
│       │   ├── 1.1 入门介绍.md
│       │   ├── 1.2 快速开始.md
│       │   ├── 1.3 常见问题.md
│       │   └── 1.4 产品对比.md
│       ├── 2. 故障管理
│       │   ├── 2.1 什么是故障.md
│       │   ├── 2.2 检索与查看故障.md
│       │   ├── 2.3 处理与更新故障.md
│       │   ├── 2.4 升级与分派故障.md
│       │   ├── 2.5 自定义字段.md
│       │   ├── 2.6 自定义操作.md
│       │   ├── 2.7 了解告警降噪.md
│       │   ├── 2.8 了解历史故障.md
│       │   └── 2.9 了解新奇故障.md
│       ├── 3. 配置Flashduty
│       │   ├── 3.1 协作空间管理.md
│       │   ├── 3.10 配置路由规则.md
│       │   ├── 3.11 故障静默与抑制.md
│       │   ├── 3.12 配置过滤条件.md
│       │   ├── 3.13 通知机器人.md
│       │   ├── 3.2 多种方式接入告警.md
│       │   ├── 3.3 配置告警降噪.md
│       │   ├── 3.4 配置分派策略.md
│       │   ├── 3.5 配置标签增强.md
│       │   ├── 3.6 配置值班规则.md
│       │   ├── 3.7 配置通知模板-1.md
│       │   ├── 3.7 配置通知模板-2.md
│       │   ├── 3.7 配置通知模板-3.md
│       │   ├── 3.7 配置通知模板.md
│       │   ├── 3.8 配置服务日历.md
│       │   └── 3.9 个人偏好设置.md
│       ├── 5. 平台功能
│       │   ├── 5.1 团队和成员.md
│       │   ├── 5.2 了解权限设计.md
│       │   ├── 5.3 配置单点登录.md
│       │   ├── 5.4 检索操作审计.md
│       │   └── 5.5 管理订阅.md
│       ├── 6. 高级功能
│       │   ├── 6.1 定制故障标题和严重程度.md
│       │   └── 6.2 动态设置分派人员.md
│       ├── 8. 集成引导
│       │   ├── 8.1 告警集成
│       │   │   ├── 8.1.0 标准告警事件集成指引.md
│       │   │   ├── 8.1.1 邮件 Email 集成指引.md
│       │   │   ├── 8.1.10 阿里云 SLS 集成指引.md
│       │   │   ├── 8.1.11 AWS CloudWatch 集成指引.md
│       │   │   ├── 8.1.12 Azure Monitor 集成指引.md
│       │   │   ├── 8.1.13 百度云监控 BCM 集成指引.md
│       │   │   ├── 8.1.14 华为云监控 CES 集成指引.md
│       │   │   ├── 8.1.15 Influxdata 集成指引.md
│       │   │   ├── 8.1.16 Open Falcon 集成指引.md
│       │   │   ├── 8.1.17 Pagerduty 集成指引.md
│       │   │   ├── 8.1.18 蓝鲸智云集成指引.md
│       │   │   ├── 8.1.19 腾讯云 CLS 集成指引.md
│       │   │   ├── 8.1.2 夜莺 Flashcat 集成指引.md
│       │   │   ├── 8.1.20 腾讯云监控 CM 集成指引.md
│       │   │   ├── 8.1.21 腾讯云 Event Bridge 集成指引.md
│       │   │   ├── 8.1.22 OceanBase告警事件集成.md
│       │   │   ├── 8.1.23 Graylog.md
│       │   │   ├── 8.1.24 Skywalking 告警集成指引.md
│       │   │   ├── 8.1.25 Sentry 告警集成指引.md
│       │   │   ├── 8.1.26 监控宝告警集成指引.md
│       │   │   ├── 8.1.27 AWS EventBridge 告警集成指引.md
│       │   │   ├── 8.1.28 Dynatrace 告警集成指引.md
│       │   │   ├── 8.1.29 华为云 LTS 告警集成指引.md
│       │   │   ├── 8.1.3 Prometheus 集成指引.md
│       │   │   ├── 8.1.30 Google 云监控集成指引.md
│       │   │   ├── 8.1.31 Splunk 告警集成指引.md
│       │   │   ├── 8.1.32 AppDynamics 告警集成指引.md
│       │   │   ├── 8.1.33 SolarWinds 告警集成指引.md
│       │   │   ├── 8.1.34 火山引擎CM 指标集成指引.md
│       │   │   ├── 8.1.35 火山引擎CM 事件集成指引.md
│       │   │   ├── 8.1.36 火山引擎 TLS 告警集成指引.md
│       │   │   ├── 8.1.37 OpManager 告警集成指引.md
│       │   │   ├── 8.1.38 Meraki 告警集成指引.md
│       │   │   ├── 8.1.4 Grafana 集成指引.md
│       │   │   ├── 8.1.5 Zabbix 集成指引.md
│       │   │   ├── 8.1.6 Uptime Kuma 集成指引.md
│       │   │   ├── 8.1.7 阿里云 ARMS 集成指引.md
│       │   │   ├── 8.1.8 阿里云监控 CM 事件集成指引.md
│       │   │   └── 8.1.9 阿里云监控 CM 指标集成指引.md
│       │   ├── 8.2 变更集成
│       │   │   ├── 8.2.1 自定义事件集成指引.md
│       │   │   └── 8.2.2 Jira 事件集成指引.md
│       │   ├── 8.3 即时消息
│       │   │   ├── 8.3.1 飞书 Lark 集成指引.md
│       │   │   ├── 8.3.2 钉钉 Dingtalk 集成指引.md
│       │   │   ├── 8.3.3 企业微信 Wecom 集成指引.md
│       │   │   ├── 8.3.4 Slack 集成指引.md
│       │   │   └── 8.3.5 Microsoft Teams 集成指引.md
│       │   ├── 8.4 单点登录
│       │   │   ├── Authing 集成指引.md
│       │   │   ├── Keycloak 集成指引.md
│       │   │   └── OpenLDAP 集成指引.md
│       │   └── 8.5 Webhooks
│       │       ├── 8.5.1 告警 webhook.md
│       │       ├── 8.5.2 故障 webhook.md
│       │       └── 8.5.3 自定义操作.md
│       └── 9. 安全条款
│           ├── 9.1 服务条款.md
│           ├── 9.2 用户协议.md
│           └── 9.3 服务SLA.md
├── instructions.md
├── package-lock.json
├── package.json
├── src
│   ├── en.js
│   └── zh.js
└── vite.config.js
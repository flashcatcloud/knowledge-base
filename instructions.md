Flashduty是一个类似pagerduty的SaaS服务，目前正在做i18n多语言适配。请将中文文档翻译为英文。

## 翻译要求
1. 保持语言简洁专业，不要出现Chinglish
2. 保持句子通顺，不要出现语法错误，保持翻译的一致性
3. 请为完整的句子补上标点符号，遵循Sentence case大小写风格
4. 如果中文原文包含变量或占位符，请确保其顺序在翻译后的文件中保持一致
5. 请确保下方专业术语的翻译保持不变
6. 翻译后的英文文档请按照下方文件结构进行组织

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
- "值班轮换": "on-call shift"
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
- "值班轮换": "on-call rotation"
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
│   │   ├── 2. Incident Manage
│   │   │   ├── 2.1 What is an Incident.md
│   │   │   ├── 2.2 Search and View Incidents.md
│   │   │   ├── 2.3 Handle and Update Incidents.md
│   │   │   ├── 2.4 Incident Escalation and Assignment.md
│   │   │   ├── 2.5 Custom Fields.md
│   │   │   ├── 2.6 Custom Actions.md
│   │   │   ├── 2.7 Alert Noise Reduction.md
│   │   │   ├── 2.8 Past Incidents.md
│   │   │   └── 2.9 Rare Incidents.md
│   │   ├── 3. Configure Flashduty
│   │   │   ├── 3.1 Channel Settings.md
│   │   │   ├── 3.10 Routing Rules.md
│   │   │   ├── 3.11 Silence and Inhibition.md
│   │   │   ├── 3.12 Filter Conditions.md
│   │   │   ├── 3.2 Multiple Ways to Integrate Alerts.md
│   │   │   ├── 3.3 Alert Noise Reduction.md
│   │   │   ├── 3.4 Escalation Rules.md
│   │   │   ├── 3.5 Label Enrichment.md
│   │   │   ├── 3.6 Schedule.md
│   │   │   ├── 3.7 Notification Templates.md
│   │   │   ├── 3.8 Service Calendar.md
│   │   │   └── 3.9 Personal Preferences.md
│   │   ├── 5. Platform functions
│   │   │   ├── 5.1 Team and Member Management.md
│   │   │   ├── 5.2 Permission design.md
│   │   │   └── 5.3 Single Sign-On.md
│   │   ├── 6. Advanced features
│   │   │   ├── 6.1 Customizing Incident Title and Severity.md
│   │   │   └── 6.2 Dynamic Responder Assignment.md
│   │   ├── 8. Integration Guides
│   │   │   ├── 8.1 Alerts integration
│   │   │   ├── 8.2 Change integration
│   │   │   ├── 8.3 IM integration
│   │   │   ├── 8.4 Single Sign-On
│   │   │   └── 8.5 Webhooks
│   │   └── 9. Safety clause
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
│       │   ├── 3.2 多种方式接入告警.md
│       │   ├── 3.3 配置告警降噪.md
│       │   ├── 3.4 配置分派策略.md
│       │   ├── 3.5 配置标签增强.md
│       │   ├── 3.6 配置值班规则.md
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
│       │   ├── 8.2 变更集成
│       │   ├── 8.3 即时消息
│       │   └── 8.4 单点登录
│       └── 9. 安全条款
│           ├── 9.1 服务条款.md
│           ├── 9.2 用户协议.md
│           └── 9.3 服务SLA.md
├── package-lock.json
├── package.json
├── src
│   ├── en.js
│   └── zh.js
└── vite.config.js
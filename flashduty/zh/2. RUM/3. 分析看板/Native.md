---
title: "Native RUM 分析看板"
description: "本文档详细介绍 Flashduty Native（Android/iOS）RUM 分析看板的功能和使用方法。"
date: "2024-05-09T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/rum/native/analysis-dashboard"
---

## 概述

---

Flashduty Native RUM 分析看板提供了开箱即用的可视化仪表板，自动采集并分析用户会话、应用性能、崩溃异常、网络请求等多维度数据，助力您全面洞察移动应用真实运行状况，快速定位性能瓶颈与异常问题，持续优化用户体验。

分析看板主要包含 4 个分析维度：概览、性能分析、异常分析、资源分析

### 1. 概览 — 关键指标一目了然

![native-overview](https://docs-cdn.flashcat.cloud/images/png/native-rum-overview.png)

概览模块聚焦于移动应用多维度的核心指标，主要内容包括：

- **流量指标**：监控 UV（独立访客数）、会话数，帮助您把握整体用户活跃趋势。
- **核心健康指标**：突出显示三个移动应用核心指标：崩溃次数、无崩溃率、应用卡顿率，快速识别应用稳定性问题。
- **用户访问趋势**：通过时序图追踪 UV 和 Session 的变化趋势，洞察用户活跃规律。
- **用户分布**：结合地理位置分析用户来源，了解区域用户活跃情况。
- **会话分析**：统计会话平均时长分布趋势，评估用户粘性与使用深度。
- **版本分布**：监控不同系统版本（Android/iOS）和应用版本的用户占比，为兼容性优化与版本迭代提供数据支撑。

### 2. 性能分析 — 全面掌控应用体验

![native-performance](https://docs-cdn.flashcat.cloud/images/png/native-rum-performance.png)

性能分析模块专注于应用启动、页面渲染、交互流畅度等核心体验指标的全链路监控，主要内容包括：

- **崩溃次数**：监控应用崩溃发生的次数趋势，及时发现稳定性问题。
- **无崩溃率**：追踪无崩溃会话的百分比，评估应用整体稳定性水平。
- **应用卡顿率**：监控应用卡顿发生的频率，识别影响用户体验的流畅度问题。卡顿通常指主线程长时间阻塞导致的界面冻结或响应延迟。
- **错误统计**：统计各类错误的发生次数，帮助您全面掌握应用异常情况。
- **错误分布趋势**：通过时序图分析崩溃（crash_count）与非崩溃错误（non_crash_count）的分布变化。
- **页面 Crash 排行（Top10）**：识别崩溃频率最高的页面或视图控制器（如 ApplicationLaunch、NavigationStackHostingController），定位重点优化对象。包含错误类型、错误信息、影响用户数和会话数等关键信息。
- **热门 Issue（Top10）**：展示影响范围最广的问题排行，帮助您优先处理高优级缺陷。关于 issue 聚合策略，可查看[异常聚合](https://docs.flashcat.cloud/zh/flashduty/rum/error-grouping)。
- **错误分布**：按错误类型分类展示（如 SIGTRAP、ManualTestError、ReferenceError 等），包含错误类型占比、错误趋势和错误排行，帮助您识别主要错误来源。
- **最全 Crash 分布**：统计不同操作系统版本（Android/iOS）下的崩溃分布情况，识别系统兼容性问题。
- **最全版本分布**：分析不同应用版本的崩溃情况，为版本质量评估提供依据。
- **网络请求**：监控网络请求的性能数据，包括请求数趋势、请求响应时间等。

有关显示数据的更多信息，请参阅 [RUM Native 数据收集](https://docs.flashcat.cloud/zh/flashduty/rum/native/data-collection)。

### 3. 异常分析 — 快速定位与诊断错误

![native-errors](https://docs-cdn.flashcat.cloud/images/png/native-rum-errors.png)

异常分析模块为您提供全方位的错误监控与诊断能力，主要内容包括：

- **崩溃次数**：监控应用崩溃的发生趋势，及时发现异常峰值。
- **无崩溃率**：跟踪无崩溃会话占比，评估应用稳定性表现。
- **应用卡顿率**：统计应用卡顿的发生比例，识别流畅度问题。
- **错误统计**：汇总各类错误的总体数量，全面掌握应用健康状况。
- **错误分布趋势**：通过时序图展示崩溃（crash_count）与非崩溃错误（non_crash_count）的时间分布，快速识别异常时段。
- **页面 Crash 排行（Top10）**：列出崩溃次数最多的页面或视图控制器，包含错误类型、错误信息、影响用户数和会话数，帮助您定位重点优化页面。
- **热门 Issue（Top10）**：展示影响用户最多的问题排行，包含错误类型（如 SIGTRAP、Application crash 等）、错误信息、影响范围等，助力您优先处理关键缺陷。如需了解 issue 聚合策略，可查看[异常聚合](https://docs.flashcat.cloud/zh/flashduty/rum/error-grouping)。
- **错误分布**：
  - **错误类型占比**：通过饼图展示不同错误类型的占比（如 ManualTestError、SIGTRAP、ReferenceError 等），识别主要错误来源。
  - **错误类型趋势**：监控各错误类型随时间的变化趋势，及时发现异常增长。
- **最全 Crash 分布**：统计不同操作系统版本下的崩溃情况，识别系统兼容性问题。
- **最全版本分布**：分析不同应用版本的崩溃表现，为版本质量把控提供数据支持。

如需深入分析具体错误，可参阅[错误跟踪](https://docs.flashcat.cloud/zh/flashduty/rum/error-tracking)了解如何调查关键错误并追踪新错误的出现。

### 4. 资源分析 — 精细化网络性能优化

![native-resources](https://docs-cdn.flashcat.cloud/images/png/native-rum-resources.png)

资源分析模块帮助您深入了解应用的网络请求性能，识别优化机会：

- **请求数**：监控网络请求总量的变化趋势，了解应用网络活跃度。
- **请求成功率**：跟踪请求成功的比例，及时发现网络异常。
- **中位数请求时间**：展示请求耗时的中位数变化（如 p50、p75、p95），评估整体网络性能水平。
- **慢请求**：统计响应时间超过阈值的慢请求趋势，定位性能瓶颈。
- **异常请求**：监控失败或错误请求的发生情况，快速识别接口问题。
- **资源请求状态分布**：
  - **请求状态码占比**：通过饼图展示不同 HTTP 状态码的分布（如 200、404、500），识别异常请求类型。
  - **请求状态码趋势**：监控各状态码随时间的变化，及时发现异常峰值。
- **请求方式分布**：
  - **请求方法占比**：展示不同 HTTP 方法（GET、POST 等）的使用分布。
  - **请求方法趋势**：分析各请求方法的时序变化。
- **静态资源**：
  - **静态资源调用排行**：列出调用频率最高的静态资源（如图片、字体、配置文件等），了解资源使用热度。
  - **静态资源响应排行**：识别响应最慢的静态资源，优化资源加载性能。
- **网络调用排行**：
  - **Host 排行**：按请求来源（Host）统计请求数，识别主要依赖的服务端点。
  - **资源耗时排行**：列出耗时最长的网络请求，包含耗时详情（DNS 解析、TCP 连接、SSL 握手、首字节时间、响应时间等），精准定位性能瓶颈。

## Native 特有指标说明

---

与 Web 应用相比，Native 应用有以下特有的核心指标：

### 崩溃次数（Crash Count）

应用因未捕获的异常或系统信号（如 SIGTRAP、SIGSEGV、SIGABRT）而异常退出的次数。崩溃会导致用户当前操作中断，严重影响用户体验。

**常见崩溃类型**：

- **SIGTRAP**：调试断点或异常信号
- **SIGSEGV**：内存访问错误
- **SIGABRT**：程序主动终止
- **NSException**：iOS Objective-C 异常
- **Java Exception**：Android Java/Kotlin 异常

### 无崩溃率（Crash-Free Rate）

无崩溃会话占总会话数的百分比，是衡量应用稳定性的关键指标。

```
无崩溃率 = (总会话数 - 崩溃会话数) / 总会话数 × 100%
```

**业界标准**：

- 优秀：≥ 99.5%
- 良好：≥ 99.0%
- 需改进：< 99.0%

### 应用卡顿率（App Frozen Rate）

主线程长时间阻塞导致界面无响应的会话占比。卡顿通常指：

- **Android**：主线程阻塞超过 5 秒（ANR - Application Not Responding）
- **iOS**：主线程阻塞超过 3-5 秒，导致 Watchdog 超时

```
应用卡顿率 = 卡顿会话数 / 总会话数 × 100%
```

### 系统版本分布

统计不同操作系统版本的用户占比，帮助您：

- 确定最低支持版本
- 识别特定系统版本的兼容性问题
- 规划系统适配优先级

**示例**：

- Android 14: 35%
- Android 13: 28%
- Android 12: 20%
- iOS 17.x: 45%
- iOS 16.x: 32%

### 应用版本分布

统计不同应用版本的用户占比，用于：

- 评估新版本覆盖率
- 监控版本升级进度
- 定位特定版本的质量问题

## 常见问题

---

### 为什么部分网络请求的状态码为 0？

1. **请求被取消**：用户在请求完成前离开页面或取消操作，导致请求中断。
2. **网络中断或超时**：请求在发送过程中遇到网络中断、超时等异常情况，可能导致状态码无法正常返回。
3. **证书验证失败**：HTTPS 请求的 SSL 证书验证失败，连接建立前就被中断。
4. **SDK 兼容性**：在极少数情况下，特定系统版本或设备可能存在兼容性问题，导致数据采集不完整。

### 为什么崩溃次数和 Issue 数量不一致？

崩溃次数是原始错误事件的总数，而 Issue 是经过聚合后的问题数量。Flashduty 会根据错误堆栈、错误类型、发生位置等信息，将相似的崩溃聚合为同一个 Issue。

**示例**：

- 崩溃次数：100 次
- Issue 数量：5 个

这表示 100 次崩溃被聚合成了 5 个不同的问题，每个问题可能由不同的根因导致。

详细了解 [异常聚合策略](https://docs.flashcat.cloud/zh/flashduty/rum/error-grouping)。

### 如何提升无崩溃率？

1. **定位高频崩溃**：通过"页面 Crash 排行"和"热门 Issue"快速定位影响最大的崩溃问题。
2. **分析堆栈信息**：点击具体 Issue 查看详细的错误堆栈和用户环境信息，精准定位问题代码。
3. **关注系统兼容性**：通过"最全 Crash 分布"识别特定系统版本的兼容性问题。
4. **监控版本质量**：通过"最全版本分布"评估新版本质量，必要时进行热修复或回滚。
5. **增强异常捕获**：合理使用 try-catch、全局异常处理器，避免未捕获异常导致崩溃。

### 如何降低应用卡顿率？

1. **优化主线程任务**：将耗时操作（如网络请求、数据库读写、复杂计算）移至后台线程。
2. **优化 UI 渲染**：减少视图层级、优化布局复杂度、使用异步渲染。
3. **优化启动流程**：延迟加载非关键资源，减少启动时主线程阻塞。
4. **监控长任务**：使用性能分析工具（如 Android Profiler、Xcode Instruments）定位具体卡顿代码。
5. **设置合理阈值**：根据业务特点设置合理的卡顿检测阈值（如 3 秒、5 秒）。

### 如何采集用户信息？

1. **登录态用户识别**：对于需要用户登录的应用（如电商、社交、金融等），您可以在用户登录后调用 SDK 的用户标识方法：

   - Android: 参考 [Android 用户会话配置](https://docs.flashcat.cloud/zh/flashduty/rum/android/advanced-configuration#用户会话)
   - iOS: 参考 [iOS 用户会话配置](https://docs.flashcat.cloud/zh/flashduty/rum/ios/advanced-configuration#用户会话)

2. **设备指纹识别**：对于无登录态的应用，推荐基于设备信息生成稳定的设备指纹并上报用户标识：
   - **Android**：可使用 Android ID、IMEI（需权限）、广告 ID 等
   - **iOS**：可使用 IDFV（Identifier for Vendor）或 IDFA（需用户授权）

### 如何优化网络请求性能？

1. **识别慢请求**：通过"资源耗时排行"定位响应时间最长的接口。
2. **分析耗时分布**：查看 DNS 解析、TCP 连接、SSL 握手、首字节时间等各阶段耗时，精准定位瓶颈。
3. **优化建议**：
   - DNS 优化：使用 DNS 缓存、HTTPDNS
   - 连接优化：启用 HTTP/2、连接复用、减少重定向
   - 传输优化：启用 GZIP 压缩、优化数据格式、减少请求体积
   - 接口优化：优化后端接口性能、使用 CDN 加速静态资源

### 数据延迟是多少？

Flashduty RUM 通常在数据产生后的 1-3 分钟内完成采集和展示。在网络状况良好的情况下，大部分数据可实现准实时更新。

## 延伸阅读

---

更多相关文档和资源：

- [Android SDK 接入指南](https://docs.flashcat.cloud/zh/flashduty/rum/android/sdk-integration)
- [iOS SDK 接入指南](https://docs.flashcat.cloud/zh/flashduty/rum/ios/sdk-integration)
- [Android 高级配置](https://docs.flashcat.cloud/zh/flashduty/rum/android/advanced-configuration)
- [iOS 高级配置](https://docs.flashcat.cloud/zh/flashduty/rum/ios/advanced-configuration)
- [RUM Explorer 使用指南](https://docs.flashcat.cloud/zh/flashduty/rum/explorer)
- [错误跟踪](https://docs.flashcat.cloud/zh/flashduty/rum/error-tracking)
- [异常聚合策略](https://docs.flashcat.cloud/zh/flashduty/rum/error-grouping)

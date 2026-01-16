---
title: "百度云BCM监控集成"
description: "通过 webhook 的方式同步百度云 BCM 告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2025-05-19T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/baidu-bcm-integration-guide"
---

通过 webhook 的方式同步百度云 BCM 告警事件到 Flashduty，实现告警事件自动化降噪处理。

<div class="hide">

## 在 Flashduty
---
您可通过以下2种方式，获取一个集成推送地址，任选其一即可。

### 使用专属集成

当您不需要将告警事件路由到不同的协作空间，优先选择此方式，更简单。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **协作空间**，进入某个空间的详情页面
  2. 选择 **集成数据** tab，点击 **添加一个集成**，进入添加集成页面
  3. 选择 **百度云监控BCM** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
  
    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **百度云监控BCM** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>
</div>

## 在百度云监控 BCM
---
<div class="md-block">

1. 登录您的百度云控制台，检索 `云监控` 产品，并进入对应控制台
2. 百度云提供了多种方式来配置告警回调，具体可以参考[官方文档](https://cloud.baidu.com/doc/BCM/s/bkdzl6d69)，以下仅演示 `报警管理-报警策略` 入口配置方式
3. 进入 `报警管理-报警策略` 页面，选择编辑已有或创建新的报警策略
4. 报警策略中 `回调地址` 一栏，填写集成的推送地址（当前页面填写集成名称，保存后即可生成地址）

<img alt="drawing" width="600" src="https://download.flashcat.cloud/baidu-bcm.png" />

5. 完成

</div>

## 状态对照
---
<div class="md-block">
  
百度云监控到 Flashduty 告警等级映射关系：

| BCM  |  Flashduty  | 状态 |
| ---- | -------- | ---- |
| 严重 | Critical | 严重 |
| 重要 | Critical | 严重 |
| 警告 | Warning  | 警告 |
| 通知 | Info     | 提醒 |

</div>

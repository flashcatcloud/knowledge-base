---
title: "zstack 告警事件"
description: "通过 webhook 的方式同步 zstack 告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2024-07-05T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/zstack-integration-guide"
---

通过 webhook 的方式同步 ZStack 告警事件到 Flashduty，实现告警事件自动化降噪处理。

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
  3. 选择 **ZStack** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。

    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **ZStack** 集成： 
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>
</div>

## 在 ZStack
---

<div class="md-block">

## 一、告警推送配置

### 步骤1：创建通知对象

1. 登录您的 `ZStack` 控制台，在 `平台运维` 菜单中，找到 `云平台监控`。
2. 点击左侧的 `通知对象`，点击`创建通知对象`或编辑已有的通知对象。
3. 在编辑页面中，名称填写 `Flashduty` ，类型选择 `Webhook`，`地址` 处填写告警集成的<span class='integration_url'>推送地址</span>。
4. 点击 `发送测试消息`，如果消息发送成功，则说明配置成功。
5. 点击 `确定` 完成配置。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/zh/fd/zstack-1.png" />

### 步骤2：在告警策略中使用通知对象

1. 登录您的 `ZStack` 控制台，在 `平台运维` 菜单中，找到 `云平台监控`。
2. 点击左侧的 `报警器`，点击`创建资源报警器` 或 `创建事件报警器`，或编辑已有的报警器。
3. 在编辑页面中，`通知对象` 处选择创建的 `Flashduty` 通知对象（资源报警器建议打开恢复通知）。
4. 其他按需配置即可，点击 `确定` 完成配置。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/zh/fd/zstack-2.png" />



</dev>

## 二、状态对照

<div class="md-block">

| ZStack |  Flashduty | 状态 |
| ---------- | -------- | ---- |
| 紧急  | Critical | 严重 |
| 严重   | Warning  | 警告 |
| 提示   | Info     | 信息 |

</div>


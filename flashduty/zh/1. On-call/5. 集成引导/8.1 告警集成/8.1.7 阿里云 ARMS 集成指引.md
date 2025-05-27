---
title: "阿里云 ARMS 集成"
description: "通过 webhook 的方式同步阿里云 ARMS 监控告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2025-05-19T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/aliyun-arms-integration-guide"
---

通过 webhook 的方式同步阿里云 ARMS 监控告警事件到 Flashduty，实现告警事件自动化降噪处理。
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
  3. 选择 **阿里云 ARMS** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
  
    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **阿里云 ARMS** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>

</div>

## 在 阿里云 ARMS 
---
**步骤 1：配置 通知对象**

<div class="md-block">

1. 登录您的阿里云控制台，选择ARMS监控产品；
2. 进入 `告警管理 -> 通知对象` 页面，选择 `Webhook集成`，单击 新建Webhook 按钮，开始编辑内容；
3. 如图，设定对象名称，并选择 `Post` ，复制写入集成的推送地址；
4. 添加 `Header`，输入 `Content-Type` 和 `application/json`；
5. 通知模板内输入：`$alertmanager_content`；
6. 点击 确定 按钮，提交保存。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/integration/aliyun-arms/notify_target.png" />


**步骤 2：配置 通知策略**

1. 进入 `告警管理 -> 通知策略` 页面，单击 新建通知策略 或 选择已有的策略进行编辑；
2. 如下图所示，在 `通知对象` 页面，选择已创建好的 `通用Webhook` 对象；
3. 提交保存，等待告警触发。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/integration/aliyun-arms/notify_rule.png" />

</div>

## 状态对照
---
<div class="md-block">
  
阿里云 ARMS 监控到 Flashduty 告警等级映射关系：

| 阿里云 ARMS 监控 |  Flashduty  | 状态 |
| ------------ | -------- | ---- |
| P1     | Critical | 严重 |
| P2     | Warning  | 警告 |
| P3     | Warning     | 警告 |
| P4     | Info     | 提醒 |

</div>

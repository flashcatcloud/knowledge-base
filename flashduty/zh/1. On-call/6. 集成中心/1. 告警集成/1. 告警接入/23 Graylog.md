---
title: "Graylog 告警事件"
description: "通过 webhook 的方式同步Graylog告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2024-06-18T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/graylog-integration-guide"
---

通过 webhook 的方式同步 Graylog 告警事件到 Flashduty，实现告警事件自动化降噪处理。

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
  3. 选择 **Graylog** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
  
    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **Graylog** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>
</div>


## 在 Graylog
---
<div class="md-block">

## 一、Graylog 告警推送配置

### 步骤1：配置告警通道
1. 登录 Graylog 控制台。
2. 菜单中找到 Alerts  并选择 Notifications。
3. 创建 Create Notification。
4. 输入 Title 和 Description。
5. Notification Type 选择 **HTTP Notification**，如下图。

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/doc/graylog-2.png" />

6. 输入 Flashduty 获取到的 URL (第一次输入需要对 URL 加白)。

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/doc/graylog-3.png" />

7. 点击 Save 保存加白的 URL

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/doc/graylog-1.png" />

8. 保存后，提交 Create。

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/doc/graylog-5.png" />

### 步骤2：在告警事件中使用 Flashduty 告警通道
1. 创建或编辑已有的 Event Definition。
2. 此处省略其他告警配置（按业务需求配置告警条件）。
3. 在 Notifications 配置通道。
4. Add Notifition  选择 Flashduty 通道。
5. 点击 Done。
6. 下一步完成即可。

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/doc/graylog-4.png" />
</div>

## 二、状态对照

<div class="md-block">
  
|Graylog| Flashduty|状态|
|---|---|---|
|3|Critical|严重|
|2|Warning|警告|
|1|Info|提醒|

</div>

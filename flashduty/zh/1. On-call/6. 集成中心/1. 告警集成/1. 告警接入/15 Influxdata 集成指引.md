---
title: "Influxdata 集成"
description: "通过 webhook 的方式同步 Influxdata 告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2025-05-19T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/influxdata-integration-guide"
---

通过 webhook 的方式同步 Influxdata 告警事件到 Flashduty，实现告警事件自动化降噪处理。

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
  3. 选择 **Influxdata** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
  
    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **Influxdata** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>
</div>

## 在 Influxdata
---

支持 Influxdata 1.x ~ 2.x 版本，不同版本配置有差异，详看下文

- [2.x 版本](#v2)
- [1.x 版本](#v1)

## 一、Influxdata 配置

<span id="v2"></span>

### 2.x 版本
#### 步骤1：创建告警通道
1. 登录您的 `Influxdata` 控制台，进去 `Alerts > Notifycation Endpoints` 页面。
2. 点击 `Create` 创建告警通知通道。
3. `Destination` 选择 `HTTP`，`Name` 输入 `Flashduty`。
4. `HTTP Method` 选择 `POST`，`URL` 输入集成的推送地址。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/influxdb-1.png" />

#### 步骤2：在通知规则中使用步骤1创建的通道
1. 登录您的 `Influxdata` 控制台，进去 `Alerts > Notifycation Rules` 页面。
2. 点击 `Create` 创建告警通知规则。
3. `About` 和 `Conditions` 按需配置即可。
4. `Message` 选择步骤1创建的 `Flashduty`。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/influxdb-2.png" />

5. 完成。

<span id="v1"></span>

### 1.x 版本
<div class="md-block">

1. 登录您的 `Influxdata` 控制台，进去 `Alerting > Alert Rules` 页面
2. 点击需要同步事件的告警规则，进入 `Alert Rule Builder` 页面，开始编辑规则
3. `Alert Handlers` 部分，选择 `Add Another Handler`，类型选择 `post，HTTP endpoint` 填入集成的推送地址，如下图所示：

<img alt="drawing" width="600" src="https://download.flashcat.cloud/influxdb-alert-rule.png" />

4. 点击 `Save Rule` 按钮，保存。等待事件触发，如果在集成列表展示了最新事件时间，说明配置成功且收到事件
5. 完成

## 二、状态对照

<div class="md-block">
  
Influxdata 告警事件到快猫星云告警等级映射关系：

| Influxdata | 快猫星云 | 状态 |
| ---------- | -------- | ---- |
| CRITICAL   | Critical | 严重 |
| WARNING    | Warning  | 警告 |
| INFO       | Info     | 提醒 |
| unknow     | Info     | 提醒 |

</div>

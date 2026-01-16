---
title: "AppDynamics 告警事件"
description: "通过 webhook 的方式同步 AppDynamics 告警事件到 Flashduty，实现告警事件自动化降噪处理"
date: "2024-07-05T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/appdynamics-integration-guide"
---

通过 webhook 的方式同步 AppDynamics 告警事件到 Flashduty，实现告警事件自动化降噪处理。

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
  3. 选择 **AppDynamics** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
  
    
</details>

### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **AppDynamics** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>

</div>

## 在 AppDynamics
---

<div class="md-block">

## 一、AppDynamics 告警推送配置

### 步骤1：配置 FlashDudy 告警通道

1. 登录您的 AppDynamics 控制台。
2. 找到 `Alert Respond` ，选择 `HTTP Request Templates` 并点击 `New` 新建告警通道。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-1.png" />

3. 在模版配置中，`Name` 填写 **Flashduty** 。
4. 在 `Request URL` 部分，`Method` 选择 **POST** ，`Raw URL` 填写集成的推送地址（当前页面填写集成名称，保存后即可生成地址）。
 
<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-2.png" />

5. 在 `Payload` 部分，`MIME Type` 选择 `application/json`，`Payload Encoding` 选择 `UTF-8`。
6. 在 `Payload` 文本框中，粘贴一下内容：

```
{
	"policy_name":"${policy.name}",
	"message": "${latestEvent.eventMessage}",
	"application_name": "${latestEvent.application.name}",
	"link": "${latestEvent.deepLink}",
	"incident_id": "${latestEvent.incident.id}",
	"details": {
		"event_id": "${latestEvent.id}",
		"event_name": "${latestEvent.displayName}",
		"event_time": "${latestEvent.eventTime}",
		"event_type": "${latestEvent.eventType}",
		"health_rule_name":"${latestEvent.healthRule.name}",
		"node_name": "${latestEvent.node.name}",
		"severity": "${latestEvent.severity}"
	}
}


```


<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-3.png" />


**特别说明（可选配置）**

配置：`Custom Templating Variables`

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-5.png" />

如果需要配置 `Custom Templating Variables` ，可以参考以下 JSON 模版，其中 custom_variables 是固定写法，custom_variables 中的变量是自定义的 `Variables`，页面中定义的名称需要与 JSON 模版中引用的变量名保持一致。

```
{
	"policy_name":"${policy.name}",
	"message": "${latestEvent.eventMessage}",
	"application_name": "${latestEvent.application.name}",
	"link": "${latestEvent.deepLink}",
	"incident_id": "${latestEvent.incident.id}",
	"details": {
		"event_id": "${latestEvent.id}",
		"event_name": "${latestEvent.displayName}",
		"event_time": "${latestEvent.eventTime}",
		"event_type": "${latestEvent.eventType}",
		"health_rule_name":"${latestEvent.healthRule.name}",
		"event_type_key": "${latestEvent.eventTypeKey}",
		"node_name": "${latestEvent.node.name}",
		"severity": "${latestEvent.severity}"
	},
	"custom_variables":{
		"host":"${host}"
	}
}

```

7. 在 `Response Handling Criteria` 部分，将 `Failure Criteria` 状态代码设置为 400，将 `Success Criteria` 状态代码设置为 201。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-4.png" />

8. 点击 `Save` 保存即可。

### 步骤2：创建 Action

1. 在左侧导航栏中选择 `Actions`，选择要为哪个应用类型创建，并点击 `Create`。
2. 在弹出的 `Create Action` 框中，选择 `Make an HTTP Request` 并点击 `OK`。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-6.png" />

3. 在弹出的 `Create HTTP Action` 框中，输入 Name，`HTTP Request Template` 选择 `步骤1` 创建的 **Flashduty** 并点击 `SAVE`。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-7.png" />

### 步骤3：在告警策略中使用步骤2创建的 Action

1. 在左侧导航栏中选 `Policies`。
2. 创建或编辑已有的策略（告警规则按需配置即可，此处省略告警规则的配置）。
3. 在弹出的配置策略页面的 `Actions` 处，点击添加并选择 `步骤2` 创建的 Action 。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/appdyn-8.png" />

4. 其他配置完成后，点击 `Save` 保存即可。

</dev>

## 二、状态对照

<div class="md-block">

|AppDynamics| Flashduty|状态|
|---|---|---|
|ERROR|Critical|严重|
|WARN|Warning|警告|
|INFO|Info|提醒|

</div>

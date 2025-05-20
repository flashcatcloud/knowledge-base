---
title: "Keep 告警集成指引"
description: "通过 Keep 的 Provider 将告警事件推送到 Flashduty，实现告警事件自动化降噪处理。"
date: "2025-05-19T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/keep-alert-integration-guide"
---

通过 Keep 的 Flashduty Provider 将告警事件推送到 Flashduty，实现告警事件自动化降噪处理。

<div class="hide">

## 在 Flashduty

您可通过以下2种方式，获取一个集成秘钥，任选其一即可。

#### 使用专属集成

当您不需要将告警事件路由到不同的协作空间，优先选择此方式，更简单。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **协作空间**，进入某个空间的详情页面
  2. 选择 **集成数据** tab，点击 **添加一个集成**，进入添加集成页面
  3. 选择 **Keep** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **集成秘钥**，复制备用，完成。
    
</details>

#### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 **Keep** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **集成秘钥** 备用。
  5. 完成。
    
</details>
</div>


## 在 Keep
---

### 字段释义

字段|必含|类型|释义
:-:|:-:|:-:|:---
| title       | 是   | string | 告警标题，不超过`512`个字符，超出后将自动截断。
| event_status | 是   | string | 告警状态。<br><br>枚举值（`首字母大写`）：*Critical*：严重，*Warning*：警告，*Info*：提醒，*Ok*：恢复。<br><br>当指定为Ok时，意味着对告警进行自动恢复。
| alert_key    | 否   | string | 告警标识，用于对已经存在的告警进行更新或自动恢复。<br><br>您可以自定义此值，但不可超过`255`个字符。您也可以依赖系统自动生成，该值会在响应中返回。<br><br>如果您上报的是恢复事件，则此值必须存在。                     
| description  | 否   | string | 告警描述，不超过`2048`个字符，超出后将自动截断。
| labels       | 否   | map    | 告警标签集合，key 为标签名称，value 为标签值：<br><br>1. 标签的 key 和 value 均为 string 类型，区分大小写。<br>2. 标签的 key 不要超过`128`个字符，遵循Prometheus标签命名规范。value 不超过`2048`个字符，超出后将自动截断。<br>3. 至多传入`50`个标签。`标签内容参考`[最佳实践](#最佳实践)。<br><br>示例："resource": "171.26.23.22", "check": "api latency > 500ms"
    


### 配置方式

#### 步骤1: 配置 Flashduty Provider
1. 登录 Keep 控制台，进入 `Providers` 列表，选择并点击 `Flashduty`。
2. 在 `Flashduty Integration Key` 字段中填写 Flashduty 的 `集成秘钥`。
3. 点击 `Save` 保存配置。

<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/en/fd/keep-1.png" />

#### 步骤2: 配置 WorkFlows
1. 登录 Keep 控制台，进入 `WorkFlows` ， 创建或编辑已有的 Workflow 。
2. `Trigger` 部分按需配置。
3. 在 `Steps` 部分选择 `flashduty-action` 并选择上一步配置的 `Flashduty Provider`。
4. 在 `flashduty-action` 的 `Configure` 中配置告警标题、告警状态、告警描述、告警标签等(具体字段释义请参考[字段释义](#字段释义))。
5. 点击 `Save` 保存配置。


<img alt="drawing" width="600" src="https://download.flashcat.cloud/flashduty/doc/en/fd/keep-2.png" />


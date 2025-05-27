---
title: "Prometheus告警集成"
description: "通过 webhook 的方式将 Prometheus 告警事件通过 AlertManager 推送到 Flashduty。当告警触发时，向 Flashduty 发送触发事件，当告警恢复时，向 Flashduty 发送恢复事件。"
date: "2025-05-19T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/prometheus-integration-guide"
---

通过 webhook 的方式将 Prometheus 告警事件通过 AlertManager 推送到 Flashduty。当告警触发时，向 Flashduty 发送触发事件，当告警恢复时，向 Flashduty 发送恢复事件。

<div class="hide">

## 使用限制
---

### 在 AlertManager

- 您必须拥有修改 AlertManager 配置文件的权限。
- 您的 AlertManager server 必须能够访问域名 api.flascat.cloud，将告警推送到外网。

## 支持版本
---

本文适配 **Alertmanager 0.16.0 及以上** 版本。

## 操作步骤
---

### 在 Flashduty

您可通过以下2种方式，获取一个集成推送地址，任选其一即可。

#### 使用专属集成

当您不需要将告警事件路由到不同的协作空间，优先选择此方式，更简单。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **协作空间**，进入某个空间的详情页面
  2. 选择 **集成数据** tab，点击 **添加一个集成**，进入添加集成页面
  3. 选择 **Prometheus** 集成，点击 **保存**，生成卡片。
  4. 点击生成的卡片，可以查看到 **推送地址**，复制备用，完成。
    
</details>

#### 使用共享集成

当您需要根据告警事件的 Payload 信息，将告警路由到不同的协作空间，优先选择此方式。

<details>
  <summary>展开</summary>
  
  1. 进入 Flashduty 控制台，选择 **集成中心=>告警事件**，进入集成选择页面。
  2. 选择 ** Prometheus** 集成：
        - **集成名称**：为当前集成定义一个名称。
  3. 配置默认路由，并选择对应的协作空间（集成创建后可以前往 `路由` 进行更多路由规则的配置）。
  4. 点击 **保存** 后，复制当前页面的新生成的 **推送地址** 备用。
  5. 完成。
    
</details>
</div>

### 在 AlertManager

#### 步骤 1：配置 Alertmanager

<div class="md-block">

1. 登录您的 Alertmanager 实例
2. 找到并打开配置文件，一般为 Alertmanager 部署根目录下的 alertmanager.yml
3. 在 receivers 配置部分，增加一个 Flashduty  webhook 类型的 receiver，如下

   ```
   receivers:
   - name: 'flashcat'
     webhook_configs:
     - url: '<您的集成推送地址>'
       send_resolved: true

   ```

   您需要替换 url 对应的参数值为集成的推送地址，注意 query string 参数部分需要携带 integration_key。

   如果您需要通过代理请求 Flashduty，可以额外设置 http_config 的 proxy_url 参数为代理地址：
   
      ```
      receivers:
      - name: 'flashcat'
        webhook_configs:
        - url: '<您的集成推送地址>'
          send_resolved: true
          http_config:
          proxy_url: 'http://proxyserver:port'

      ```

4. 在 route 配置部分，更改默认 route 指定 receiver 为刚才配置的 webhook，如下：

   ```route config
   route:
     receiver: 'flashcat'
   ```

   如果希望不影响之前的推送渠道，您也可以把 receiver 添加到 route 的子路由中
    
    ```route config
   route:
     receiver: 'feishu'
     - routes:
       receiver: 'flashcat'
    ```


5. 保存配置文件
6. 通过重新加载配置文件（向进程发送 SIGHUP 信号，或 POST 请求/-/reload api），使更改生效
7. 完成

</div>

#### 步骤 2：配置 Timestamp

默认情况下，系统使用当前时间作为事件触发时间。如果您希望自定义时间，您可以额外设定一个 timestamp 字段来标识每一次告警发生的准确时间。

<div class="md-block">

1. 登录您的 Prometheus Server 实例
2. 打开告警规则相关配置文件
3. 对于每一条告警规则，更改 annotations 部分，添加 timestamp 字段，如下：

   ```
   annotations:
     timestamp: '{{ with query "time()" }}{{ . | first | value }}{{ end }}'
     ...
   ```

4. 保存配置文件
5. 通过重新加载配置文件（向进程发送 SIGHUP 信号，或 POST 请求/-/reload api），使更改生效
6. 完成

</div>

## 严重程度映射关系
---

系统依次提取告警事件标签中的 `severity`、`priority`和 `level`，对应值将作为 Prometheus 自身的告警等级，如果没有提取到，系统自动设置 Prometheus 告警等级为 `Warning`。

Promtheus 到 Flashduty 告警等级映射关系：

| Prometheus   |  Flashduty  | 状态 |
| ------------ | -------- | ---- |
| critical     | Critical | 严重 |
| warning      | Warning  | 警告 |
| warn         | Warning  | 警告 |
| info         | Info     | 提醒 |
| acknowledged | Info     | 提醒 |
| unknown      | Info     | 提醒 |
| unk          | Info     | 提醒 |
| ok           | Ok       | 恢复 |

## 常见问题
---

<details>
  <summary>为什么在Flashduty没有收到告警？</summary>

  #### 在 Flashduty
  
  1. 查看集成是否展示了 **最新事件时间**？如果没有，代表Flashduty没有收到推送，直接优先排查 AlertManager 部分。
  2. 如果您使用的是 **共享集成**，优先确认您是否配置了 **路由规则**。不设置路由规则，系统会直接拒绝新的推送，因为没有协作空间可以承接您的告警。这种情况下，直接配置路由规则到您期望的空间即可。

  #### 在 AlertManager

  1. 首先确认 AlertManager 测是否产生了新的告警。如没有产生新告警，请继续等待新告警触发后重新验证。
  2. 打开 AlertManager 配置文件，如果您设置了子路由，请确保您的路由设置正确（比如前边的路由设置了 continue，AlertManager 会跳过匹配后续子路由。我们推荐您永远仅设置一个默认路由到 Flashduty）。同时验证，目标回调地址是否和集成推送地址完全匹配。如果不匹配，请修改 **告警规则**后重新验证。
  3. 如果匹配，请继续确认 AlertManager 实例可以访问外网 api.flashcat.cloud 域名。如果不可以，您首先需要为其开通外网，或单独针对 Flashduty 的域名开通外网访问。
  4. 如果网络无问题，您需要继续排查 AlertManager，查找是否存在相关的错误日志。


  如果以上步骤执行之后，仍然没有查询到问题根因，请直接联系我们。
    
</details>




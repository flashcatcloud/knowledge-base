---
title: "Keycloak配置单点登录、配置SSO登录"
description: "在Keycloak中配置单点登录教程"
date: "2024-05-10T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/keycloak-integration-guide"
---

## 快速了解
---

Keycloak 是一个开源的身份和访问管理解决方案，它提供了一套全面的工具和功能，帮助开发人员快速实现安全的用户身份验证和授权机制，同时简化了应用程序的身份和访问管理流程

:::tip

本篇文章不涉及部署和讲解 Keycloak 相关内容，如需了解更多信息，请参考[官方文档](https://www.keycloak.org/)

:::

## 基于 SAML2.0 协议
---
### 1.登录 FlashDuty 控制台
#### 1.1 从 FlashDuty 获取 acs 地址（第2步会用到）
#### 1.2 路径：访问控制=>单点登录=>设置=>SAML2.0协议=>Flashcat服务提供商信息=>Assertion Consumer Service URL

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437194/image-preview)

### 2.登录Keycloak控制台新建一个 Client
#### 2.1 路径：Clients => Create client
#### 2.2 Client Type：选择 SAML 协议
#### 2.3 Client ID填写： flashcat.cloud（固定值，不可更改）
#### 2.4 Valid redirect URIs： 填写从 FlashDuty 获取的 acs 地址

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437197/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437029/image-preview)

### 3.配置Client相关信息

#### 3.1 Name ID format 更改为email类型

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437031/image-preview)

#### 3.2 Client signature required 设置为关闭状态

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437195/image-preview)


#### 3.3 创建 email/phone/username 三种字段类型
:::tip
创建之前需要先删除之前 OpenID Connect 协议的用户，创建完成设置为 Default
:::
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437033/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437034/image-preview)

#### 3.4 将添加的用户加入到 Client 中
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437037/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437038/image-preview)


#### 3.5 配置 email/phone/username 映射器(以 email 为例，其他按照下面步骤配置即可)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437057/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437058/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437060/image-preview)

### 4.下载 XML 文件
:::tip

下载的文件是一个压缩包，在本地解压后会有两个xml文件，只需要 idp-metadata.xml 文件即可

:::
 #### 4.1 在 Client>Action 中下载到本地
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437039/image-preview)

#### 4.2 上传 XML 文件到 FlashDuty 的单点登录配置中
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437040/image-preview)


### 5.在 Keycloak 创建用户并测试登录

#### 5.1 创建用户（一定要绑定一个邮箱地址）
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437041/image-preview)

#### 5.2 登录测试
 - 访问console.flashcat.cloud，选择SSO登录---域名处填写单点登录配置中登录域名前缀

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437062/image-preview)

## 基于 OIDC 协议
---
### 1.登录 FlashDuty 平台
- 从FlashDuty获取Redirect URL（第2步会用到）
- 路径：**访问控制=>单点登录=>设置=>OIDC协议=>Flashcat 服务提供商信息==>Redirect URL**
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437183/image-preview)

### 2.登录 Keycloak 控制台新建一个 Client

- Client Type：选择 OIDC 协议
- Clinet ID：没有特殊要求
- Client authentication：保持开启状态
- Valid redirect URIs：填写第1步获取的 Redirect URL 地址

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437179/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437180/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437184/image-preview)

### 3.获取 Client 的相关信息

- Client ID：创建 Client 时填写的ID
- Client Secret：**Client 详情=>Credentials** 卡片中即可看到
- Issuer：**Realm settings=>Endpoints=>OpenID Endpoint Configuration**

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437186/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437187/image-preview)

### 4.FlashDuty 单点登录配置样式

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437188/image-preview)

:::tip
基于OIDC配置完成后，登录测试参考 配置单点登录 部分即可

:::



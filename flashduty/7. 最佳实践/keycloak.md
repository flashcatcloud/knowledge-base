
## 快速了解
---

Keycloak是一个开源的身份和访问管理解决方案，它提供了一套全面的工具和功能，帮助开发人员快速实现安全的用户身份验证和授权机制，同时简化了应用程序的身份和访问管理流程

:::tip

本篇文章不涉及部署和讲解Keycloak相关内容，如需了解Keycloak更多信息，请参考[官方文档](https://www.keycloak.org/)

:::

## 基于SAML2.0协议
---
### 1.登录Flashduty控制台
#### 1.1 从Flashduty获取acs地址（第2步会用到）
#### 1.2 路径：访问控制--->单点登录--->设置--->SAML2.0协议---->Flashcat服务提供商信息--->Assertion Consumer Service URL

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437194/image-preview)

### 2.登录Keycloak控制台新建一个Client
#### 2.1 路径：Clients ---> Create client
#### 2.2 Client Type：选择SAML协议
#### 2.3 Client ID填写： flashcat.cloud（固定值，不可更改）
#### 2.4 Valid redirect URIs： 填写从Flashduty获取的acs地址

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437197/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437029/image-preview)

### 3.配置Client相关信息

#### 3.1 Name ID format 更改为email类型

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437031/image-preview)

#### 3.2 Client signature required 设置为关闭状态

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437195/image-preview)


#### 3.3 创建email/phone/username三种字段类型
:::tip
创建之前需要先删除之前OpenID Connect协议的用户，创建完成设置为Default
:::
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437033/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437034/image-preview)

#### 3.4 将添加的用户加入到Client中
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437037/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437038/image-preview)


#### 3.5 配置email/phone/username映射器(以email为例，其他按照下面步骤配置即可)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437057/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437058/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437060/image-preview)

### 4.下载XML文件
:::tip

下载的文件是一个压缩包，在本地解压后会有两个xml文件，只需要idp-metadata.xml文件即可

:::
 #### 4.1 在Client--->Action中下载到本地
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437039/image-preview)

#### 4.2 上传XML文件到Flashduty的单点登录配置中
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437040/image-preview)


### 5.在Keycloak创建用户并测试登录

#### 5.1 创建用户（一定要绑定一个邮箱地址）
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437041/image-preview)

#### 5.2 登录测试
 - 访问console.flashcat.cloud，选择SSO登录---域名处填写单点登录配置中登录域名前缀

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437062/image-preview)

## 基于OIDC协议
---
### 1.登录Flashduty平台
- 从Flashduty获取Redirect URL（第2步会用到）
- 路径：访问控制--->单点登录--->设置--->OIDC协议---->Flashcat服务提供商信息--->Redirect URL
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437183/image-preview)

### 2.登录Keycloak控制台新建一个Client

- Client Type：选择OIDC协议
- Clinet ID：没有特殊要求
- Client authentication：保持开启状态
- Valid redirect URIs：填写第1步获取的Redirect URL地址

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437179/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437180/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437184/image-preview)

### 3.获取Client的相关信息

- Client ID：创建Client时填写的ID
- Client Secret：Client详情->Credentials卡片中即可看到
- Issuer：Realm settings->Endpoints->OpenID Endpoint Configuration

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437186/image-preview)
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437187/image-preview)

### 4.Flashduty单点登录配置样式

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/437188/image-preview)

:::tip
基于OIDC配置完成后，登录测试参考5.2小节部分即可

:::
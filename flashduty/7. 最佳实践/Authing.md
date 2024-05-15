快速了解
---
[Authing](https://www.authing.cn/)是一家提供身份识别和访问控制管理的供应商，通过Authing平台，可实现以OIDC或SAML2.0协议的方式登录Flashduty管理控制台

## 准备工作
---
### 1. 登录或注册Authing
- 如果是新注册用户，需先创建用户池，根据提示创建即可
### 2. 创建应用
- 选择标准web应用
- 填写应用名称
- 填写认证地址(SSO登录时跳转的地址)

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436934/image-preview)

### 3.记录相关信息

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436952/image-preview)

|字段|描述|
|---|---|
|App ID|对应Flashduty的Client ID|
|APP Secret|对应Flashduty的Client Secret|
|Issuer|对应Flashduty的Issuer|
|认证地址|通过SSO登录时跳转的地址|



## 开始配置OIDC协议
---
### 1. 打开[Flashduty](console.flashcat.cloud)控制台并开启单点登录配置

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436946/image-preview)

### 2.配置相关信息复制到对应的填写框中

#### 2.1 将Authing应用的相关信息复制到对应的填写框中
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436951/image-preview)

#### 2.2 将Redirect URL域名复制到Authing的登录回调 URL中

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436957/image-preview)

### 3.更改Authing配置

#### 3.1 按图配置，只需将id_token 签名算法更改为RS256即可

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436961/image-preview)

#### 3.2 配置登录控制

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436964/image-preview)

#### 3.3 更改权限

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436967/image-preview)

### 4.创建用户并测试登录

#### 4.1 在Authing中创建用户

:::tip
Flashduty 只支持用户邮箱关联，所以需要用邮箱创建用户
:::


![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436973/image-preview)

#### 4.2 使用SSO地址测试登录

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436976/image-preview)

:::tip
**可以访问console.flashcat.cloud 通过SSO的方式登录**
:::

#### 4.3 SSO地址跳转到登录页面

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436980/image-preview)

:::tip
使用在Authing创建的用户，登录Flashduty控制台
:::


## 开始配置SAML2.0协议
---

:::tip
可以新创建应用或者在已有的应用中修改，这里通过修改应用进行演示
:::

### 1.协议配置

#### 1.1 选择SAML2.0

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436984/image-preview)

#### 1.2 将Flashduty的单点登录协议改成SAML协议，并复制acs地址

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436987/image-preview)

#### 1.3 acs地址复制到authing应用中后，点击保存并修改协议类型

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436989/image-preview)

### 2.在Flashduty中配置

#### 2.1 下载metadata数据，点击链接并保存到本地

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436990/image-preview)

#### 2.2 上传到Flashduty的单点登录配置中并保存

![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436991/image-preview)

#### 2.3 测试登录（参考OIDC协议的登录）
![image.png](https://api.apifox.com/api/v1/projects/4169655/resources/436980/image-preview)
:::tip
以上是两种方式的全部配置方式，两个平台在配置时有穿插，所以请务必小心不要遗忘关键信息，如在配置过程中有任何问题，可以联系Flashduty技术支持协助
:::

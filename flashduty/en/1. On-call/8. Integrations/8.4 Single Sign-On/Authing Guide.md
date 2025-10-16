---
title: "Configuring Single Sign-On with Authing"
description: "Guide to configuring SSO login with Authing"
date: "2024-05-10T10:00:00+08:00"
url: "https://docs.flashcat.cloud/en/flashduty/authing-integration-guide"
---

Quick Overview
---
[Authing](https://www.authing.cn/) is an identity authentication and access control management provider. Through the Authing platform, you can implement login to the Flashduty management console using OIDC, SAML2.0, or CAS protocols.

## Prerequisites
---
### 1. Login or Register with Authing
- New users need to create a user pool first, following the provided prompts
### 2. Create an Application
- Select Standard Web Application
- Enter the application name
- Enter the authentication URL (redirect URL for SSO login)

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436934/image-preview" />

### 3. Record Important Information

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436952/image-preview" />

|Field|Description|
|---|---|
|App ID|Corresponds to Flashduty Client ID|
|APP Secret|Corresponds to Flashduty Client Secret|
|Issuer|Corresponds to Flashduty Issuer|
|Authentication URL|Redirect URL for SSO login|

## Configuring OIDC Protocol
---
### 1. Open [Flashduty](console.flashcat.cloud) Console and Enable SSO Configuration

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436946/image-preview" />

### 2. Configure Related Information

2.1 Copy Authing application information to the corresponding fields
<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436951/image-preview" />

2.2 Copy the Redirect URL domain to Authing's callback URL

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436957/image-preview" />

### 3. Modify Authing Configuration

3.1 Configure as shown, only change the id_token signing algorithm to RS256

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436961/image-preview" />

3.2 Configure Login Controls

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436964/image-preview" />

3.3 Modify Permissions

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436967/image-preview" />

### 4. Create Users and Test Login

4.1 Create Users in Authing

:::tip
Flashduty only supports email association, so users must be created with email addresses
:::

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436973/image-preview" />

4.2 Test Login Using SSO URL

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436976/image-preview" />

:::tip
**You can access console.flashcat.cloud and login via SSO**
:::

4.3 SSO URL Redirects to Login Page

<img alt="drawing" width="300" src="https://api.apifox.com/api/v1/projects/4169655/resources/436980/image-preview" />

:::tip
Use the user created in Authing to login to Flashduty console
:::

## Configuring SAML2.0 Protocol
---

:::tip
You can create a new application or modify an existing one. This guide demonstrates modification of an existing application
:::

### 1. Protocol Configuration

1.1 Select SAML2.0

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436984/image-preview" />

1.2 Change Flashduty's SSO protocol to SAML and copy the ACS URL

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436987/image-preview" />

1.3 Copy the ACS URL to Authing application, save and modify the protocol type

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436989/image-preview" />

### 2. Configure in Flashduty

2.1 Download metadata file by clicking the link and save locally

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436990/image-preview" />

2.2 Upload to Flashduty's SSO configuration and save

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436991/image-preview" />

2.3 Test Login (refer to OIDC protocol login steps)

<img alt="drawing" width="300" src="https://api.apifox.com/api/v1/projects/4169655/resources/436980/image-preview" />

:::tip
These are the complete configuration steps for both methods. The configuration process involves both platforms, so please ensure no critical information is missed. If you encounter any issues during configuration, please contact Flashduty technical support for assistance
:::

## Configuring CAS Protocol
---
### 1. Open [Flashduty](console.flashcat.cloud) Console and Enable SSO Configuration

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436946/image-preview" />

### 2. Configure Related Information

2.1 Copy Authing application information to the corresponding fields

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/cas-duty-conf.jpg" />

2.2 Copy the Redirect URL to Authing's callback URL

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/cas-auth-callback.jpg" />

### 3. Modify Authing Configuration

3.1 Configure as shown

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/cas-auth-conf.jpg" />

3.2 Configure Login Controls

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436964/image-preview" />

3.3 Modify Permissions

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436967/image-preview" />

### 4. Create Users and Test Login

4.1 Create Users in Authing

:::tip
Flashduty only supports email association, so users must be created with email addresses
:::

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/436973/image-preview" />

4.2 Test Login Using SSO URL

<img alt="drawing" width="600" src="https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/cas-login.jpg" />

4.3 SSO URL Redirects to Login Page

<img alt="drawing" width="300" src="https://api.apifox.com/api/v1/projects/4169655/resources/436980/image-preview" />

:::tip
Use the user created in Authing to login to Flashduty console
:::
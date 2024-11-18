---
title: "Keycloak SSO Configuration Guide"
description: "Tutorial for configuring Single Sign-On in Keycloak"
date: "2024-05-10T10:00:00+08:00"
url: "https://docs.flashcat.cloud/en/flashduty/keycloak-integration-guide"
---

## Quick Overview
---

Keycloak is an open-source identity and access management solution that provides a comprehensive set of tools and features, helping developers quickly implement secure user authentication and authorization mechanisms while simplifying identity and access management processes for applications.

:::tip

This article does not cover Keycloak deployment and detailed explanations. For more information, please refer to the [official documentation](https://www.keycloak.org/)

:::

## SAML 2.0 Protocol Configuration
---
### 1. Log in to FlashDuty Console
1.1 Get the ACS URL from FlashDuty (needed in step 2)
1.2 Path: Access Control => Single Sign-On => Settings => SAML 2.0 Protocol => Flashcat Service Provider Information => Assertion Consumer Service URL

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437194/image-preview" />

### 2. Create a New Client in Keycloak Console
2.1 Path: Clients => Create client
2.2 Client Type: Select SAML protocol
2.3 Client ID: Enter flashcat.cloud (fixed value, cannot be changed)

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437197/image-preview" />

2.4 Valid redirect URIs: Enter the ACS URL obtained from FlashDuty

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437029/image-preview" />

### 3. Configure Client Settings

3.1 Change Name ID format to email type

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437031/image-preview" />

3.2 Set Client signature required to OFF

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437195/image-preview" />

3.3 Create Client scope

:::tip
Before creating, you need to delete previous OpenID Connect protocol users. After creation, set it as Default
:::

3.3.1 Create email/phone/username types following the image below
<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437033/image-preview" />

3.3.2 Final result after creation
<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437034/image-preview" />

3.4 Add users to the Client

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437037/image-preview" />

<img alt="drawing" width="600" 
src="https://api.apifox.com/api/v1/projects/4169655/resources/437038/image-preview" />

3.5 Configure email/phone/username mappers (using email as an example, follow the same steps for others)

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437057/image-preview" />

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437058/image-preview" />

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437060/image-preview" />

### 4. Download XML File
:::tip

The downloaded file is a compressed archive containing two XML files. You only need the idp-metadata.xml file

:::
4.1 Download from Client > Action

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437039/image-preview" />

4.2 Upload the XML file to FlashDuty's SSO configuration

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437040/image-preview" />

### 5. Create Users in Keycloak and Test Login

5.1 Create user (must bind an email address)
<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437041/image-preview" />

5.2 Test login
 - Visit console.flashcat.cloud, select SSO login => Enter the login domain prefix from SSO configuration

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437062/image-preview" />

## OIDC Protocol Configuration
---
### 1. Log in to FlashDuty Platform
1.1 Get Redirect URL from FlashDuty (needed in step 2)
2.2 Path: **Access Control => Single Sign-On => Settings => OIDC Protocol => Flashcat Service Provider Information => Redirect URL**

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437183/image-preview" />

### 2. Create a New Client in Keycloak Console

2.1 Client Type: Select OIDC protocol
2.2 Client ID: No special requirements

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437179/image-preview" />

2.3 Client authentication: Keep enabled

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437180/image-preview" />

2.4 Valid redirect URIs: Enter the Redirect URL obtained in step 1

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437184/image-preview" />

### 3. Get Client Information

3.1 Client ID: The ID entered when creating the Client
3.2 Client Secret: Found in **Client details => Credentials** card

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437186/image-preview" />

3.3 Issuer: **Realm settings => Endpoints => OpenID Endpoint Configuration**

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437187/image-preview" />

### 4. FlashDuty SSO Configuration Example

<img alt="drawing" width="600" src="https://api.apifox.com/api/v1/projects/4169655/resources/437188/image-preview" />

:::tip
After completing OIDC configuration, refer to section 5.2 for login testing

:::



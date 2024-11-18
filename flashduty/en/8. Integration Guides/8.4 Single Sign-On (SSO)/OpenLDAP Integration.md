---
title: "OpenLDAP Integration Guide"
description: "Tutorial for Setting up LDAP in Docker Compose"
date: "2024-06-18T10:00:00+08:00"
url: "https://docs.flashcat.cloud/en/flashduty/introduction"
---

:::tip

LDAP integration login is only supported in the `Enterprise Edition`

:::

## Quick Overview
---

LDAP (Lightweight Directory Access Protocol) is a protocol based on the X.500 standard for accessing and maintaining distributed directory services. LDAP enables users and applications to query, browse, and search information stored in directories, such as user identity information and network resources. LDAP typically runs on the TCP/IP protocol stack, specifically using TCP port 389 (for unencrypted communication) and 636 (for encrypted communication using LDAPS).

Key features of LDAP include:

Tree Structure: LDAP data is organized in a tree structure called DIT (Directory Information Tree), facilitating hierarchical searching and browsing.

Entries and Attributes: Each entry in LDAP contains multiple attributes, which have types and values. For example, "cn" represents Common Name, and "mail" represents email address.

OpenLDAP is an open-source implementation of the Lightweight Directory Access Protocol (LDAP). Due to its open-source nature and flexibility, OpenLDAP has become the preferred LDAP implementation for many enterprises and organizations.


:::tip

This guide assumes Docker and Docker Compose are already installed in your environment. If not, please install them first.

:::


## Docker Compose Configuration File
---
```
version: '1'

networks:
  go-ldap-admin:
    driver: bridge

services:
  openldap:
    image: osixia/openldap:1.5.0
    container_name: go-ldap-admin-openldap
    hostname: go-ldap-admin-openldap
    restart: always
    environment:
      TZ: Asia/Shanghai
      LDAP_ORGANISATION: "flashduty.com"
      LDAP_DOMAIN: "flashduty.com"
      LDAP_ADMIN_PASSWORD: "password"
    volumes:
      - ./openldap/ldap/database:/var/lib/ldap
      - ./openldap/ldap/config:/etc/ldap/slapd.d
    ports:
      - 389:389
    networks:
      - go-ldap-admin

  phpldapadmin:
    image: osixia/phpldapadmin:0.9.0
    container_name: go-ldap-admin-phpldapadmin
    hostname: go-ldap-admin-phpldapadmin
    restart: always
    environment:
      TZ: Asia/Shanghai
      PHPLDAPADMIN_HTTPS: "false"
      PHPLDAPADMIN_LDAP_HOSTS: go-ldap-admin-openldap
    ports:
      - 8088:80
    volumes:
      - ./openldap/phpadmin:/var/www/phpldapadmin
    depends_on:
      - openldap
    links:
      - openldap:go-ldap-admin-openldap
    networks:
      - go-ldap-admin

```

:::tip

Replace "password" with your desired password

:::

## Starting the Service
---
Save the above configuration as docker-compose.yml, open a terminal or command prompt in the configuration file directory, and run the following command to start the service:
```
docker-compose up
```

To run the service in the background, add the -d flag:
```
docker-compose up -d
```

Check service status:
Use the following command to check the service status:
```
docker-compose ps
```

Stop the service:
When you want to stop the service, use:
```
docker-compose down
```

## Logging into OpenLDAP
---
Access http://ip:8088/ in your browser and log in using the username cn=admin,dc=flashduty,dc=com and your password xxx.

## OpenLDAP Configuration
---
### Adding Groups and Users

![image.png](https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/ldap-add-group-user.png)


:::tip

Under `User Path` (e.g., cn=flash duty under ou=people in the above image) -> `Add new attribute` -> select `Email` to add the Email attribute for the user. Ignore if it already exists.

:::

## FlashDuty Integration
Based on the above OpenLDAP configuration, the FlashDuty integration information is shown in the following image:
![image.png](https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/ldap-duty-config.png)


:::tip

For the meaning and description of the above fields, please refer to [Configure Single Sign-On](https://docs.flashcat.cloud/en/flashduty/single-sign-on)

:::

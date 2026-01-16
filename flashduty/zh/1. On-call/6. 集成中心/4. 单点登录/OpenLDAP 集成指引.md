---
title: "OpenLDAP 集成指引"
description: "在Docker Compose中搭建LDAP教程"
date: "2024-06-18T10:00:00+08:00"
url: "https://docs.flashcat.cloud/zh/flashduty/introduction"
---

:::tip

LDAP 集成登录，仅 `私有化版本` 支持

:::

## 快速了解
---

LDAP（Lightweight Directory Access Protocol，轻量级目录访问协议）是一种基于X.500标准的协议，用于访问和维护分布式目录服务。LDAP使得用户和应用程序能够查询、浏览和搜索存储在目录中的信息，如用户身份信息、网络资源等。LDAP通常运行在TCP/IP协议栈上，特别是使用TCP端口389（对于未加密的通信）和636（对于加密的通信，使用LDAPS）。

LDAP的核心特性包括：

树状结构：LDAP数据组织成树状结构，称为DIT（Directory Information Tree），便于进行层次化的搜索和浏览。

条目和属性：LDAP中的每个条目（Entry）包含多个属性（Attribute），属性有类型和值，例如“cn”代表通用名称（Common Name），“mail”代表电子邮件地址。

OpenLDAP 是一个开源的实现轻型目录访问协议（LDAP）的软件，由于其开源和灵活性，OpenLDAP 成为了许多企业和组织的首选 LDAP 实现。


:::tip

本文基于环境中已经支持 Docker 和 Docker Compose，如果环境不支持，请先自行安装。

:::


## Docker Compose 配置文件
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

password 替换成想要设置的密码

:::

## 服务启动
---
将上述配置文件保存为 docker-compose.yml， 在配置文件所在的目录，打开终端或命令提示符，运行以下命令来启动服务：
```
docker-compose up
```

如果你想在后台运行服务，可以添加 -d 标志：
```
docker-compose up -d
```

查看服务状态：
使用以下命令查看服务的状态：
```
docker-compose ps
```

停止服务：
当你想要停止服务时，可以使用以下命令：
```
docker-compose down
```

## 登录OpenLDAP
---
在浏览器中访问 http://ip:8088/ , 使用用户名 cn=admin,dc=flashduty,dc=com 和 密码 xxx 登录。

## OpenLDAP 配置
---
### 添加组和用户

![image.png](https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/ldap-add-group-user.png)


:::tip

在 `用户路径` (例如上图 ou=people 下的  cn=falsh duty) -> `Add new attribute` -> 选择 `Email` , 为用户添加 Email 属性，若已经存在请忽略。

:::

## Flashduty 集成
结合上述OpenLDAP配置，Flashduty集成信息如下图所示：
![image.png](https://fcpub-1301667576.cos.ap-nanjing.myqcloud.com/flashduty/kb/ldap-duty-config.png)


:::tip

上述字段的含义与描述请参考 [配置单点登录](https://docs.flashcat.cloud/zh/flashduty/single-sign-on)

:::

<p align="center">
 <img alt="logo" src="https://vue.youshengyun.com/files/img/qrCodeLogo.png">
</p>
<p align="center">基于SpringBoot+Vue前后端分离的代码生成器</p>
<p align="center">
 <a href='https://gitee.com/risesoft-y9/y9-core/stargazers'><img src='https://gitee.com/risesoft-y9/y9-core/badge/star.svg?theme=dark' alt='star'></img></a>
    <img src="https://img.shields.io/badge/version-v9.6.8-yellow.svg">
    <img src="https://img.shields.io/badge/Spring%20Boot-2.7-blue.svg">
    <img alt="logo" src="https://img.shields.io/badge/Vue-3.3-red.svg">
    <img alt="" src="https://img.shields.io/badge/JDK-11-green.svg">
    <a href="https://gitee.com/risesoft-y9/y9-core/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-GPL3-blue.svg"></a>
    <img src="https://img.shields.io/badge/total%20lines-810.2k-blue.svg">
</p>


## 简介

代码生成器是基于数字底座的配置模式延伸出来的开源工具，其中内含一套完整的基于vue3+element-plus的定制化组件，界面风格与数字底座保持统一。代码生成器的目标为帮助开发者和运维者快速生成一套跟数字底座相符的业务后台管理代码，同时利用相同的前端设计标准指导界面开发。代码生成器需要依赖开源的数字底座进行相关人员权限的管控。

[系统在线体验----->>>>>](#在线体验)

## 开源地址

源码地址：<https://github.com/risesoft-y9/Digital-Infrastructure>

源码目录

```
risenet-y9boot-webapp-code -- 代码生成器后端工程
vue -- 前端工程
 ├── y9vue-code-generator -- 代码生成器前端工程
```


## 产品特点

### 内置前端框架

内置一套以vue+element-plus为基础的适应国产场景的前端框架，提供各类说明、经典布局和组件代码。方便开发者直接拷贝负责、引用从而快速生成统一的界面。同时，支持基于此框架和风格的定制化组件。

### 支持模板套用

将常用且核心的系统、实体、字段等信息进行模板化管理，方便大量CRUD系统的快速添加和生成，减少配置人员的重复工作量。

### 代码生成标准

依赖数字底座和单点登录，遵循统一的格式和方法生成代码，可以更好地支持信创数据库、中间件的适配。

### 支持多租户

允许在创建实体时选择实现多租户功能，生成代码中即支持多租户。

### 支持单体生成

选择单个实体类，可独立生成相关代码。

### 预览与索引

支持对生成的代码提前预览，支持在创建表后添加聚合索引和唯一索引。

## 功能架构图

<div><img src="https://vue.youshengyun.com/files/img/code-generator-architecture.png"><div/>

## 部署架构图

<div><img src="https://vue.youshengyun.com/files/img/code-generator-deploy.png"><div/>

## 功能描述

| 序号 | 特点名称             | 特点描述                                                     |
| ---- | -------------------- | ------------------------------------------------------------ |
| 1    | 前端框架说明         | 针对框架功能、目录结构、初始化、单点登录、配置文件、渲染过程、路由配置、路由过程进行图解和文字说明 |
| 2    | 框架路由说明         | 针对静态路由、动态路由和异步路由进行详细说明                 |
| 3    | 经典布局             | 提供组织架构、应用系统、职位管理、登录日志等多个经典美观的布局展示 |
| 4    | 组件更新说明         | 每个版本中组件变化的说明                                     |
| 5    | 组件使用指南         | 针对组件的安装、依赖和国际化方式进行步骤指导                 |
| 6    | 通用组件             | 主要包含卡片、弹窗、表单、过滤器、分页、表格、列表、树、图片预览、上传下载等组件（含多种样式）进行展示和代码展示 |
| 7    | 系统、实体、字段管理 | 针对系统基本信息、实体表基本信息、字段信息和配置进行增删改查 |
| 8    | 索引管理             | 支持对已经建立完成的表提前进行索引生成                       |
| 9    | 代码生成、预览、下载 | 支持对代码进行生成、预览和下载的功能，支持整体下载，也支持单体下载。 |
| 10   | 模版套用             | 将已经建立的模板一键生成，方便用户在模板之上进行更多的内容增加 |
| 11   | 系统、实体、字段模板 | 针对系统、实体表和字段详细信息进行模板化记录和管理。         |

## 后端技术选型

| 序号 | 依赖            | 版本    | 官网                                                         |
| ---- | --------------- | ------- | ------------------------------------------------------------ |
| 1    | Spring Boot     | 2.7.10  | <a href="https://spring.io/projects/spring-boot" target="_blank">官网</a> |
| 2    | SpringDataJPA   | 2.7.10  | <a href="https://spring.io/projects/spring-data-jpa" target="_blank">官网</a> |
| 3    | SpringDataRedis | 2.7.10  | <a href="https://spring.io/projects/spring-data-redis" target="_blank">官网</a> |
| 4    | SpringKafka     | 2.8.11  | <a href="https://spring.io/projects/spring-kafka" target="_blank">官网</a> |
| 5    | nacos           | 2.2.1   | <a href="https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html" target="_blank">官网</a> |
| 6    | druid           | 1.2.16  | <a href="https://github.com/alibaba/druid/wiki/%E9%A6%96%E9%A1%B5" target="_blank">官网</a> |
| 7    | Jackson         | 2.13.5  | <a href="https://github.com/FasterXML/jackson-core" target="_blank">官网</a> |
| 8    | javers          | 6.13.0  | <a href="https://github.com/javers/javers" target="_blank">官网</a> |
| 9    | lombok          | 1.18.26 | <a href="https://projectlombok.org/" target="_blank">官网</a> |
| 10   | logback         | 1.2.11  | <a href="https://www.docs4dev.com/docs/zh/logback/1.3.0-alpha4/reference/introduction.html" target="_blank">官网</a> |
| 11   | freemarker      | 2.3.32  | [官网](https://freemarker.apache.org/)                       |

## 前端技术选型

| 序号 | 依赖         | 版本    | 官网                                                         |
| ---- | ------------ | ------- | ------------------------------------------------------------ |
| 1    | vue          | 3.3.2   | <a href="https://cn.vuejs.org/" target="_blank">官网</a>     |
| 2    | vite4        | 4.4.9   | <a href="https://vitejs.cn/" target="_blank">官网</a>        |
| 3    | vue-router   | 4.0.13  | <a href="https://router.vuejs.org/zh/" target="_blank">官网</a> |
| 4    | pinia        | 2.0.11  | <a href="https://pinia.vuejs.org/zh/" target="_blank">官网</a> |
| 5    | axios        | 0.24.0  | <a href="https://www.axios-http.cn/" target="_blank">官网</a> |
| 6    | typescript   | 4.5.4   | <a href="https://www.typescriptlang.org/" target="_blank">官网</a> |
| 7    | core-js      | 3.20.1  | <a href="https://www.npmjs.com/package/core-js" target="_blank">官网</a> |
| 8    | element-plus | 2.2.29  | <a href="https://element-plus.org/zh-CN/" target="_blank">官网</a> |
| 9    | sass         | 1.58.0  | <a href="https://www.sass.hk/" target="_blank">官网</a>      |
| 10   | animate.css  | 4.1.1   | <a href="https://animate.style/" target="_blank">官网</a>    |
| 11   | vxe-table    | 4.3.5   | <a href="https://vxetable.cn" target="_blank">官网</a>       |
| 12   | echarts      | 5.3.2   | <a href="https://echarts.apache.org/zh/" target="_blank">官网</a> |
| 13   | svgo         | 1.3.2   | <a href="https://github.com/svg/svgo" target="_blank">官网</a> |
| 14   | lodash       | 4.17.21 | <a href="https://lodash.com/" target="_blank">官网</a>       |

## 中间件选型

| 序号 | 工具             | 版本 | 官网                                                         |
| ---- | ---------------- | ---- | ------------------------------------------------------------ |
| 1    | JDK              | 11   | <a href="https://openjdk.org/" target="_blank">官网</a>      |
| 2    | Tomcat           | 9.0+ | <a href="https://tomcat.apache.org/" target="_blank">官网</a> |
| 3    | Kafka            | 2.6+ | <a href="https://kafka.apache.org/" target="_blank">官网</a> |
| 4    | filezilla server | 1.7+ | <a href="https://www.filezilla.cn/download/server" target="_blank">官网</a> |

## 数据库选型

| 序号 | 工具          | 版本       | 官网                                                         |
| ---- | ------------- | ---------- | ------------------------------------------------------------ |
| 1    | Mysql         | 5.7 / 8.0+ | <a href="https://www.mysql.com/cn/" target="_blank">官网</a> |
| 2    | Redis         | 6.2+       | <a href="https://redis.io/" target="_blank">官网</a>         |
| 3    | elasticsearch | 7.9+       | <a href="https://www.elastic.co/cn/elasticsearch/" target="_blank">官网</a> |

## 信创兼容适配

| **序号** | 类型     | 对象                       |
| :------- | -------- | -------------------------- |
| 1        | 浏览器   | 奇安信、火狐、谷歌、360等  |
| 2        | 插件     | 金山、永中、数科、福昕等   |
| 3        | 中间件   | 东方通、金蝶、宝兰德等     |
| 4        | 数据库   | 人大金仓、达梦、高斯等     |
| 5        | 操作系统 | 统信、麒麟、中科方德等     |
| 6        | 芯片     | ARM体系、MIPS体系、X86体系 |

## 在线体验

地址：<https://demo.youshengyun.com/y9vue-code/>

> 快速生成使用了数字底座相关组件的前后端工程
>
> 演示账号
>
> 系统管理员：systemManager@demo 密码：Risesoft@2024
>

## 文档专区

| 序号 | 名称                                                         |
| :--- | ------------------------------------------------------------ |
| 1    | <a href="https://vue.youshengyun.com/files/单点登录对接文档.pdf" target="_blank">单点登录对接文档</a> |
| 2    | <a href="https://vue.youshengyun.com/files/数字底座接口文档.pdf" target="_blank">数字底座接口文档</a> |
| 3    | <a href="https://vue.youshengyun.com/files/代码生成器安装部署.pdf" target="_blank">代码生成器安装部署文档</a> |
| 4    | <a href="https://vue.youshengyun.com/files/代码生成器操作使用.pdf" target="_blank">代码生成器操作使用文档</a> |
| 5    | <a href="https://vue.youshengyun.com/files/数字底座war包部署文档.pdf" target="_blank">数字底座war包部署文档</a> |
| 6    | <a href="https://vue.youshengyun.com/files/数字底座源码部署文档.pdf" target="_blank">数字底座源码部署文档</a> |
| 7    | <a href="https://vue.youshengyun.com/files/操作使用文档（技术白皮书）.pdf" target="_blank">操作使用文档（技术白皮书）</a> |
| 8    | <a href="https://vue.youshengyun.com/files/数字底座数据库设计文档.pdf" target="_blank">数字底座数据库设计文档</a> |
| 9    | <a href="https://vue.youshengyun.com/files/内部Java开发规范手册.pdf" target="_blank">内部Java开发规范手册</a> |
| 10   | <a href="https://vue.youshengyun.com/files/日志组件使用文档.pdf" target="_blank">日志组件使用文档</a> |
| 11   | <a href="https://vue.youshengyun.com/files/文件组件使用文档.pdf" target="_blank">文件组件使用文档</a> |
| 12   | <a href="https://vue.youshengyun.com/files/配置文件说明文档.pdf" target="_blank">配置文件说明文档</a> |
| 13   | <a href="https://vue.youshengyun.com/files/常用工具类使用示例文档.pdf" target="_blank">常用工具类使用示例文档</a> |
| 14   | <a href="https://vue.youshengyun.com/files/有生博大Vue开发手册v1.0.pdf" target="_blank">前端开发手册</a> |
| 15   | <a href="https://vue.youshengyun.com/files/开发规范.pdf" target="_blank">前端开发规范</a> |
| 16   | <a href="https://vue.youshengyun.com/files/代码格式化.pdf" target="_blank">前端代码格式化</a> |
| 17   | <a href="https://vue.youshengyun.com/files/系统组件.pdf" target="_blank">前端系统组件</a> |
| 18   | <a href="https://vue.youshengyun.com/files/通用方法.pdf" target="_blank">前端通用方法</a> |
| 19   | <a href="https://vue.youshengyun.com/files/国际化.pdf" target="_blank">前端国际化</a> |
| 20   | <a href="https://vue.youshengyun.com/files/Icon图标.pdf" target="_blank">前端Icon图标</a> |
| 21   | <a href="https://vue.youshengyun.com/files/Oracle数据库适配文档.pdf" target="_blank">Oracle数据库适配文档</a> |
| 22   | <a href="https://vue.youshengyun.com/files/Dameng数据库适配文档.pdf" target="_blank">Dameng数据库适配文档</a> |
| 23   | <a href="https://vue.youshengyun.com/files/PostgreSQL数据库适配文档.pdf" target="_blank">PostgreSQL数据库适配文档</a> |
| 24   | <a href="https://vue.youshengyun.com/files/Kingbase数据库适配文档.pdf" target="_blank">Kingbase数据库适配文档</a> |
| 25   | <a href="https://vue.youshengyun.com/files/Mariadb数据库适配文档.pdf" target="_blank">Mariadb数据库适配文档</a> |
| 26   | <a href="https://vue.youshengyun.com/files/OceanBase数据库适配文档.pdf" target="_blank">OceanBase数据库适配文档</a> |

## 代码生成器截图

### 界面截图

<table>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-1.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-2.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-3.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-4.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-5.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-6.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-7.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-8.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-9.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-10.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-11.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-12.png"></td>
    </tr>
    <tr>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-13.png"></td>
        <td><img src="https://vue.youshengyun.com/files/img/code-generator-14.png"></td>
    </tr>
</table>

## 依赖开源项目

| 序 号 | 项 目 名 称 | 项目介绍                                                     | 地 址                                                        |
| ----- | ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1     | 数字底座    | 数字底座是一款面向大型政府、企业数字化转型，基于身份认证、组织架构、岗位职务、应用系统、资源角色等功能构建的统一且安全的管理支撑平台。数字底座基于三员管理模式，具备微服务、多租户、容器化和国产化，支持用户利用代码生成器快速构建自己的业务应用，同时可关联诸多成熟且好用的内部生态应用 | <a href="https://github.com/risesoft-y9/Digital-Infrastructure" target="_blank">码云GitHub</a> |

## 赞助与支持

### 中关村软件和信息服务产业创新联盟

官网：<a href="https://www.zgcsa.net" target="_blank">https://www.zgcsa.net</a>

### 北京有生博大软件股份有限公司

官网：<a href="https://www.risesoft.net/" target="_blank">https://www.risesoft.net/</a>

### 统一标识代码注册管理中心

官网：<a href="https://www.idcode.org.cn/" target="_blank">https://www.idcode.org.cn/</a>

>数字底座已经全面接入统一标识码（MA码），具体使用说明请查看：<a href="https://gitee.com/risesoft-y9/y9-core/tree/main/y9-digitalbase-idcode" target="_blank">https://gitee.com/risesoft-y9/y9-core/tree/main/y9-digitalbase-idcode</a>

### 中国城市发展研究会

官网：<a href="https://www.china-cfh.com/" target="_blank">https://www.china-cfh.com/</a>

## 咨询与合作

联系人：曲经理

微信号：qq349416828

备注：开源咨询-姓名

<div><img style="width: 40%" src="https://vue.youshengyun.com/files/img/曲经理统一二维码咨询.png"><div/>
联系人：有生博大-咨询热线


座机号：010-86393151

<div><img style="width: 45%" src="https://vue.youshengyun.com/files/img/有生博大-咨询热线.png"><div/>

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Flashduty Documentation",
  description: "Flashduty Documentation Site",
  srcDir: "../flashduty",
  outDir: "../dist",
  base: "/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "中文", link: "/zh/" },
      { text: "English", link: "/en/" },
    ],
    sidebar: {
      "/zh/": [
        {
          text: "概览",
          items: [
            { text: "Flashduty简介", link: "/zh/0. 概览/1. flashduty简介.md" },
            { text: "快速开始", link: "/zh/0. 概览/2. 快速开始.md" },
          ],
        },
        {
          text: "On-call",
          items: [
            { text: "快速开始", link: "/zh/1. On-call/1. 快速开始" },
            { text: "故障管理", link: "/zh/1. On-call/2. 故障管理" },
            { text: "配置管理", link: "/zh/1. On-call/3. 配置管理" },
            { text: "高级功能", link: "/zh/1. On-call/4. 高级功能" },
            { text: "集成引导", link: "/zh/1. On-call/5. 集成引导" },
          ],
        },
        {
          text: "RUM",
          items: [
            {
              text: "快速开始",
              items: [
                {
                  text: "入门介绍",
                  link: "/zh/2. RUM/1. 快速开始/1. 入门介绍.md",
                },
                {
                  text: "快速开始",
                  link: "/zh/2. RUM/1. 快速开始/2. 快速开始.md",
                },
              ],
            },
            {
              text: "应用管理",
              items: [
                {
                  text: "应用管理",
                  link: "/zh/2. RUM/2. 应用管理/1. 应用管理.md",
                },
                {
                  text: "SDK接入",
                  link: "/zh/2. RUM/2. 应用管理/2. SDK接入.md",
                },
                {
                  text: "分析看板",
                  link: "/zh/2. RUM/2. 应用管理/3. 分析看板.md",
                },
              ],
            },
            {
              text: "性能监控",
              items: [
                { text: "概述", link: "/zh/2. RUM/3. 性能监控/1. 概述.md" },
                {
                  text: "指标上报",
                  link: "/zh/2. RUM/3. 性能监控/2. 指标上报.md",
                },
                {
                  text: "性能分析",
                  link: "/zh/2. RUM/3. 性能监控/3. 性能分析.md",
                },
                {
                  text: "诊断优化",
                  link: "/zh/2. RUM/3. 性能监控/4. 诊断优化.md",
                },
              ],
            },
            {
              text: "异常追踪",
              items: [
                { text: "概述", link: "/zh/2. RUM/4. 异常追踪/1. 概述.md" },
                {
                  text: "异常上报",
                  link: "/zh/2. RUM/4. 异常追踪/2. 异常上报.md",
                },
                {
                  text: "异常分析",
                  link: "/zh/2. RUM/4. 异常追踪/3. 异常分析.md",
                },
                {
                  text: "源码映射",
                  link: "/zh/2. RUM/4. 异常追踪/4. 源码映射.md",
                },
                {
                  text: "异常聚合",
                  link: "/zh/2. RUM/4. 异常追踪/5. 异常聚合.md",
                },
                {
                  text: "异常通知",
                  link: "/zh/2. RUM/4. 异常追踪/6. 异常通知.md",
                },
              ],
            },
            {
              text: "高级特性",
              items: [
                {
                  text: "自定义配置",
                  link: "/zh/2. RUM/5. 高级特性/1. 自定义配置.md",
                },
                {
                  text: "全链路追踪",
                  link: "/zh/2. RUM/5. 高级特性/2. 全链路追踪.md",
                },
                {
                  text: "用户行为追踪",
                  link: "/zh/2. RUM/5. 高级特性/3. 用户行为追踪.md",
                },
              ],
            },
            {
              text: "其他",
              items: [
                { text: "数据定义", link: "/zh/2. RUM/6. 其他/1. 数据定义.md" },
                { text: "数据收集", link: "/zh/2. RUM/6. 其他/2. 数据收集.md" },
                { text: "问题排查", link: "/zh/2. RUM/6. 其他/3. 问题排查.md" },
                { text: "数据安全", link: "/zh/2. RUM/6. 其他/4. 数据安全.md" },
              ],
            },
          ],
        },
        {
          text: "平台功能",
          items: [
            { text: "团队和成员", link: "/zh/3. 平台功能/5.1 团队和成员.md" },
            {
              text: "了解权限设计",
              link: "/zh/3. 平台功能/5.2 了解权限设计.md",
            },
            {
              text: "配置单点登录",
              link: "/zh/3. 平台功能/5.3 配置单点登录.md",
            },
            {
              text: "检索操作审计",
              link: "/zh/3. 平台功能/5.4 检索操作审计.md",
            },
            { text: "管理订阅", link: "/zh/3. 平台功能/5.5 管理订阅.md" },
            { text: "分析数据", link: "/zh/3. 平台功能/5.6  分析数据.md" },
          ],
        },
        {
          text: "安全合规",
          items: [
            { text: "服务条款", link: "/zh/4. 安全合规/9.1 服务条款.md" },
            { text: "用户协议", link: "/zh/4. 安全合规/9.2 用户协议.md" },
            { text: "服务SLA", link: "/zh/4. 安全合规/9.3 服务SLA.md" },
            { text: "数据安全", link: "/zh/4. 安全合规/9.4 数据安全.md" },
          ],
        },
      ],
      "/en/": [
        {
          text: "Overview",
          items: [
            {
              text: "Introduction",
              link: "/en/0. Overview/1. Introduction.md",
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/flashcatcloud" }],
  },
});

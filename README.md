# knowledge-base

## 编写原则
---

- **高效**：我们不想浪费任何人的时间
- **易读**：阅读此文档不需要拥有计算机学位
- **全面**：此文档应包含任何人使用产品所需的所有信息

## 编写规范
---

- **清晰的结构**：
    - 从二级标题开始(`##`)，紧跟分割线(`---`)，使用子标题和列表(`-` `*`)来组织内容，使用户能够更容易地找到想要的信息。
    - 使用 `**支持=>意见反馈**` 格式指定页面跳转。注意前后留空格。
    - 为英文前后增加空格。
    - 为加粗字体前后增加空格。
    - 高亮显示仅允许caution和tip

- **保持简洁和明确**：避免使用冗长的句子和复杂的词汇。尽量使用简单明了的语言，文档的目标应该是使所有用户都能理解，而不仅仅是专业人员。

- **使用实例和示例**：实例和示例可以让用户更易于理解你的产品或服务。尽可能提供详细的步骤介绍和代码示例。

- **图片和视频**：一图胜千言，使用适当的视觉内容可以大大提升文档的可读性和易用性。

    - 不要大篇幅使用图片，避免显得没有内容，或UI频繁调整导致文档更新跟不上。
    - 对于高度大于宽度的图片，居中展示，不要铺满整个屏幕。
    - 使用https://socialscreenshots.com/editor添加背景。
        - 分辨率：Full HD 16/9
        - 背景：Raycast 5
        - 边距：10 圆角：30
    - 使用aliyun oss upload image插件上传图片
    - 使用vitepress preview插件实时预览

- **更新和维护**：当产品有新的更新或改变时，产品文档应适时更新以保持准确性。

- **提供常见问题**：提供一个常见问题解答(常见问题)部分，解答用户可能会遇到的问题和困惑。

- **提供权限说明**：tip展示以下内容：
    
    - 对于需要权限控制的功能，说明拥有什么权限可以操作。
    - 对于订阅版本限制的功能，说明什么版本可以操作。

- **为文档提供YAML Front Matter**：为SEO优化提供元数据。格式如下：

```
---
title: "Flashduty Changelog 2023-12-18 | 值班管理、服务日历、自定义操作和邮件集成"
description: "支持更高级的值班管理功能，支付服务日历、自定义操作和邮件集成"
date: "2023-12-18T10:00:00+08:00"
---
```

- **文档地址定义**：
    
```
格式：https://docs.flashcat.cloud/[lang]/[product]/[md]
示例：https://docs.flashcat.cloud/zh/flashduty/getting-started
```

## Flashduty 内部文档

[使用手册](https://alidocs.dingtalk.com/i/nodes/14lgGw3P8vBzjpwpuoARLPA385daZ90D)

[文档截图规范](https://alidocs.dingtalk.com/i/nodes/EpGBa2Lm8aaNxlelu0jnoZGR8gN7R35y)

- 润色文档

在 cursor 中，首先选择优秀的模型，建议选择推理模型，例如 Gemini-2.5-pro。使用下面的prompt对中文文档进行润色：

```
请你严格依照 @polish_instructions.md 的要求，对文档 @your_doc_name 进行润色。
```

完成润色后，可在 VSCode / Cursor 中打开文档，然后在文档 tab 页中右击，点击 `格式化文档`。

- i18n

在 cursor 中，首先选择优秀的模型，建议选择推理模型，例如 Gemini-2.5-pro。使用下面的prompt对中文文档进行翻译：

```
请你严格依照 @polish_instructions.md 和 @i18n_instructions.md 的要求，将 @your_doc_name_ch.md 的内容翻译到 @your_doc_name_en.md 里。
```

完成润色后，可在 VSCode / Cursor 中打开文档，然后在文档 tab 页中右击，点击 `格式化文档`。**请校对针对关键操作的翻译是否和产品页面上的翻译保持一致。**
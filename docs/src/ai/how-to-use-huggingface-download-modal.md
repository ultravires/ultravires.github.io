---
title: Hugging Face 模型下载
description: 介绍通过 HuggingFace CLI 在本地下载模型文件的完整步骤，包含安装、登录与镜像加速配置。
author:
  name: 向成渝
  email: x555666777@qq.com
date: 2026-02-26
categories:
  - 人工智能
cover:
  text: 模型下载
banner:
  style: image
  wave: false
---

## 安装 HuggingFace CLI

```sh
brew install huggingface-cli
```

下载模型，如：

```sh
hf download tencent/HY-MT1.5-1.8B --local-dir ~/Downloads
```

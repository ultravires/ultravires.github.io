---
title: 使用 Proxifier 代理 Cursor 解决模型加载不全问题
date: 2026-07-09
categories:
  - 人工智能
tags:
  - Cursor
  - Proxifier
  - 代理
  - 网络
  - 开发工具
---

在国内网络环境下使用 Cursor 时，经常会遇到模型列表加载不全、部分模型无法访问的问题。本文介绍如何通过 Proxifier 强制代理 Cursor 的网络流量，让所有模型正常可用。

---

## 问题背景

Cursor 作为一款基于 VS Code 的 AI 编程编辑器，其模型列表、补全服务和对话功能都需要与海外服务器通信。由于网络环境的限制，经常出现以下现象：

- 模型下拉列表中只显示部分模型，某些模型始终不出现
- 切换模型时长时间无响应或报错
- 内联补全（Tab completion）时灵时不灵

根本原因在于 Cursor 的部分 API 端点在国内无法直接访问，而 Cursor 本身并未提供内置的代理设置选项。

## 为什么选择 Proxifier？

macOS 上常见的代理方案有以下几种：

| 方案                   | 优点                               | 缺点                                         |
| ---------------------- | ---------------------------------- | -------------------------------------------- |
| 系统代理（Wi-Fi 设置） | 简单，无需额外软件                 | 全局生效，影响内网访问；部分应用不走系统代理 |
| Clash/V2Ray Tun 模式   | 规则灵活，分流精细                 | 配置复杂，需要维护规则集                     |
| **Proxifier**          | **按应用粒度控制**，不影响其他程序 | 付费软件                                     |

Proxifier 的核心优势是**进程级别的代理控制**——你可以只让 Cursor 走代理，其他应用不受影响。这对于开发者来说非常实用：公司内网、本地服务、其他工具都保持直连，只有 Cursor 的流量经过代理。

## 配置步骤

### 1. 安装 Proxifier

从 [Proxifier 官网](https://www.proxifier.com/) 下载并安装。macOS 版本提供 31 天免费试用。

### 2. 配置代理服务器

打开 Proxifier，进入 **Proxies** 设置：

1. 点击 **Add** 添加新的代理服务器
2. 根据你的代理类型填写：
   - **Address**：代理服务器地址（如 `127.0.0.1`）
   - **Port**：代理端口（如 Clash 默认的 `7890`）
   - **Protocol**：根据你的代理选择 `SOCKS5` 或 `HTTPS`

### 3. 创建 Cursor 专属代理规则

这是关键步骤——让规则只对 Cursor 生效：

1. 进入 **Rules** 面板
2. 点击 **Add** 新建规则
3. 配置如下：
   - **Name**：`Cursor Proxy`
   - **Applications**：浏览并选择 Cursor 的可执行文件
     - macOS 路径：`/Applications/Cursor.app/Contents/MacOS/Cursor`
   - **Action**：选择上一步配置的代理服务器

### 4. DNS 配置（可选但推荐）

为了让域名解析也走代理，建议在 Proxifier 的 **DNS** 设置中：

1. 勾选 **Resolve hostnames through proxy**
2. 这样可以避免 DNS 污染导致的连接问题

### 5. 验证是否生效

配置完成后，重启 Cursor 并观察：

1. 打开 Cursor 的模型选择面板，应该能看到完整的模型列表
2. 检查 Proxifier 的 **Connections** 面板，能看到 Cursor 进程的网络连接
3. 尝试切换不同模型，确认都能正常加载

## 其他需要代理的相关进程

Cursor 在运行时会启动多个辅助进程，建议一并将以下路径加入规则：

```
"Cursor.app"; "Cursor"; com.todesktop.230313mzl4w4u92; "Cursor Helper (Plugin)"; "Cursor Helper";
```

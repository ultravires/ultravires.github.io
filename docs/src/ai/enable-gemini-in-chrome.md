---
title: 开启 Chrome Gemini AI Innovations 体验
date: 2026-07-10
updated: 2026-07-10
categories:
  - 人工智能
tags:
  - Chrome
  - Gemini
  - DevTools
  - AI
  - 代理
---

Google 将 Gemini 集成至 Chrome 浏览器并推出 AI Innovations 功能，但因地区检测机制，在中国大陆无法直接使用。本文记录在 macOS 上通过修改配置启用这一功能的完整流程，以及 Chrome 自动更新后配置被重置的解决方案。

---

## 背景

Google 自 Chrome 149 起深度集成了 Gemini，包括 DevTools 中的 AI assistant、侧边栏 Gemini 对话、以及 AI Innovations 设置面板。实际测试版本为 Chrome 150.0.7871.115。

由于地区检测机制，这些功能默认不对中国大陆用户开放。配置完成后，Chrome **自动更新版本时会重置地区字段**，需重新执行修改。

参考文章：[开启 Gemini in Chrome 中的 AI Innovations 体验](https://cherysunzhang.com/2026/01/enable-gemini-in-chrome-and-experience-ai-innovations/)

**前置条件**：网络环境可以访问 Gemini 服务（需配置 VPN 且出口 IP 位于支持地区）。本文测试环境为 macOS 26（Sequoia），VPN 出口位于 Los Angeles, US（IT7 Networks, ASN 25820）。

## 1. 修改 Local State 文件

退出 Chrome，找到 Local State 文件并修改其中三个关键字段：

| 操作系统 | 路径 |
|----------|------|
| macOS | `~/Library/Application Support/Google/Chrome/Local State` |
| Windows | `%LOCALAPPDATA%\Google\Chrome\User Data\Local State` |
| Linux | `~/.config/google-chrome/Local State` |

需要修改的字段：

| 字段 | 目标值 | 说明 |
|------|--------|------|
| `variations_country` | `"us"` | 将国家标识改为美国 |
| `variations_permanent_consistency_country` | `["<version>", "us"]` | 数组第二个元素改为 `"us"`，保留原版本号 |
| `is_glic_eligible` | `true` | 位于 `profile.info_cache.Default` 中，启用 Glic 资格 |

### 自动化脚本

在 macOS 上，可使用以下 `jq` 命令一键完成：

```bash
INPUT="$HOME/Library/Application Support/Google/Chrome/Local State"

jq '
  walk(
    if type == "object" and has("is_glic_eligible") then
      .is_glic_eligible = true
    else . end
  ) |
  if has("variations_country") then .variations_country = "us" else . end |
  if has("variations_permanent_consistency_country") then
    .variations_permanent_consistency_country = (
      .variations_permanent_consistency_country |
      if type == "array" and length >= 2 then [.[0], "us"] else . end
    )
  else . end
' "$INPUT" > "$INPUT.tmp" && mv "$INPUT.tmp" "$INPUT"
```

> **重要**：务必在 Chrome 完全退出后执行脚本。Chrome 退出时会写入当前内存中的状态，覆盖手动修改；Chrome 启动时也会重新检测地区并覆盖这些字段。因此需要使用下面的「只读锁定」技巧。

### 防止 Chrome 重置配置（只读锁定）

Chrome 启动时会检测实际地区并重置 `variations_country` 等字段。实测可行的方案：**先锁定文件 → 启动 Chrome → 再解锁**。

```bash
# 1. 退出 Chrome
osascript -e 'quit app "Google Chrome"'

# 2. 执行 jq 修改（同上）
INPUT="$HOME/Library/Application Support/Google/Chrome/Local State"
jq '...' "$INPUT" > "$INPUT.tmp" && mv "$INPUT.tmp" "$INPUT"

# 3. 锁定文件为只读
chmod 444 "$INPUT"

# 4. 启动 Chrome（此时无法写入，只能读取我们修改后的值）
open -a "Google Chrome"
sleep 5  # 等待 Chrome 完全启动

# 5. 恢复可写（Chrome 已经在内存中加载了正确的值）
chmod 644 "$INPUT"
```

经过实测，Chrome 从 149 升级到 150 后配置被重置，用上述流程重新修改并锁定后启动成功。之后即使恢复可写，AI Innovations 功能仍然可用。

## 2. 启用 Chrome 实验性标记

在地址栏访问 `chrome://flags`，将以下三项设为 **Enabled**：

| 标记 | 地址 | 说明 |
|------|------|------|
| **Glic** | `chrome://flags/#glic` | 启用 Glic 功能 |
| **Glic actor** | `chrome://flags/#glic-actor` | 启用 Glic actor |
| **Glic Pre-Warming** | `chrome://flags/#glic-pre-warming` | 预加载 Glic 面板 |

也可直接在 Local State 的 `browser.enabled_labs_experiments` 数组中添加：

```json
"glic@1",
"glic-actor@1",
"glic-pre-warming@1"
```

## 3. 更改 DevTools 语言

1. 按 **⌥ + ⌘ + I** 打开 Chrome DevTools
2. 点击右上角 **⚙️** 进入 Settings
3. 在 **Preferences** → **Language** 中选择 **"English (United States) – English (United States)"**
4. 关闭 DevTools 后重新打开
5. 再次进入 Settings，左侧将出现 **"AI Innovations"** 标签页

此时 DevTools 右上角会出现 Gemini 图标，点击即可使用 AI assistant。

## 4. 更改 Chrome 应用语言

macOS 上通过系统设置将 Chrome 的语言切换为 English：

**系统设置 → 通用 → 语言与地区 → 应用程序**，为 Google Chrome 单独添加 **"English – 英语"**。

或通过命令行：

```bash
defaults write com.google.Chrome AppleLanguages -array "en-US"
```

重新打开 Chrome 后，在设置左侧会出现 **"AI innovations"** 项目，窗口右上角出现 Gemini 侧边栏按钮。

## 常见问题

**Q: 重启 Chrome 后设置被重置，`variations_country` 变回 `"cn"`？**

这是最常见的问题。Chrome 每次启动时会重新检测网络地区并覆盖这两个字段。解决方案即上文「只读锁定」流程：

1. 退出 Chrome
2. 重新执行 `jq` 修改命令
3. `chmod 444` 锁定文件
4. 启动 Chrome，等 5 秒
5. `chmod 644` 恢复可写

实测：Chrome 从 149.0.7827.201 自动更新到 150.0.7871.115 后，`variations_country` 和 `variations_permanent_consistency_country` 均被重置为 `"cn"`，`is_glic_eligible` 和 Glic flags 则不受影响。用上述流程后恢复正常。

**Q: 显示 "Gemini in Chrome isn't available in your location"？**

检查两点：Chrome 应用语言是否已切换为 English；VPN IP 是否被 Google 识别为美国地区。可在 [Gemini 支持地区](https://support.google.com/gemini/answer/13575153) 中确认。

**Q: DevTools 中看不到 AI Innovations 标签页？**

确保 DevTools 语言已切换为 English (US)，且关闭 DevTools 后重新打开（无需重启 Chrome）。

## 效果展示

启用后，你将获得以下 AI 功能：

- **DevTools AI assistant**：在 DevTools 中与 Gemini 对话，辅助调试和开发
- **Gemini 侧边栏**：点击 Chrome 右上角 Gemini 按钮，在侧边栏中使用 AI
- **AI Innovations 设置**：在 Chrome 设置中管理各项 AI 功能

## 参考

- [Go behind the browser with Chrome's new AI features – Google](https://blog.google/products-and-platforms/products/chrome/new-ai-features-for-chrome/)
- [Chrome DevTools AI Assistance](https://developer.chrome.com/docs/devtools/ai-assistance?hl=zh-cn)
- [Gemini Web 应用支持的语言和国家/地区](https://support.google.com/gemini/answer/13575153)
- [开启 Gemini in Chrome 中的 AI Innovations 体验 - BREWED](https://cherysunzhang.com/2026/01/enable-gemini-in-chrome-and-experience-ai-innovations/)

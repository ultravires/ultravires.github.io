---
title: pastel — 命令行颜色处理神器
date: 2026-06-23
categories:
  - 程序人生
tags:
  - Terminal
  - CLI
  - Rust
  - Color
---


`pastel` 是一个用 Rust 编写的命令行颜色工具，由 [sharkdp](https://github.com/sharkdp)（也是 `fd`、`bat`、`hyperfine` 的作者）开发。它可以在终端中生成、分析、转换和操作颜色，支持多种颜色格式和色彩空间。

---

## 安装

pastel 在所有主流平台上都能轻松安装：

```sh
# macOS
brew install pastel

# Arch Linux
sudo pacman -S pastel

# Debian/Ubuntu
sudo apt install pastel

# Windows (Scoop)
scoop install pastel

# Windows (Winget)
winget install sharkdp.pastel

# 通过 Cargo 源码安装
cargo install pastel

# Nix
nix-env --install pastel
```

## 核心概念

pastel 的命令可以**通过管道组合**使用，这是它最强大的特性之一：

```sh
pastel random | pastel mix red | pastel lighten 0.2 | pastel format hex
```

颜色可以通过多种格式指定，以下所有方式都表示相同的颜色：

```sh
lightslategray
'#778899'
778899
789
'rgb(119, 136, 153)'
'119,136,153'
'hsl(210, 14.3%, 53.3%)'
```

也支持 Alpha 透明度：

```sh
'#77889980'
'rgba(119, 136, 153, 0.5)'
'hsla(210, 14.3%, 53.3%, 50%)'
```


## 颜色格式转换

将颜色转换为任意格式，支持的输出格式高达 30+ 种：

```sh
# 十六进制 → HSL
pastel format hsl ff8000

# 十六进制 → RGB
pastel format rgb 556270

# RGB → 颜色名称
pastel format name 44cc11

# 输出单个通道值
pastel format hsl-hue ff8000      # 仅输出色相
pastel format hsl-lightness ff8000 # 仅输出亮度
```

支持的输出格式：

| 类别 | 格式 |
|:-----|:-----|
| 常见格式 | `hex`, `rgb`, `rgb-float`, `hsl`, `hsv`, `cmyk` |
| 通道提取 | `rgb-r/g/b`, `hsl-hue/saturation/lightness`, `hsv-hue/saturation/value` |
| CIELAB | `lab`, `lab-a`, `lab-b`, `lch`, `lch-lightness/chroma/hue` |
| Oklab | `oklab`, `oklab-l/a/b`, `oklch`, `oklch-lightness/chroma/hue` |
| 其他 | `luminance`, `brightness`, `name` |
| ANSI | `ansi-8bit`, `ansi-24bit`, `ansi-8bit-escapecode`, `ansi-24bit-escapecode` |


## 颜色分析与展示

### 查看颜色信息

```sh
pastel color '#ff6347'
```

输出颜色的十六进制值、RGB、HSL 等信息，并在终端中直接**渲染颜色方块**。还支持批量展示：

```sh
pastel color 556270 4ecdc4 c7f484 ff6b6b c44d58
```

### 获取可读的文字颜色

给定一个背景色，自动返回黑色或白色作为最佳前景文字颜色：

```sh
bg="hotpink"
fg="$(pastel textcolor "$bg")"
pastel paint "$fg" --on "$bg" "well readable text"
```

### 列出所有具名颜色

```sh
pastel list
```

默认按色相排序，支持按亮度、色度、随机等方式排序：

```sh
pastel list --sort brightness
```

### 从屏幕取色

```sh
pastel pick
```

macOS 下会调用系统自带取色器，Linux 需要安装 `gpick`、`xcolor` 等工具。


## 颜色生成

### 随机颜色

```sh
pastel random            # 生成 10 个随机颜色
pastel random -n 5       # 生成 5 个
pastel random -s vivid   # 鲜艳策略（默认）
pastel random -s gray    # 随机灰度
pastel random -s lch_hue # 固定亮度/色度的随机色相
```

### 生成视觉上区分度高的颜色集合

```sh
pastel distinct 8
```

通过退火算法最大化颜色之间的感知差异，适合用于图表配色。对于 10-20 种颜色效果最佳：

```sh
pastel distinct 8 -m CIEDE2000  # 使用更精确的色差算法
```

### 生成渐变色

```sh
# 在两个颜色之间生成 10 个过渡色
pastel gradient '#ff0000' '#0000ff'

# 多个色标，生成 15 个过渡色
pastel gradient '#ff0000' '#ffff00' '#0000ff' -n 15

# 指定插值色彩空间
pastel gradient --colorspace HSL '#ffffcc' '#fd8d3c'
```


## 颜色操作

### 饱和度

```sh
pastel saturate 0.3 '#ff6347'   # 增加饱和度
pastel desaturate 0.3 '#ff6347' # 降低饱和度
```

### 亮度

```sh
pastel lighten 0.2 '#ff6347' # 提亮（负值即为变暗）
pastel darken 0.2 '#ff6347'  # 变暗
```

### 色相旋转

```sh
pastel rotate 90 '#ff6347'   # 色相旋转 90°
pastel complement '#ff6347'  # 互补色（旋转 180°）
```

### 混合颜色

```sh
# 在 Lab 色彩空间中等比例混合
pastel mix red blue

# 指定混合比例（0.3 表示混入 30% 的蓝色）
pastel mix -f 0.3 red blue

# 指定色彩空间
pastel mix --colorspace RGB red blue
```

### 设置颜色属性

将某个通道设置为指定值：

```sh
pastel set lightness 0.9 '#ff6347'  # 固定亮度
pastel set alpha 0.5 '#ff6347'      # 设置透明度
pastel set red 200 '#ff6347'        # 固定 R 通道
```

### 转灰度

```sh
pastel to-gray '#ff6347'   # 保留亮度的完全去色
pastel gray 0.5            # 从指定亮度创建灰色
```


## 色盲模拟

模拟不同类型色盲眼中的颜色：

```sh
pastel distinct 3 | pastel colorblind prot   # 红色盲 (protanopia)
pastel distinct 3 | pastel colorblind deuter # 绿色盲 (deuteranopia)
pastel distinct 3 | pastel colorblind trit   # 蓝色盲 (tritanopia)
```

这对于设计无障碍配色方案非常实用。


## 颜色排序

```sh
pastel random -n 20 | pastel sort-by hue     # 按色相排序
pastel random -n 20 | pastel sort-by luminance # 按亮度排序
pastel random -n 20 | pastel sort-by chroma    # 按色度排序
pastel random -n 20 | pastel sort-by random    # 随机打乱

pastel sort-by hue -r  # 逆序
pastel sort-by hue -u  # 去重
```


## 终端文字着色

`pastel paint` 可以直接在终端输出彩色文字，非常适合在 Shell 脚本中使用：

```sh
pastel paint -n black --on red --bold "   ERROR!   "
echo " 发生严重错误"

pastel paint -n black --on yellow --bold "  WARNING!  "
echo " 警告信息"

pastel paint -n black --on limegreen --bold "    INFO    "
echo -n " 提示信息，包含 "
echo -n "高亮" | pastel paint -n default --underline
echo " 文字"
```

`paint` 支持的样式：`--bold`、`--italic`、`--underline`。

### 检查终端色彩支持

```sh
pastel colorcheck
```

会检查你的终端模拟器是否支持 24-bit 真彩色。


## 实际场景

### 为脚本输出添加带颜色的日志

```sh
#!/bin/bash
log_error() {
  pastel paint -n black --on red --bold " ERROR "
  echo " $1"
}

log_warn() {
  pastel paint -n black --on yellow --bold " WARN  "
  echo " $1"
}

log_info() {
  pastel paint -n black --on limegreen --bold " INFO  "
  echo " $1"
}

log_error "数据库连接失败"
log_warn  "磁盘使用率达到 80%"
log_info  "服务启动成功"
```

### 生成图表配色方案

```sh
# 生成 6 种区分度高的颜色
pastel distinct 6 | pastel format hex
```

### 批量格式转换

```sh
# 将设计稿中的颜色转换为 HSL
echo "#556270
#4ecdc4
#c7f484
#ff6b6b
#c44d58" | pastel format hsl
```

### 生成主题色变体

```sh
# 基于主色，生成亮色和暗色变体
base="#4ecdc4"
echo "$base" | pastel lighten 0.2 | pastel format hex
echo "$base" | pastel darken 0.2 | pastel format hex
echo "$base" | pastel saturate 0.2 | pastel format hex
```

### 确保文字可读性

```sh
# 根据背景色自动选择黑色或白色文字
bg="$(pastel random | pastel format hex)"
fg="$(pastel textcolor "$bg")"
pastel paint "$fg" --on "$bg" " 可读文字示例 "
```


## 小结

`pastel` 是一个小巧而强大的颜色工具，它的优势在于：

- **管道友好**：所有命令都可以通过管道组合，灵活构建复杂工作流
- **格式丰富**：支持 30+ 种输入/输出格式和多种色彩空间
- **色彩空间**：支持 RGB、HSL、CIELAB、CIELCh、Oklab 等
- **实用功能**：取色、渐变色、高区分度配色、色盲模拟一应俱全
- **轻量快速**：Rust 编写，启动快、占用低

如果你经常需要处理颜色相关的任务——无论是写 CSS、做数据可视化、生成配色方案还是美化终端输出——`pastel` 都是值得加入工具箱的命令行利器。

---

**参考链接：**
- [pastel GitHub](https://github.com/sharkdp/pastel)
- [pastel crates.io](https://crates.io/crates/pastel)

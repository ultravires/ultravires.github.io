---
title: CSS Design Token 颜色命名规范
date: 2026-06-17
cover:
  text: Design Token
banner:
  wave: true
categories:
  - 前端领域
tags:
  - CSS
  - Design Token
---

以 HSB 色相与明度阈值划分色系和档位，建立 Raw / Alias / Semantic 三层颜色 Token 命名规范，兼顾标准梯度与同档近似色。

---

## 背景问题

在多品牌、多主题项目中落地颜色 Design Token 时，常见以下问题：

1. **边界色归属不明**：红橙过渡色缺乏客观划分标准，同一色值在不同命名体系中可能被归入不同色系；
2. **实物命名不可复用**：柿子色、焦糖色等物象名称与屏幕 RGB 色值无稳定映射，跨角色沟通成本高；
3. **标准色阶无法扩展**：设计稿常提供同色系、同明度、无插值关系且数值相近的多个颜色，既不能插入中间档位，也不能破坏既有梯度；
4. **Hex 无法直接定档**：相近色值（如 `#E65F20`、`#DD581C`）难以仅凭 Hex 判断色系与档位，人工归类易出错；
5. **词根体系膨胀**：`red-orange`、`light-orange`、`tomato` 等自定义命名持续增加，维护成本上升，主题切换时引用关系易断裂。

### 常见命名方案的问题

以下三种方式**不宜作为底层 Raw Token**，最多放在业务别名层做注释映射。

### 1. 实物命名

示例：`--color-persimmon`、`--color-caramel`、`--color-tomato`

问题在于：

- 实物本身不是纯色，高光、背光、成熟度都会变；
- 屏幕 RGB 和实物 CMYK 不在同一套色空间里；
- 物象名称主观性强，同一称谓无法对应唯一 Hex 值。

### 2. 主观形容词

示例：`--color-red-orange`、`--color-light-orange`、`--color-deep-red`

红橙过渡词缺乏数值边界，词根持续膨胀，命名体系无法收敛。

### 3. 插值插入数字

原有档位 `10/30/50/70/90`，为承接近似色插入 `45/55/65`。

这会破坏色板的数学梯度，均匀渐变逻辑失效，后续新增颜色也没有规则可循。

---

## 色系划分：基于 HSB 色相

边界色归属问题可通过 **HSB 色相角 H** 的固定阈值解决：以数值划分色系，写入项目规范，避免依赖肉眼判断。

> 设计工具里常叫 HSB，代码里 tinycolor2 等方法返回的是 HSV；两者在这里等价，**B（Brightness）= V（Value）**，下文统一称明度。

### 色相划分表

| H 角度      | 色系 | Token 前缀     |
| ----------- | ---- | -------------- |
| 350° ~ 10°  | 红   | `color-red`    |
| 10° ~ 40°   | 橙   | `color-orange` |
| 40° ~ 70°   | 黄   | `color-yellow` |
| 70° ~ 150°  | 绿   | `color-green`  |
| 150° ~ 210° | 青   | `color-cyan`   |
| 210° ~ 270° | 蓝   | `color-blue`   |
| 270° ~ 310° | 紫   | `color-violet` |
| 310° ~ 350° | 洋粉 | `color-pink`   |
| S < 10%     | 灰   | `color-gray`   |

色相落在 10°–40° 区间时，统一归入 `orange`，不创建 `red-orange` 混合词根。

### 明度取值

档位判定依赖 **明度 V**（0%–100%，数值越大颜色越亮），通过工具读取，不依赖目测。

**设计端（Figma / PS）**

- Figma：选中色块 → 色板切到 HSB → 读 B（Brightness）值
- PS / AI：拾色器勾选 HSB，查看 Brightness 百分比

**前端本地**

- 浏览器取色插件：直接展示 H / S / B
- 在线工具：SpyColor、Atool 等，输入 Hex 解析 HSB

**代码批量校验**

```js
import tinycolor from 'tinycolor2';

const { h, s, v } = tinycolor(hex).toHsv();
// v 即明度 0~100，对照档位阈值定级
```

**定级流程**

1. 获取目标色值的 Hex，读取明度百分比；
2. 对照阈值表，绑定基础数字档位；
3. 明度相近且无渐变关系时，在同档后追加 `a` / `b` 后缀。

---

## 档位判定

### 标准梯度（按钮、提示、文本、边框等公用色）

全局 5 档，各色系共用同一套明度映射：

| 档位  | 明度 V    | 用途         |
| ----- | --------- | ------------ |
| `-10` | ≥ 90%     | 极浅，接近白 |
| `-30` | 70% ~ 80% | 浅色         |
| `-50` | 45% ~ 55% | 基准主色     |
| `-70` | 25% ~ 35% | 深色         |
| `-90` | ≤ 15%     | 极深，接近黑 |

中性灰可按项目需要扩展刻度（如 `0/20/50/100`），不必和有色系的 5 档一一对应。

### 同档近似色：加字母后缀

**适用场景**：设计稿提供多个色相一致、明度接近、无数学渐变关系、且不能调整标准梯度的业务专属色。

**命名方式**：基准档位 + 小写后缀 `a` / `b` / `c`

约束：

1. 字母后缀只表示「同档区分」，不代表深浅顺序；
2. 禁止插入 `45`、`55` 等自定义数字档，禁止再加形容词词根；
3. `a` / `b` 后缀仅用于业务专属色，全局通用组件仍用 `10/30/50/70/90`。

示例：同色系、同档位、无插值关系的品牌色组

```css
/* 标准深色橙档 */
--color-orange-70: #e65f20;
/* 同档定制色 */
--color-orange-70-a: #dd581c;
--color-orange-70-b: #f06826;
```

---

## 三层 Token 架构

分层后，主题切换仅需修改 Raw 层色值，业务层引用保持不变；标准化命名与设计别名可并行存在。

| 层级         | 职责                 | 命名要求                                 |
| ------------ | -------------------- | ---------------------------------------- |
| **Raw**      | 原始色值，唯一数据源 | 词根 + 档位（+ `a/b` 后缀），无业务语义  |
| **Alias**    | 业务别名（可选）     | 映射 Raw，不重复写 Hex                   |
| **Semantic** | 组件直接使用         | 绑定功能：主按钮、警告、危险、标签、背景 |

---

## CSS 模板

```css
:root {
  /* ========== Raw：原始基础色 ========== */

  /* 红 H:350-10 */
  --color-red-10: #fff1f0;
  --color-red-50: #f53f3f;
  --color-red-90: #7c1717;
  --color-red-50-rgb: 245, 63, 63;

  /* 橙（含红橙过渡） H:10-40 */
  --color-orange-10: #fff3e8;
  --color-orange-30: #ffc996;
  --color-orange-50: #ff8c38;
  --color-orange-70: #e65f20;
  --color-orange-90: #8c2e08;
  --color-orange-70-a: #dd581c;
  --color-orange-70-b: #f06826;
  --color-orange-50-rgb: 255, 140, 56;
  --color-orange-70-rgb: 230, 95, 32;

  /* 中性灰 */
  --color-gray-0: #ffffff;
  --color-gray-20: #f5f7fa;
  --color-gray-50: #86909c;
  --color-gray-100: #0d1117;

  /* ========== Alias：业务别名 ========== */

  /* 设计别名：柿子橙 → 映射至 orange-70 */
  --color-persimmon: var(--color-orange-70);

  /* ========== Semantic：语义层 ========== */

  --color-danger: var(--color-red-50);
  --color-warning: var(--color-orange-50);
  --color-btn-brand: var(--color-orange-70-a);
  --color-tag-orange: var(--color-orange-70-b);
}

/* 透明色：用 rgb 后缀 + rgba，不单独建色值 */
.btn-opacity {
  background: rgba(var(--color-orange-70-rgb), 0.15);
}
```

---

## 判色工具

通过工具解析 H / S / V，自动匹配色系词根与档位，避免人工比对 Hex。

### 项目内置校验（tinycolor2）

可接入 ESLint 或构建脚本，命名不合规直接报错：

```ts
import tinycolor from 'tinycolor2';

/** 根据 Hex 返回合规色系词根 */
export function getColorHueRoot(hex: string) {
  const { h, s } = tinycolor(hex).toHsv();

  if (s < 10) return 'gray';
  if (h >= 350 || h < 10) return 'red';
  if (h >= 10 && h < 40) return 'orange';
  if (h >= 40 && h < 70) return 'yellow';
  if (h >= 70 && h < 150) return 'green';
  if (h >= 150 && h < 210) return 'cyan';
  if (h >= 210 && h < 270) return 'blue';
  if (h >= 270 && h < 310) return 'violet';
  return 'pink';
}
```

### 日常工具

- **Figma 插件** Color Shades：查看 H 角度，样式命名与前端对齐（如 `Orange/70`、`Orange/70-a`）
- **浏览器取色器**：直接读 HSB 数值

---

## 团队约定

1. Raw 层禁止实物命名、禁止 `red-orange` 混合词根、禁止主观形容词；
2. 10°–40° 过渡色一律归 `orange`；
3. 相近无梯度色只加 `a/b` 后缀，禁止插入自定义数字档；
4. 全局组件用标准档 `10/30/50/70/90`，业务运营组件才可用 `a/b`；
5. 透明色用 `-rgb` 后缀 + `rgba()`，不新建独立色值；蓝 / 紫区间不混用词根。

---

## 小结

1. 以 HSB 色相划系，红橙过渡归 `orange`，消除边界色归属歧义；
2. 标准梯度使用数字档，近似色使用同档 `a/b` 后缀；
3. Raw / Alias / Semantic 三层解耦，支持主题切换与多人维护；
4. 工具自动校验命名，降低人工归类错误率；
5. Raw 层禁用实物命名，设计别名统一收敛至 Alias 层。

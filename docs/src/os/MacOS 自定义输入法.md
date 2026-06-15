---
date: 2025-11-13
---

[在 Mac 上创建和使用你自己的输入法](https://support.apple.com/zh-cn/guide/mac-help/mchlp2866/15.0/mac/15.0)

新建 `mac_latin_letter_circle_solid_utf16le.inputplugin` 文件，已 `utf16` 编码格式编辑并保存。

```
# Latin Fun Circle Solid IME by Xenon Xiang
METHOD: TABLE
ENCODE: SC
PROMPT: Latin Fun Circle Solid
DELIMITER: ,
VERSION: 1.0
MAXINPUTCODE: 1
VALIDINPUTKEY: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ

BEGINCHARACTER
A 🅐
B 🅑
C 🅒
D 🅓
E 🅔
F 🅕
G 🅖
H 🅗
I 🅘
J 🅙
K 🅚
L 🅛
M 🅜
N 🅝
O 🅞
P 🅟
Q 🅠
R 🅡
S 🅢
T 🅣
U 🅤
V 🅥
W 🅦
X 🅧
Y 🅨
Z 🅩
1 ❶
2 ❷
3 ❸
4 ❹
5 ❺
6 ❻
7 ❼
8 ❽
9 ❾
0 ⓿
ENDCHARACTER
```

双击文件即可安装，安装的输入法会放到 `~/Library/Input Methods` 中。

::: info 注意

用户目录下的 `Library`

:::


---
title: 2FA
date: 2026-03-10
---

越来越多的应用需要 `2FA` 验证，但是一直找不到合适的 `2FA` 工具，直到我发现了 `oath-toolkit`，很符合我的极客风格。

---

## 安装

```bash
brew install oath-toolkit
```

## 使用

`oathtool --totp -b "<your_secret>"`

`secret` 的获取方式也很简单，用手机扫描二维码即可（先拍照，再识别二维码），或者使用 `zbar` 工具扫描二维码。

## 解码工具

- [zbar](https://github.com/mchehab/zbar)

```bash
brew install zbar
```

## 自定义

有了这些基础工具，你完全可以自己写一个简易程序来使用。

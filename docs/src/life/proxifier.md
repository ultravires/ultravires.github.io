---
title: Proxifier
date: 2026-03-09
categories:
  - 程序人生
---

有很多程序无法设置代理，使用 `Proxifier` 可以很好的解决这个问题。

---

## 激活码

https://gist.github.com/montasim/11e313f82dc6c2aea28298941158429f

## 代理 Antigravity

1. 设置 Proxies

![Proxies](https://files.seeusercontent.com/2026/03/10/9ctW/20260310174504074.png)

2. 设置语言服务器规则

![Rules-语言服务器](https://files.seeusercontent.com/2026/03/10/c9vR/20260310174653090.png)

```plaintext
language_server_macos_x64; language_server_macos_arm
```

3. 设置 Antigravity 本地规则

![Antigravity Local](https://files.seeusercontent.com/2026/03/10/Jp1y/20260310174958806.png)

**Applications**

```plaintext
"Antigravity.app"; "Antigravity"; com.google.antigravity; "Antigravity Helper.app"; "Antigravity Helper (GPU).app"; "Antigravity Helper (Renderer).app"; "Antigravity Helper (Plugin).app"; com.google.antigravity.helper
```

**Target Hosts**

```plaintext
localhost; 127.0.0.1; ::1; %ComputerName%;
```

这里的 `Applications` 配置可以直接通过添加按钮去添加应用，如果有必要，你或许需要打开监视器来找到相关进程名称。

这个配置是避免一些本地端口服务被代理，导致无法访问。

4. 设置 Antigravity 代理规则

![Antigravity Proxy](https://files.seeusercontent.com/2026/03/10/Sjh7/20260310175416774.png)

---
title: SSH 命令
date: 2025-12-09 15:13:50
---

前不久使用 ssh 命令登录服务器时，一直无法登录，后来才想起来该服务器需要先连接跳板机（堡垒机）。

---

通过一下配置可以简化登录过程。编辑 `~/.ssh/config`：

```sh
Host datagrand-jumper
  HostName jumper-huabei2-vpc.datagrand.com
  Port 58422
  IdentityFile ~/.ssh/id_rsa_datagrand
  User xiangchengyu
  ForwardAgent yes

Host 172.17.91.84
  HostName 172.17.91.84
  IdentityFile ~/.ssh/id_rsa_datagrand
  User product
  ProxyJump datagrand-jumper
  ForwardAgent yes
```

- HOST: 别名
- HostName: 真实服务器地址
- IdentityFile: 密钥文件
- User: 登录用户
- ProxyJump: 跳板机
- ForwardAgent: 允许代理

测试连接：

- 连接目标服务器：`ssh 172.17.91.84`（通过配置已经不需要先登录跳板机了）
- 连接跳板机：`ssh datagrand-jumper`

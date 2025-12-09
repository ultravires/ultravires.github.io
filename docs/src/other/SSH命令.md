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

---

拉取远程仓库时出现如下错误：

```
> git pull origin master
** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.

** The server may need to be upgraded. See https://openssh.com/pq.html
git@git.datagrand.com: Permission denied (publickey).
致命错误：无法读取远程仓库。
请确认您有正确的访问权限并且仓库存在。
```

```
> ssh -Tv -i ~/.ssh/id_rsa_datagrand git@git.datagrand.com
debug1: OpenSSH_10.2p1, OpenSSL 3.6.0 1 Oct 2025
debug1: Reading configuration data /Users/ultravires/.ssh/config
debug1: Reading configuration data /opt/homebrew/etc/ssh/ssh_config
debug1: Connecting to git.datagrand.com [172.16.200.126] port 22.
debug1: Connection established.
debug1: loaded pubkey from /Users/ultravires/.ssh/id_rsa_datagrand: RSA SHA256:vBDRucmajYgwQUGGp6asTSOiV7OaXTuAwZ0XvgZa6qY
debug1: identity file /Users/ultravires/.ssh/id_rsa_datagrand type 0
debug1: no identity pubkey loaded from /Users/ultravires/.ssh/id_rsa_datagrand
debug1: Local version string SSH-2.0-OpenSSH_10.2
debug1: Remote protocol version 2.0, remote software version OpenSSH_7.4
debug1: compat_banner: match: OpenSSH_7.4 pat OpenSSH_7.4* compat 0x04000006
debug1: Authenticating to git.datagrand.com:22 as 'git'
debug1: load_hostkeys: fopen /Users/ultravires/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /opt/homebrew/etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /opt/homebrew/etc/ssh/ssh_known_hosts2: No such file or directory
debug1: SSH2_MSG_KEXINIT sent
debug1: SSH2_MSG_KEXINIT received
debug1: kex: algorithm: curve25519-sha256
debug1: kex: host key algorithm: ssh-ed25519
debug1: kex: server->client cipher: aes128-ctr MAC: umac-64-etm@openssh.com compression: none
debug1: kex: client->server cipher: aes128-ctr MAC: umac-64-etm@openssh.com compression: none
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug1: SSH2_MSG_KEX_ECDH_REPLY received
debug1: Server host key: ssh-ed25519 SHA256:n88oZTg0MWf0e2f9LUoDq2O20tIfYr+TalLNm/QRraY
debug1: load_hostkeys: fopen /Users/ultravires/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /opt/homebrew/etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /opt/homebrew/etc/ssh/ssh_known_hosts2: No such file or directory
debug1: Host 'git.datagrand.com' is known and matches the ED25519 host key.
debug1: Found key in /Users/ultravires/.ssh/known_hosts:6
debug1: rekey out after 4294967296 blocks
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug1: SSH2_MSG_NEWKEYS received
debug1: rekey in after 4294967296 blocks
** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.
** The server may need to be upgraded. See https://openssh.com/pq.html
debug1: SSH2_MSG_EXT_INFO received
debug1: kex_ext_info_client_parse: server-sig-algs=<rsa-sha2-256,rsa-sha2-512>
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic,password
debug1: Next authentication method: publickey
debug1: get_agent_identities: bound agent to hostkey
debug1: get_agent_identities: ssh_fetch_identitylist: agent contains no identities
debug1: Will attempt key: /Users/ultravires/.ssh/id_rsa_datagrand RSA SHA256:vBDRucmajYgwQUGGp6asTSOiV7OaXTuAwZ0XvgZa6qY explicit
debug1: Offering public key: /Users/ultravires/.ssh/id_rsa_datagrand RSA SHA256:vBDRucmajYgwQUGGp6asTSOiV7OaXTuAwZ0XvgZa6qY explicit
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic,password
debug1: Next authentication method: password
git@git.datagrand.com's password:
```

解决方案：

`~/.ssh/config` 新增如下配置

```sh
Host git.datagrand.com
  HostName git.datagrand.com
  User git
  IdentityFile ~/.ssh/id_rsa_datagrand
  IdentitiesOnly yes
  PasswordAuthentication no
  # 兼容老版本OpenSSH的RSA签名算法
  PubkeyAcceptedAlgorithms +ssh-rsa
  HostkeyAlgorithms +ssh-rsa
  # 强制使用rsa-sha2-256签名（适配OpenSSH 7.4）
  PubkeyAcceptedKeyTypes +rsa-sha2-256
```

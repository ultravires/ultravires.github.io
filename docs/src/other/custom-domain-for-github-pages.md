---
title: Github Pages 自定义域名
date: 2026-01-29 00:00:00
---

之前一直用的是默认的 `ultravires.github.io` 作为博客的域名，现在换成 `ultravires.me` 作为博客的域名了。

---

## 1. 购买域名

我是在阿里云购买的域名 [ultravires.me](https://ultravires.me)。

## 2. 配置 DNS

在阿里云的[域名列表](https://dc.console.aliyun.com/#/domain-list/all)中进入你想要配置的域名，找到 "DNS 管理" -> "DNS 修改"，配置 `Cloudflare` 提供的 DNS 服务器。

## 3. 配置 Cloudflare

在 `Cloudflare` 中添加以下记录:

| 类型  | 主机记录 | 记录值               | TTL |
| ----- | -------- | -------------------- | --- |
| A     | @        | 185.199.108.153      | 600 |
| A     | @        | 185.199.109.153      | 600 |
| A     | @        | 185.199.110.153      | 600 |
| A     | @        | 185.199.111.153      | 600 |
| CNAME | www      | ultravires.github.io | 600 |

## 4. 配置 Github Pages

在你的 Github Pages 项目的设置中，找到 "Pages" -> "Custom domain"，填入你的域名。推荐使用子域名，例如 `blog.ultravires.me`，因为根域名只能使用 `A` 记录，而 `A` 记录只能指向 IP 地址,子域名可以使用 `CNAME` 记录，`CNAME` 记录可以指向任意域名，例如 `ultravires.github.io`，这样更稳定，可以避免 IP 地址变动带来的不便。保存后，在你的项目根目录会自动生成一个 CNAME 文件。等待 DNS 解析生效后，即可通过自定义域名访问。

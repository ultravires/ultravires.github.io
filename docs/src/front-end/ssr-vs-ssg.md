---
title: 什么是 SSR、SSG、CSR？
date: 2025-07-02
cover:
  text: 页面渲染
banner:
  wave: true
---

使用 `SSR` 和直接写 `HTML` 然后部署到服务器上有什么区别？

---

写 `HTML` 然后部署到服务器属于 `SSG` （静态站点生成）。

## 什么是 `SSR`？

`SSR(Server-Side Rendering)` 即“服务端渲染”。HTML 内容由服务端动态生成并返回给前端进行渲染。

## 什么是 `CSR`？

`CSR(Client-Side Rendering)` 即“客户端渲染”。HTML 内容由客户端（浏览器）通过 JavaScript 动态生成。

## 什么是 `SSG`？

`SSG(Static-Site Generation)` 即“静态站点生成”。HTML 内容在打包构建（或直接写好）时生成。
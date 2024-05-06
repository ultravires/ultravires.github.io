---
title: 使用 Clipboard API 复制图像
categories:
  - 前端
tags:
  - Clipboard API
abbrlink: 66dbca7e
date: 2024-04-30 16:56:04
---

最近在美化博客的右键菜单，其中有复制图像到剪贴板到需求。需求实现逻辑比较简单：

1. 判断触发右键菜单的目标元素是否为图像

```js
event.target instanceof HTMLImageElement
```

2. 通过 fetch API 请求图片资源，获取图像的二进制数据（blob: Binary Large Object）

```js
const blob = await fetch(event.target.src).then((blob) => {
  return res.blob();
}).catch((err) => {
  throw new Error(err);
});
```

{% note warning %}
无法通过 JavaScript 的方式获取有防盗链的图像。
{% endnote %}

3. 利用 Clipboard API 将二进制数据写入剪贴板

```js
const clipboardItem = new ClipboardItem({
  [`${blob.type}`]: blob
});
window.navigator.clipboard.write([clipboardItem]);
```

{% note warning %}
Clipboard API 目前仅支持写入 'image/png' 格式的图像。
{% endnote %}

在这里需要注意的是，Clipboard API 目前仅支持写入 'image/png' 格式的图像，如果你当前复制的图像为 png 格式，可能会符合预期。但是如果你复制的是 jpeg 格式的图像，则会得到下面的报错：

> DOMException: Failed to execute 'write' on 'Clipboard': Type image/jpeg not supported on write.

这个时候我们可以借助 `canvas` 对图像的数据格式进行转换。

```js
try {
  const clipboardItem = new ClipboardItem({
    [`${blob.type}`]: blob
  });
  // try/catch 无法直接捕获 Promise 异常，这里需要使用 async/await。
  await window.navigator.clipboard.write([clipboardItem]);
} catch(err) {
  // TODO 图像数据格式转换并写入剪贴板
}
```

{% note info %}
try/catch 无法捕获异步方法抛出的异常。因为 try/catch 块不会等待异步方法执行完毕，try/catch 块执行完之前，异步方法还没有抛出错误。
{% endnote %}

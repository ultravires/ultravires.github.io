---
title: 关于原子化 CSS
date: 2024-05-21 14:22:47
---

原子化 CSS 可能是最优秀的 CSS 架构设计。

---

我们为什么要给 HTML 标签添加 `class` 属性？

1. 用于 DOM 操作

```JavaScript
const dom = document.querySelector('.className');
```

2. 用于设置样式

```CSS
.className {
    color: red;
}
```

3. 语意化

用于样式时，出于目的性考虑，如果我们的类仅仅用来控制样式，那是极好的。原子化 CSS 的设计就是如此。

```HTML
<header class="header"></header>
```

看见 `class="header"` 我们并不能立马知道它的样式是什么，因为它在不同的项目中可能拥有不同的样式。

```HTML
<header class="px-4"></header>
```

熟悉命名规则后，我们能立马知道 `header` 标签的样式。

原子化 CSS 让我们形成思维惯性，让我们在任何项目中的任何位置看到 `px-4` 都知道它是干什么用的，原子化 CSS 使我们在样式和类上形成了思维统一。

---

那为什么我们不直接使用 `style` 属性呢？

1. `style` 的可覆盖性低，根据样式优先级可知，`style` 属性控制样式优先级仅次于 `!important`，我们很难采用其它方式将其覆盖。

2. `style` 的可复用性低，我们不能像 `class` 属性那样进行样式复用。


这里有一篇关于 Atomic CSS 更加全面的文章，十分推荐阅读：[atomic-css-and-tailwind-css](https://blog.huli.tw/2022/05/23/atomic-css-and-tailwind-css/)
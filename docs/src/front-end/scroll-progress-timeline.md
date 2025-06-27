---
title: 滚动驱动动画：获取页面滚动进度
date: 2025-03-20 14:26:26
cover:
  text: 滚动动画
banner:
  wave: true
categories:
  - 前端领域
tags:
  - CSS3
---

滚动驱动动画。

---

```css
/* 声明 timelines 级联层 */
@layer timelines {
  html {
    /*
      以下两个的缩写
      scroll-timeline-name: --scroll-progress-timeline;
      scroll-timeline-axis: y;
    */
    scroll-timeline: --scroll-progress-timeline y;
  }
}

/* 滚动驱动动画所绑定元素 */
.page-scroll-progress {
  position: fixed;
  height: 4px;
  top: 0;
  left: 0;
  /* 滚动驱动动画 */
  animation-name: page-scroll-progress;
  animation-duration: 1ms;
  /* 应用名为 --scroll-progress-timeline 的 scroll-timeline */
  animation-timeline: --scroll-progress-timeline;
}

@keyframes page-scroll-progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
```

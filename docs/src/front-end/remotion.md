---
title: Remotion：程序化视频创作框架
date: 2026-03-14
---

Remotion 是一个用 React 程序化创作视频的开源框架。它将视频制作纳入工程化流程，支持版本控制、批量生成与 CI/CD 流水线，是数据驱动与自动化视频创作的首选工具。

---

## Composition

渲染输出视频的最小单位。每个 Composition 必须定义 5 个核心属性：

- id：唯一标识（渲染时用来指定输出哪个视频）
- component：要渲染的 React 组件（视频内容）
- durationInFrames：视频总时长（单位：帧）
- width / height：视频分辨率
- fps：帧率（通常 30 / 60）

```typescript
<Composition
    id="ThreeDemo"
    component={ThreeDemo}
    durationInFrames={180}
    fps={30}
    width={1920}
    height={1080}
/>
```

### 什么时候用？

需要生成不同的独立视频文件时。如：

- 不同分辨率的视频
- 不同帧率/时长的视频
- 需要单独渲染的片段，即需要独立导出单个文件的视频
- 批量生成不同版本的视频，如：模板雷同，但文案不同，数据不同

## 每次都安装 chrome headless 太慢？

使用如下命令下载特定版本 chrome 到缓存文件夹：

`npx @puppeteer/browsers install chrome@144.0.7559.20 --path ~/Library/Caches/remotion/chrome`

配置 `Config.setBrowserExecutable` 为下载路径。

---
title: AI 赋能生活：AI 制作旅游攻略
date: 2026-06-12
categories:
  - 人工智能
tags:
  - MCP
  - AI
  - 高德地图
  - 旅游
  - Cursor
  - Claude Code
---

周末想去南京玩两天，但做攻略这件事——查天气、搜景点、规划路线、算时间——实在太费神了。正好最近在折腾 MCP（Model Context Protocol），想到高德地图提供了 MCP Server，不如让 AI 帮我搞定这一切。

---

## 什么是高德 MCP Server？

[MCP（Model Context Protocol）](https://modelcontextprotocol.io/) 是 Anthropic 提出的一种开放协议，让 AI 助手能够安全、标准化地调用外部工具和数据源。简单来说，MCP 就是 AI 的"万能插头"——接上什么就能用什么。

[高德 MCP Server](https://lbs.amap.com/api/mcp-server/summary) 则是高德地图基于 MCP 协议封装的工具集，让 AI 能够直接调用高德地图的各项能力：

| 工具                                | 功能                | 旅行攻略场景                    |
| ----------------------------------- | ------------------- | ------------------------------- |
| `maps_weather`                      | 查询城市天气        | 看出行那几天会不会下雨          |
| `maps_geo`                          | 地址转经纬度        | 把"南京博物院"变成地图上的坐标  |
| `maps_text_search`                  | POI 关键字搜索      | 搜索"南京必去景点"、"附近美食"  |
| `maps_search_detail`                | POI 详情查询        | 查景点评分、营业时间、门票信息  |
| `maps_direction_transit_integrated` | 公交/地铁路线规划   | 地铁几号线、坐几站、多久到      |
| `maps_direction_walking`            | 步行路线规划        | 从地铁站出来走多久到景区        |
| `maps_direction_driving`            | 驾车路线规划        | 自驾游路线规划                  |
| `maps_direction_bicycling`          | 骑行路线规划        | 共享单车骑行路线                |
| `maps_distance`                     | 两点间距离计算      | 两个景点之间有多远              |
| `maps_around_search`                | 周边搜索            | 景区附近有什么吃的              |
| `maps_regeocode`                    | 逆地理编码          | 坐标转地址                      |
| `maps_ip_location`                  | IP 定位             | 获取当前城市                    |
| `maps_schema_navi`                  | 生成导航 Schema     | 一键跳转高德 App 导航           |
| `maps_schema_personal_map`          | 生成个人地图 Schema | 生成行程合集，在高德 App 中打开 |

有了这些工具，AI 就不再是只会聊天的"嘴炮选手"，而是能查实时数据、规划路线的"行动派"。

## 在 Cursor 中配置

Cursor 的 MCP 配置文件位于 `~/.cursor/mcp.json`，添加一个 HTTP 类型的 MCP Server 即可：

```json
{
  "mcpServers": {
    "amap-maps-streamableHTTP": {
      "url": "https://mcp.amap.com/mcp?key=你的高德Key"
    }
  }
}
```

> **Key 的获取方式**：登录 [高德开放平台控制台](https://console.amap.com/)，创建应用 → 添加 Key → 选择"Web 服务"类型即可。

配置完成后重启 Cursor，在 AI 对话中就能直接使用高德地图的工具了。

## 在 Claude Code 中配置

Claude Code 的 MCP 配置在 `~/.claude.json` 中，格式与 Cursor 类似：

```json
{
  "mcpServers": {
    "amap-maps": {
      "type": "http",
      "url": "https://mcp.amap.com/mcp?key=你的高德Key"
    }
  }
}
```

配置完成后，在 Claude Code 会话中会自动加载高德 MCP 工具。后续使用时，建议在 `settings.local.json` 中添加权限白名单，避免每次调用都要手动确认：

```json
{
  "permissions": {
    "allow": [
      "mcp__amap-maps__maps_weather",
      "mcp__amap-maps__maps_geo",
      "mcp__amap-maps__maps_direction_transit_integrated",
      "mcp__amap-maps__maps_direction_walking",
      "mcp__amap-maps__maps_text_search"
    ]
  }
}
```

## 效果呈现：南京两日游攻略

配置好 MCP 之后，只需要对 AI 说一句：

> "帮我做一份南京两日游攻略，情侣出行，Day 1 钟山风景区深度游，Day 2 城市打卡 + 老门东，高铁往返，住宿新街口"

AI 就会自动：

1. **查天气** — 调用 `maps_weather` 获取 6/13-6/14 南京天气（多云 34°C / 小雨 31°C），提醒你带伞防暑
2. **搜景点** — 调用 `maps_text_search` 搜索钟山风景区、南京博物院、玄武湖、老门东等核心景点
3. **地理编码** — 调用 `maps_geo` 将所有景点转化为精确坐标
4. **规划路线** — 调用 `maps_direction_transit_integrated` 规划地铁换乘方案，调用 `maps_direction_walking` 计算步行时间
5. **生成攻略** — 将所有信息整合成一份完整的 HTML 旅行攻略

下面是最终生成的完整攻略页面，可直接交互查看：

::: raw

<iframe
  src="/nanjing-travel-guide.html"
  style="width: 100%; height: 800px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
  loading="lazy"
  title="南京两日游攻略"
></iframe>
:::

## 总结

这次体验让我对 MCP 的价值有了更直观的感受：

1. **实时数据** — 不是 AI 瞎编的"幻觉数据"，而是通过 API 实时查询的真实天气、真实路线、真实耗时
2. **结构化输出** — 坐标、时间、距离都是精确数值，可以直接用于地图绘制和路线规划
3. **一次配置，持续受益** — MCP Server 配置一次后，所有 AI 对话都能使用，不只是做旅游攻略，日常查天气、查路线、搜周边都能用
4. **降低门槛** — 不需要自己写代码调用高德 API，用自然语言描述需求，AI 自动完成工具调用和数据整合

AI 的时代，人的价值不再是"会做"，而是"知道可以这样做"。希望这篇文章能给你一些启发 🚀

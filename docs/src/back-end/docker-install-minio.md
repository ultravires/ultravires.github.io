---
title: Docker 安装 minio
description: 记录使用 Docker 部署 MinIO 对象存储的完整流程，涵盖镜像拉取、容器创建、端口映射与访问验证。
date: 2025-08-29
cover:
  text: 安装 MinIO
categories:
  - Docker
  - 后端领域
banner:
  style: image
  wave: false
---


## 拉取并创建

先在本地创建一个目录，用于存放数据：

```bash
mkdir -p $HOME/minio/data
```

拉取镜像并运行容器（推荐minio/minio后追加具体tag）：

```bash
docker run -d -p 9000:9000 -p 9001:9001 minio/minio -v /Users/ultravires/minio/data:/data server /data --console-address ":9001"
```

## 访问

访问地址：[http://localhost:9001](http://localhost:9001)
账号密码：minioadmin:minioadmin

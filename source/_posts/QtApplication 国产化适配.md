---
title: QtApplication 国产化适配
categories:
  - QT
tags:
  - 国产化适配
abbrlink: 5cc5ed96
cover: https://th.bing.com/th/id/R.0e8c7cf27902e84bda26151456a0367e?rik=XhNGeHds%2bumtcg&riu=http%3a%2f%2fwww.infedium.com%2fpublic%2fuploads%2fimages%2f20210726%2f27f7102a5a2317a97b38913f0179e1b7.jpg&ehk=R9qGOg7cqQmzfgZGu%2buwCi3DYNUAhULbzAYQoBX33vI%3d&risl=&pid=ImgRaw&r=0
date: 2024-05-16 12:34:10
---

## 安装 QT Creator

官方下载地址：[https://download.qt.io/archive/qt/](https://download.qt.io/archive/qt/)

## 代码兼容

添加平台兼容代码：

```c++
#ifdef Q_OS_LINUX
#endif
```

## 编译源码

对修改后的兼容性代码进行编译。

## 程序打包

将编译好的文件复制到打包目录进行打包。

```bash
dekg -b ./path
```

## 测试运行

测试程序是否正常启动。

## 功能检测

对即时通讯客户端的功能进行检测。

## 输入法修复

为继承 QWidget 类的类添加：

```c++
this->setAttribute(Qt::WA_InputMethodEnabled, true);
this->setAttribute(Qt::WA_KeyCompression, true);
this->setFocusPolicy(Qt::WheelFocus);
```

安装 `extra-cmake-modules`, `libxkbcommon-dev`。

克隆 `fcitx-qt5` 到本地:

```bash
git clone https://github.com/fcitx/fcitx-qt5.git
```

Qt Creator 打开 fcitx-qt5 项目，Build 编译。

将编译生成的 `libfcitxplatforminputcontextplugin.so` 文件复制相应的目录下即可。

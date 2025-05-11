---
title: Whisper 音视频文字识别
date: 2025/05/11
cover:
  text: 语音识别
---

领导总是会在里面分享一些培训视频，若只是看了不回复不总结，恐怕会让领导以为没人关注。于是我在想能不能让程序帮我总结一下视频内容呢？

---

[Whisper](https://github.com/openai/whisper) 是一种通用语音识别模型。它能够帮我们将音视频中的语音识别为文字。

## 安装 Whisper

我使用的是 `WSL2` 安装环境。

安装 `Whisper` 需要先安装 `python3`，我这里使用的版本是 `pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)`。

通过以下命令我们可以安装最新发布的 whisper：

```sh
pip install -U openai-whisper
```

或者使用以下命令从仓库中拉取并安装最新的提交，以及它的 `Python` 依赖项：

```sh
pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git
```

它还要求在您的系统上安装命令行工具 `ffmpeg`, 这可以从大多数包管理器中获得：

```sh
# on Ubuntu or Debian
sudo apt update && sudo apt install ffmpeg

# on Arch Linux
sudo pacman -S ffmpeg

# on MacOS using Homebrew (https://brew.sh/)
brew install ffmpeg

# on Windows using Chocolatey (https://chocolatey.org/)
choco install ffmpeg

# on Windows using Scoop (https://scoop.sh/)
scoop install ffmpeg
```

如果你在安装 `whisper` 过程中遇到 [tiktoken](https://github.com/openai/tiktoken) 相关错误，你可能还需要安装 [rust](https://www.rust-lang.org/zh-CN/)。

## 使用

顺利安装完成 `whisper` 后就可以正常使用了，下面是简单使用示例：

```sh
whisper 培训视频.mp4 --language Chinese
```

完整的使用方法还得去 github 查看详细使用文档。


## AI 总结

下面我们就可以让大语言模型帮我们生成总结，非常的 nice。
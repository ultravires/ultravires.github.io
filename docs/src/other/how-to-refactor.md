---
title: 如何重构？
date: 2026-01-30 14:30:00
---

项目遇到问题了，不得不重构。

---

## 目录重构

使用 `git mv` 命令，不要直接使用 `mv` 或拖拽。

## 删除远程分支

```plaintext
git push <remote> --delete <branch>
```

## 删除本地分支

```plaintext
git branch -d <branch>
```

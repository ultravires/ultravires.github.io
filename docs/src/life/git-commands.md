---
title: 常用 Git 命令
date: 2026-06-15
categories:
  - 程序人生
cover:
  text: Git 命令
banner:
  wave: true
---

Git 是日常开发中最常用的版本控制工具。本文整理了高频 Git 命令的使用方式，覆盖从基础到进阶的常见场景。

---

## 基础配置

安装 Git 后先配置用户名和邮箱，这些信息会出现在每次提交记录中：

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

查看当前配置：

```bash
git config --list
```

---

## 仓库操作

### 初始化仓库

```bash
git init
```

在当前目录创建一个 `.git` 隐藏目录，开始版本管理。

### 克隆仓库

```bash
git clone <repo-url>
git clone <repo-url> <directory>   # 指定目录名
git clone -b <branch> <repo-url>   # 克隆指定分支
```

### 关联远程仓库

```bash
git remote add origin <repo-url>
git remote -v                        # 查看已关联的远程仓库
git remote remove origin             # 移除远程仓库关联
```

---

## 暂存与提交

### 查看状态

```bash
git status        # 简洁模式：git status -s
```

### 暂存文件

```bash
git add <file>           # 暂存单个文件
git add .                # 暂存当前目录所有变更
git add -A               # 暂存整个工作区所有变更
git add -p               # 交互式选择要暂存的代码块
```

### 提交

```bash
git commit -m "feat: 新增用户登录功能"
git commit -a -m "fix: 修复样式错乱"   # 跳过 add，直接提交已跟踪文件的变更
git commit --amend                       # 追加到上一次提交（不新增 commit）
```

::: tip 提交信息规范
推荐使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/) 格式：`<type>: <description>`。常见 type：`feat`、`fix`、`refactor`、`docs`、`style`、`test`、`chore`。
:::

### 查看差异

```bash
git diff                # 工作区 vs 暂存区
git diff --staged       # 暂存区 vs 最新提交
git diff <commit-id>    # 工作区 vs 指定提交
git diff HEAD~1         # 工作区 vs 上一次提交
```

---

## 分支管理

### 查看分支

```bash
git branch          # 本地分支列表
git branch -r       # 远程分支列表
git branch -a       # 所有分支（本地 + 远程）
git branch -v       # 查看每个分支最后一次提交
```

### 创建与切换

```bash
git branch <branch-name>              # 创建分支
git checkout <branch-name>            # 切换分支
git checkout -b <branch-name>         # 创建并切换（一步到位）
git switch <branch-name>              # 新版切换命令（Git 2.23+）
git switch -c <branch-name>           # 新版创建并切换
```

### 合并分支

```bash
git merge <branch-name>               # 将目标分支合并到当前分支
git merge --no-ff <branch-name>       # 禁止快进合并，保留分支历史
git merge --squash <branch-name>      # 压缩合并，将所有提交压成一个
```

合并冲突时，手动编辑冲突文件，标记为已解决后继续：

```bash
git add <resolved-file>
git merge --continue
# 或者放弃合并
git merge --abort
```

### 变基

```bash
git rebase <target-branch>                    # 将当前分支变基到目标分支
git rebase -i HEAD~3                          # 交互式变基，整理最近 3 次提交
git rebase --continue | --skip | --abort      # 继续 / 跳过 / 放弃变基
```

::: warning 注意
不要对已推送到远程的公共分支执行 `rebase`，会导致协作混乱。
:::

### 删除分支

```bash
git branch -d <branch-name>       # 删除已合并的本地分支
git branch -D <branch-name>       # 强制删除本地分支（即使未合并）
git push origin -d <branch-name>  # 删除远程分支（推荐）
git push origin --delete <branch-name>  # 同上，等价写法
```

### Cherry-pick

将某个提交应用到当前分支：

```bash
git cherry-pick <commit-id>
git cherry-pick <commit-id-A>..<commit-id-B>   # 批量 cherry-pick（不包含 A）
git cherry-pick <commit-id-A>^..<commit-id-B>  # 批量 cherry-pick（包含 A）
```

---

## 远程协作

### 推送

```bash
git push origin <branch-name>           # 推送到远程
git push -u origin <branch-name>        # 首次推送并设置上游跟踪
git push origin --all                   # 推送所有分支
git push origin --tags                  # 推送所有标签
```

### 拉取

```bash
git pull origin <branch-name>           # 拉取并合并（fetch + merge）
git pull --rebase origin <branch-name>  # 拉取并变基（推荐，保持提交历史整洁）
git fetch origin                        # 只拉取，不合并
git fetch --prune                       # 拉取并清理本地已不存在的远程分支引用
```

### `pull` vs `fetch`

| 命令    | 行为                           |
| ------- | ------------------------------ |
| `fetch` | 仅下载远程更新，不修改工作区   |
| `pull`  | 下载远程更新并自动合并到当前分支 |

建议养成先 `fetch` 查看差异，再决定 `merge` 或 `rebase` 的习惯。

---

## 撤销与回退

### 撤销工作区变更

```bash
git restore <file>                # 丢弃工作区中某个文件的修改
git restore .                     # 丢弃工作区所有修改
git checkout -- <file>            # 旧版写法，效果相同
```

### 取消暂存

```bash
git restore --staged <file>       # 将文件从暂存区移回工作区
git reset HEAD <file>             # 旧版写法
```

### 回退提交

```bash
git reset --soft HEAD~1           # 回退到上一次提交，变更保留在暂存区
git reset --mixed HEAD~1          # 回退到上一次提交，变更回到工作区（默认）
git reset --hard HEAD~1           # 回退到上一次提交，丢弃所有变更
```

### 安全回退（推荐）

```bash
git revert <commit-id>            # 新建一个反向提交来撤销，不影响历史
git revert HEAD                   # 撤销最近一次提交
```

| 命令      | 适用场景                     |
| --------- | ---------------------------- |
| `reset`   | 本地私有分支，想重写历史     |
| `revert`  | 公共分支，安全地撤销某次提交 |

### 储藏

临时保存当前工作进度，让工作区恢复干净：

```bash
git stash                         # 储藏当前变更
git stash save "描述信息"          # 带描述的储藏
git stash list                    # 查看储藏列表
git stash pop                     # 恢复最近一次储藏，并删除记录
git stash apply stash@{0}         # 恢复指定储藏，保留记录
git stash drop stash@{0}          # 删除指定储藏
git stash clear                   # 清空所有储藏
```

---

## 历史查看

### 提交日志

```bash
git log                           # 完整日志
git log --oneline                 # 一行一条，简洁模式
git log --graph --oneline --all   # 图形化展示所有分支历史
git log -p <file>                 # 查看某个文件的提交历史及差异
git log --author="username"       # 按作者筛选
git log --since="2026-01-01"      # 按时间筛选
```

### 追溯每一行代码

```bash
git blame <file>                  # 查看文件的每一行是谁在什么时候改的
git blame -L 10,30 <file>         # 只看指定行范围
```

### 查看某次提交的详情

```bash
git show <commit-id>              # 查看提交的完整信息与差异
git show --stat <commit-id>       # 只看变更统计
```

---

## 标签

常用于标记版本发布节点：

```bash
git tag v1.0.0                          # 创建轻量标签
git tag -a v1.0.0 -m "release v1.0.0"   # 创建附注标签（推荐）
git tag                                 # 查看所有标签
git tag -l "v1.*"                       # 筛选标签
git push origin v1.0.0                  # 推送指定标签
git push origin --tags                  # 推送所有标签
git tag -d v1.0.0                       # 删除本地标签
git push origin -d v1.0.0               # 删除远程标签
```

---

## 文件操作

### 移动/重命名

```bash
git mv <old-path> <new-path>
```

使用 `git mv` 而非直接 `mv`，Git 会自动识别为重命名，保留文件历史。这在重构目录结构时尤其有用。

### 删除文件

```bash
git rm <file>                     # 删除文件并暂存
git rm --cached <file>            # 仅从 Git 跟踪中移除，保留本地文件
```

---

## 实用技巧

### 查看某次提交改了哪些文件

```bash
git diff-tree --no-commit-id --name-only -r <commit-id>
```

### 统计代码提交量

```bash
git shortlog -sn           # 按作者统计提交次数
git shortlog -sn --since="2026-01-01" --before="2026-06-01"
```

### 全局 `.gitignore`

```bash
git config --global core.excludesfile ~/.gitignore_global
```

然后在 `~/.gitignore_global` 中写入全局忽略规则（如 `.DS_Store`、`node_modules` 等）。

### 找回丢失的提交

```bash
git reflog                # 查看 HEAD 的移动历史
git checkout <commit-id>  # 恢复到指定的 commit
```

只要 commit 过，即使 `reset --hard` 了也能通过 `reflog` 找回。

### 清理无效的远程分支引用

```bash
git remote prune origin
```

### 压缩提交后再推送

```bash
git rebase -i HEAD~5      # 将最近 5 次提交 pick → squash
git push -f origin main   # 谨慎使用 -f
```

---

## 常用命令速查

| 场景           | 命令                                                  |
| -------------- | ----------------------------------------------------- |
| 初始化仓库     | `git init`                                            |
| 克隆仓库       | `git clone <url>`                                     |
| 暂存变更       | `git add .`                                           |
| 提交变更       | `git commit -m "msg"`                                 |
| 创建并切换分支 | `git switch -c <name>`                                |
| 查看状态       | `git status`                                          |
| 查看历史       | `git log --oneline --graph --all`                     |
| 推送           | `git push -u origin <branch>`                         |
| 拉取           | `git pull --rebase`                                   |
| 临时储藏       | `git stash` / `git stash pop`                         |
| 撤销工作区     | `git restore <file>`                                  |
| 安全回退       | `git revert HEAD`                                     |
| 删除远程分支   | `git push origin -d <branch>`                         |
| 查看差异       | `git diff`                                            |
| 追加提交       | `git commit --amend`                                  |

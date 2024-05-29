---
title: Monorepo 讲解
date: 2024-05-29 17:19:05
---

代码管理一直是一个棘手的问题。

---

原文：[Monorepo Explained](https://monorepo.tools/)

## 什么是 Monorepo ？

`Monorepo` 是一个包含多个具有关联性项目的单一存储库。

![monorepo-polyrepo](https://monorepo.tools/images/monorepo-polyrepo.svg)

如果一个存储库中管理了多个项目，而这些项目没有任何关联，我们并不能称其为 `Monorepo`，它只能算是一个巨石仓库（庞大的仓库）。

![monolith-modular](https://monorepo.tools/images/monolith-modular.svg)

## 为什么使用 Monorepo ？

译者按：要想在多个技术中作出选择，就需要知道每个技术的特点。知己知彼，方能百战百胜！

### vs. 多仓库
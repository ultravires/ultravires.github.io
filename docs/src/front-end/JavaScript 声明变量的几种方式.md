---
title: JavaScript 声明变量的几种方式
cover:
  text: 声明变量
banner:
  wave: true
date: 2025-07-17
author:
  name: 向成渝
  email: x555666777@qq.com
---

在 JavaScript 中，声明变量的方式主要有三种：`var`、`let` 和 `const`。每种方式在作用域、初始化、提升行为等方面存在显著差异。

---

## 未定义

不声明，直接使用的情况：

```javascript
console.log(x); // Uncaught ReferenceError: x is not defined
```

## var

用于函数作用域内声明变量，支持变量提升。

```javascript
function example() {
  console.log(x); // undefined
  var x = 5;
  console.log(x); // 5
}
example();
```

引擎执行流程类似于：

1. 创建变量环境记录。

2. 在编译阶段处理变量名。

3. 设置默认值为 undefined。

4. 执行赋值表达式。

与之类似可提升的声明方式（HoistableDeclaration）还有：

```js
HoistableDeclaration :
  FunctionDeclaration
  GeneratorDeclaration
  AsyncFunctionDeclaration
  AsyncGeneratorDeclaration
```

| 类型                       | 语法示例                                  | 特性                           |
|--------------------------|-------------------------------------------|--------------------------------|
| FunctionDeclaration      | `function foo() {}`                       | 提升，函数对象预先绑定         |
| GeneratorDeclaration     | `function* gen() {}`                      | 语法上类似函数，但生成迭代器     |
| AsyncFunctionDeclaration | `async function fetchData() {}`          | 异步函数，返回 Promise         |
| AsyncGeneratorDeclaration| `async function* stream() {}`            | 异步生成器，结合 async + iterator |

这些都属于语法树中能在早期阶段就确定、绑定的结构，因此命名为 HoistableDeclaration。

HoistableDeclaration 是 ECMAScript 规范中对可以**提前处理并绑定的函数声明类型**的统称，主要用于描述那些**在语法分析阶段就能被“提升”处理**的声明结构。

## let

块级作用域变量声明，支持暂时性死区（TDZ），不可重复声明。

执行流程：

1. 编译阶段记录变量名，但不初始化。

2. 在执行到声明行前，变量处于 TDZ。

3. 进入声明行时，初始化为初始值。

## const

块级作用域常量声明，支持暂时性死区（TDZ），不可重复声明，必须初始化，不能被重新赋值，但对象内部属性仍可变（浅不可变）。

引擎执行流程：

1. 创建绑定时就必须提供初始值。

2. 引擎将标记该绑定为不可修改（immutable）。

3. 如果重新赋值，抛出错误。


## var、let 和 const 的对比

| 声明方式 | 作用域类型     | 是否变量提升 | 是否可重复声明 | 是否必须初始化 | 是否可重新赋值 | 是否存在 TDZ（暂时性死区） |
|----------|----------------|----------------|------------------|------------------|------------------|-----------------------------|
| `var`    | 函数级作用域   | ✅ 是           | ✅ 是             | ❌ 否             | ✅ 是             | ❌ 否                        |
| `let`    | 块级作用域     | ❌ 否           | ❌ 否             | ❌ 否             | ✅ 是             | ✅ 是                        |
| `const`  | 块级作用域     | ❌ 否           | ❌ 否             | ✅ 是             | ❌ 否             | ✅ 是                        |


## 参考

参见 [ECMA-262_16th_edition_june_2025](https://ecma-international.org/wp-content/uploads/ECMA-262_16th_edition_june_2025.pdf) 第 14.3 节。

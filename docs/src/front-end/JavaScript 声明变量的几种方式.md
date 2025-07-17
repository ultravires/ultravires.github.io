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

在未声明变量时直接使用

```javascript
console.log(x); // Uncaught ReferenceError: x is not defined
```

## var

在函数作用域内声明变量，存在变量提升，且可以重复定义。

```javascript
// console.log(a); // 函数作用域外，运行时报错 Uncaught ReferenceError: a is not defined
function example() {
  var a = 1;
  if (true) {
    var a = 2; // 同一函数作用域下，覆盖前面的a
    console.log(a); // 输出2
  }
  console.log(a); // 输出2
}
example();
```

## let

在块级作用域内声明变量，存在变量提升，但存在暂时性死区（TDZ），不可重复声明。

```javascript
// console.log(x); // 块级作用域外使用， ReferenceError: x is not defined
{ // 用 `{}` 添加块级作用域
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 10;
}
```

为了排除浏览器与 node 环境的差异，这里手动添加块级作用域，如果不加 `{}`，你在浏览器中可能看到 `Uncaught ReferenceError: x is not defined` 错误。原因是因为浏览器在全局作用域中：优先检查 window 对象是否存在该属性；若不存在，则抛出与未声明变量相同的错误信息。

## const

在块级作用域内声明常量，存在变量提升，支持暂时性死区（TDZ），不可重复声明，必须初始化，不能被重新赋值，但对象内部属性仍可变（浅不可变）。

```javascript
// console.log(a); // 块级作用域外，运行时报错 Uncaught ReferenceError: a is not defined
{
  // console.log(a); // ReferenceError: Cannot access 'a' before initialization
  // const a; // 这里没有初始化，会导致报错 SyntaxError: Missing initializer in const declaration
  const user = { name: 'Alice' };
  user.name = 'Bob'; // 可以修改对象内部属性
  console.log(user); // 输出 { name: 'Bob' }
  user = { name: 'Xenon' }; // TypeError: Assignment to constant variable.
}
```

## var、let 和 const 的对比

| 声明方式 | 作用域类型     | 是否变量提升 | 是否可重复声明 | 是否必须初始化 | 是否可重新赋值 | 是否存在 TDZ（暂时性死区） |
|----------|----------------|----------------|------------------|------------------|------------------|-----------------------------|
| `var`    | 函数级作用域    | ✅ 完全提升           | ✅ 是             | ❌ 否             | ✅ 是             | ❌ 否                        |
| `let`    | 块级作用域     | ❌ 部分提升           | ❌ 否             | ❌ 否             | ✅ 是             | ✅ 是                        |
| `const`  | 块级作用域     | ❌ 部分提升           | ❌ 否             | ✅ 是             | ❌ 否（浅不可变）             | ✅ 是                        |


## 除 var、let、const 之外

函数声明

形式：通过function关键字声明函数，会创建一个函数变量。

作用域：函数作用域或块级作用域（在块内声明时）。

变量提升：函数整体会被提升到作用域顶部，可以在声明前调用。

示例：

```javascript
example(); // 可以在声明前调用
function example() {
  console.log("函数声明");
}
```

类声明

形式：通过class关键字声明类，会创建一个类变量。

作用域：块级作用域。

变量提升：存在提升，但也有暂时性死区，在声明前访问会报错。

示例：
```javascript
// const instance = new MyClass(); // 报错，处于暂时性死区
class MyClass {
  constructor() {
    this.value = 1;
  }
}
const instance = new MyClass();
console.log(instance.value); // 输出1
```

模块中的 import 声明

作用域：模块作用域，仅在当前模块内有效。

用途：从其他模块导入变量、函数、类等。

示例：

```javascript
import { myVar } from './otherModule.js';
console.log(myVar); // 使用导入的变量
```

## 参考

参见 [ECMA-262_16th_edition_june_2025](https://ecma-international.org/wp-content/uploads/ECMA-262_16th_edition_june_2025.pdf) 第 14.3 节。

---
title: JavaScript 继承
date: 2025-07-19 11:20
cover:
  text: 原型继承
banner:
  wave: true
---

## 类继承

ES6 引入的 class 和 extends 关键字，提供更简洁的语法糖，本质上仍是基于原型的继承。

<<< @/snippets/extends.js#class{1}

## 原型继承

原型链继承的本质是对象引用和方法调用。通过对象引用的方式实现属性和方法共享，通过方法调用的方式改变 this 指向。

<<< @/snippets/extends.js#prototype{1}

---
title: 观察者模式 VS. 发布-订阅者模式
date: 2025-09-10 13:57:05
cover:
  text: 设计模式
banner:
  wave: true
categories:
  - 前端领域
tags:
  - 设计模式
---

# 观察者模式 VS. 发布-订阅者模式

**观察者模式**和**发布-订阅者模式**总是让人傻傻分不清。

## 观察者模式

```mermaid
classDiagram
    direction TB

    %% 1. 抽象主题（Subject）：定义观察者管理与通知的核心接口
    class Subject {
        +registerObserver(observer: Observer) void  // 注册观察者
        +removeObserver(observer: Observer) void   // 移除观察者
        +notifyObservers() void                    // 通知所有注册的观察者
    }

    %% 2. 具体主题（ConcreteSubject）：实现抽象主题，维护状态并触发通知
    class ConcreteSubject {
        -state: String  // 主题的核心状态（如"数据更新"、"状态变更"）
        +getState(): String  // 提供观察者获取当前状态的接口
        +setState(newState: String) void  // 更新状态，并调用notify触发通知
    }

    %% 3. 抽象观察者（Observer）：定义接收通知的接口
    class Observer {
        +update(subject: Subject) void  // 接收主题通知的核心方法（参数可传主题自身以获取最新状态）
    }

    %% 4. 具体观察者（ConcreteObserver）：实现抽象观察者，响应主题通知
    class ConcreteObserverA {
        +update(subject: Subject) void  // 具体实现A：接收通知后执行特定逻辑（如打印日志）
    }
    class ConcreteObserverB {
        +update(subject: Subject) void  // 具体实现B：接收通知后执行另一逻辑（如更新UI）
    }

    %% 依赖关系：具体主题继承抽象主题，具体观察者继承抽象观察者
    ConcreteSubject --|> Subject
    ConcreteObserverA --|> Observer
    ConcreteObserverB --|> Observer

    %% 关联关系：主题持有观察者列表（1对多），观察者依赖主题获取通知
    Subject "1" -- "*" Observer : 包含（has-a）
```

我们把被施加观察动作的角色称为**主题（Subject）**，把主动施加观察动作的角色称为**观察者（Observer）**。一个主题可以被多个观察者观察，观察者的行为是由主题的变化或动作触发的。

想象一下，在漫展上一群~~老色批~~架着摄影机围着一位角色扮演者（cosplayer），当 cosplayer 每变换一个姿势，那群~~老色批~~就纷纷按下快门键进行拍照。这个场景中摄影者就是观察者，角色扮演者就是主题，角色扮演者换一个姿势就是做出了变化，摄影者按下快门就是观察到角色扮演者姿势的变化而做出的行为。

```javascript
class Photographer {
  name = '摄影师';
  
  constructor(name) {
    this.name = name;
  }
  
  capture() {
    console.log(`📷 ${this.name}拍到了！`);
  }
}

class Cosplayer {
  name = '角色扮演者';
  
  observers = [];
  
  constructor(name) {
    this.name = name;
  }
  
  move() {
    console.log(`💃🏻 ${this.name}换姿势！`);
    this.notify();
  }
  
  notify() {
    let index = this.observers.length - 1;
    while(-1 !== index) {
      const observer = this.observers[index];
      observer.capture();
      index -= 1;
    }
  }
  
  registerObserver(observer) {
    this.observers.push(observer);
  }
  
  removeObserver(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }
}

const coser = new Cosplayer('柳如烟');
const observerA = new Photographer('摄影甲');
const observerB = new Photographer('摄影乙');
coser.registerObserver(observerA);
coser.registerObserver(observerB);
coser.move();
coser.removeObserver(observerA);
coser.move();
```

## 发布-订阅者模式



## 从名字上看区别

从名字上看“发布-订阅者模式”比“观察者”模式要多一类角色，发布者和订阅者是两类角色，观察者是一类角色。

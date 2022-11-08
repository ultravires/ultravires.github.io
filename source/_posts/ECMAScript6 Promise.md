---
title: ECMAScript6 Promise
categories:
  - Front-End
tags:
  - Promise
---

## Promise

Promise 对象是一个等待处理结果的占位符。它具有三个互斥状态：_fulfilled_, _rejected_, _pending_ 。

```js
const resolve = (res) => {
  console.log('resolve: ' + res);
};
const reject = () => {
  console.log('reject: ' + res);
};
const fn = (flag) => {
  return new Promise((resolve, reject) => {
    if (flag === true) {
      resolve();
    }
    if (flag === false) {
      reject();
    }
  }).then(resolve, reject);
};
fn(true); // fulfilled
fn(false); // rejected
fn(); // pending
```

如果一个 Promise 对象 `p` 被 fulfilled，那么 `p.then(resolve, reject)` 会立即执行 `resolve` 回调。

```js
const resolve = () => {
  console.log('resolve');
};
const reject = () => {
  console.log('reject');
};
Promise.resolve().then(resolve, reject);
```

如果一个 Promise 对象 `p` 被 rejected，那么 `p.then(resolve, reject)` 会立即执行 `reject` 回调。

```js
const resolve = () => {
  console.log('resolve');
};
const reject = () => {
  console.log('reject');
};
Promise.reject().then(resolve, reject);
```

如果一个 Promise 对象既没有被 fulfilled，也没有被 rejected，那么它就是处于 pending 状态的。

```js
const promise = new Promise((resolve, reject) => {});
```

### Promise.resolve()

`Promise.resolve(value)` 方法返回一个以给定值解析后的 `Promise` 对象。如果这个值是一个 promise，那么将返回这个 promise；如果这个值是 thenable （即带有 then 方法），返回的 Promise 会跟随这个 thenable 的对象，采用它的最终状态。

```js
const resolve = (res) => {
  console.log(res);
};
const reject = (res) => {
  console.log(res);
};
Promise.resolve({ name: '熊可' }).then(resolve, reject);
```

传入 `promise`:

```js
const promise = new Promise((resolve, reject) => {});
Promise.resolve(promise) === promise; // true
```

传入 thenable:

```js
const thenable = {
  then: (resolve, reject) => {}
};
Promise.resolve(thenable); // 返回一个 Promise，且状态为 pending
```

```js
const thenable = {
  then: (resolve, reject) => {
    resolve();
  }
};
Promise.resolve(thenable); // 返回一个 Promise，且状态为 fulfilled
```

```js
const thenable = {
  then: (resolve, reject) => {
    reject();
  }
};
Promise.resolve(thenable); // 返回一个 Promise，且状态为 rejected
```

```js
const thenable = {
  then: (resolve, reject) => {
    resolve(thenable);
  }
};
Promise.resolve(thenable); // 将会进入死循环
```

### Promise.reject()

`Promise.reject()` 方法返回一个带有拒绝原因的 Promise 对象。

```js
const resolve = (res) => {
  console.log(res);
};
const reject = (res) => {
  console.log(res);
};
Promise.reject(new Error('FAILED')).then(resolve, reject);
```

## 使用

### 拒绝回调地狱，回调变 Promise

假设有一个需要传入回调的方法 `needCallback`：

```js
function needCallback(callback) {
  if (typeof callback === 'function') {
    callback({ code: 0, data: { name: '熊可' } });
  }
}
```

正常调用的时候我们会使用如下方式：

```js
needCallback((result) => {
  // do something
});
```

假设我现在需要一个有序调用，即在某个回调完成时才执行下一个步骤，你可能会这么写：

```js
needCallback((result) => {
  needCallback((result) => {
    needCallback((result) => {
      needCallback((result) => {
        needCallback((result) => {
          // ...
        });
      });
    });
  });
});
```

这就是传说中的回调地狱，你会发现，需要执行的步骤越多，回调嵌套的越深。

那么有没有办法解决这个问题呢？答案是：有的。正确的使用 Promise 能够使我们避免回调地狱。

```js
// 通过返回一个 Promise 对象来避免嵌套回调
const convertPromise = () => {
  const promise = new Promise((resolve, reject) => {
    needCallback((result) => {
      resolve(result);
    });
  });
  return promise;
};

// 正确的用法
convertPromise()
  .then((result) => {
    return result;
  })
  .then((result) => {
    return result;
  })
  .then((result) => {
    return result;
  });

// 错误的用法
convertPromise().then((result) => {
  convertPromise().then((result) => {
    convertPromise().then((result) => {
      // ...
    });
  });
});
```

## 参考链接

> [promises-unwrapping](https://github.com/domenic/promises-unwrapping)
>
> [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---
title: '算法题解: n 数之和'
categories:
  - 算法
tags:
  - 算法
  - n 数之和
date: 2024-05-14 14:53:44
---

## n 数之和

> 现给定一个整数数组 (数组长度大于等于 5) nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那 n ( n < nums.length ) 个整数，并返回它们的数组(如果有多个下标组合都满足，则返回下标和最小的那一组)的下标。
>
> **注意：数组中同一个元素在答案里不能重复出现。**
>
> 输入: nums = [3，2，4，5，7]，n = 3, target = 10
>
> 输出: [0，1，3]

### 思路

可能性：

1. 找不到 `n` 数之和为 `target`: 输出 `[]`
2. 找到 `n` 数之和为 `target`: 输出正确的索引数组

程序通过遍历能够很方便的得到 `nums` 数组中的每一个元素，以及 `target` 和 `n` 为已知条件。

按题例写步骤：

>> 程序真是蠢死了，连跳跃思维都不会，还得一步一步来。-- 向成渝
>
> 3 === 10
>
> 3 + 2 === 10
>
> 3 + 2 + 4 === 10
>
> <strike>3 + 2 + 4 + 5 === 10</strike> 求和数 数量超过 n（按照这个逻辑，后面的数量会越来越多，跳过）
>
> 3 + 2 + 5 === 10 符合条件
>
> 3 + 2 + 7 === 10
>
> 2 + 4 + 5 === 10
>
> 2 + 4 + 7 === 10
>
> 4 + 5 + 7 === 10
>
> <strike>5 + 7 === 10</strike> 求和数 数量少于 n（按照这个逻辑，后面的数量会越来越少，跳过）

### 伪代码

这里简单写一下核心思路的代码实现，伪代码逻辑。

### 解题

```js
import { strict as assert } from 'node:assert';
import { it } from 'node:test';

function findIndexes(nums, n, target) {
  const indexes = [];
  const temp = [];
  const helper = (start) => {
    if (nums.length - start < n) {
      if (target !== temp.reduce((prev, next) => (prev + next))) {
        return [];
      }
      return indexes;
    }
    temp.length = 0;
    indexes.length = 0;
    for (let i = start, len = nums.length; i < len; i++) {
      if (indexes.length === n) {
        if (target === temp.reduce((prev, next) => (prev + next))) {
          return indexes;
        }
        temp.pop();
        indexes.pop();
      }
      if (indexes.length < n) {
        temp.push(nums[i]);
        indexes.push(i);
        continue;
      }
    }
    return helper(start + 1);
  };
  return helper(0);
}

it("n数之和", () => {
  assert.deepEqual(findIndexes([3,2,4,5,7], 3, 10), [0, 1, 3]);
});
it("n数之和", () => {
  assert.deepEqual(findIndexes([3,2,4,5,7], 2, 9), [2, 3]);
});
it("n数之和", () => {
  assert.deepEqual(findIndexes([-1,2,-3,4,5,-11], 3, -2), [0, 1, 2]);
});
it("n数之和", () => {
  assert.deepEqual(findIndexes([1,2,-3,4,5,-11], 3, -2), [3, 4, 5]);
});
it("n数之和", () => {
  assert.deepEqual(findIndexes([1,2,-3,4,5,-11], 3, 100), []);
});
```








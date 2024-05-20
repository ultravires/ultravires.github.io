---
title: '算法题解: n 数之和'
date: 2024-05-16 12:35:00
category: 算法题解
---

## n 数之和

> 现给定一个整数数组 (数组长度大于等于 5) nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那 n ( n < nums.length ) 个整数，并返回它们的数组(如果有多个下标组合都满足，则返回下标和最小的那一组)的下标。
>
> **注意：数组中同一个元素在答案里不能重复出现。**
>
> 输入: nums = [3, 2, 4, 5, 7]，n = 3, target = 10
>
> 输出: [0, 1, 3]

### 思路

可能性：

1. 找到 `n` 数之和为 `target`: 输出正确的索引数组
2. 找不到 `n` 数之和为 `target`: 输出 `undefined`（题目没有规定这种情况的输出）

解题思路：固定前 n - 1 项的和，在数组中寻找最后最后一项。

按题例写步骤：

>> 输入: nums = [3，2，4，5，7]，n = 3, target = 10
>
>> 固定前两项，寻找最后一项
>
> 固定 (3, 2)
>
> 3 + 2 + 4 === 10
>
> 3 + 2 + 5 === 10 符合条件
>
> 3 + 2 + 7 === 10
>
> 固定 (3, 4)
>
> 3 + 4 + 5
>
> 3 + 4 + 7
>
> 固定 (3, 5)
>
> 3 + 5 + 7
>
> 固定 (2, 4)
>
> 2 + 4 + 5 === 10
>
> 2 + 4 + 7 === 10
>
> 固定 (2, 5)
>
> 2 + 5 + 7 === 10
>
> 固定 (4, 5)
>
> 4 + 5 + 7 === 10

找条件：
  1. 索引数组长度为 n 且 `nums[indexes[0]] + nums[indexes[1]] + ... + nums[indexes[n-1]] = target` (这里的 `indexes[i]` 为索引数组中的每一项)
  2. `nums`、`target` 和 `n` 为已知条件，程序通过遍历能够很方便的得到 `nums` 数组中的每一个元素

Q: 如何固定前 n - 1 项？
A: 
1. 遍历每一种可能的组合（回溯法）

## 化繁为简：固定前 n - 1 项

```js
function combine(nums, n) {
  const result = [];
  
  function backtrack(start, current) {
      if (current.length === n) {
          result.push([...current]);
          return;
      }
      
      for (let i = start; i < nums.length; i++) {
          current.push(nums[i]);
          backtrack(i + 1, current);
          current.pop();
      }
  }
  
  backtrack(0, []);
  return result;
}
```

### 解题

```js
import { strict as assert } from 'node:assert';
import { it } from 'node:test';

function nSum(nums, n, target) {
  const result = [];
  
  function backtrack(start, current, sum) {
      if (current.length === n && sum === target) {
          result.push([...current]);
          return;
      }
      
      for (let i = start; i < nums.length; i++) {
          current.push(i);
          backtrack(i + 1, current, sum + nums[i]);
          current.pop();
      }
  }
  
  backtrack(0, [], 0);
  return result[0]; // 返回下标和最小的那一组
}


it("n数之和", () => {
  assert.deepEqual(nSum([3,2,4,5,7], 3, 10), [0, 1, 3]);
});
it("n数之和", () => {
  assert.deepEqual(nSum([3,2,4,5,7], 2, 9), [2, 3]);
});
it("n数之和", () => {
  assert.deepEqual(nSum([-1,2,-3,4,5,-11], 3, -2), [0, 1, 2]);
});
it("n数之和", () => {
  assert.deepEqual(nSum([1,2,-3,4,5,-11], 3, -2), [3, 4, 5]);
});
it("n数之和", () => {
  assert.deepEqual(nSum([1,2,-3,4,5,-11], 3, 100), undefined);
});
```
### 戏剧性

在进行代码测试的时候，发现有一个测试用例没有通过，仔细对比发现，actual 和 expected 都符合题意。

```js
it("n数之和", () => {
  assert.deepEqual(nSum([3,2,4,5,7], 2, 9), [2, 3]);
});

// + actual - expected
//   [
// +   1,
// +   4
// -   2,
// -   3
//   ]
```

不得不夸自己测试用例写的好（其实是巧合，hia~ hia~ hia~）。回过头来思考，其实这个情况很容易就思考到，如下面这个例子：

当 `nums = [0, 0, 0, 0, 0]`, `n = 3`, `target = 0` 时：`[0, 1, 4]` 和 `[0, 2, 3]` 都符合题意。

所以输出应该是一个二维数组才对啊！

结语：做算法题要学会化繁为简、找条件，当然还要写测试用例。
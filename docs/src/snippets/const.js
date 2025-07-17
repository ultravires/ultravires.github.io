// console.log(a); // 块级作用域外，运行时报错 Uncaught ReferenceError: a is not defined
{
  // console.log(a); // ReferenceError: Cannot access 'a' before initialization
  // const a; // 这里没有初始化，会导致报错 SyntaxError: Missing initializer in const declaration
  const user = { name: 'Alice' };
  user.name = 'Bob'; // 可以修改对象内部属性
  console.log(user); // 输出 { name: 'Bob' }
  user = { name: 'Xenon' }; // TypeError: Assignment to constant variable.
}
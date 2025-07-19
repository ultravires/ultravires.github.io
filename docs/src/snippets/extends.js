// JavaScript 继承

// #region class
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // 调用父类构造函数
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex');
dog.speak(); // 输出: Rex barks.
// #endregion class


// #region prototype
function Person(name) {
  this.name = name;
}
Person.prototype.speak = function() {
  console.log(`${this.name} said "How are you?".`);
}

function Student(name) {
  // 调用父类构造函数，可以为父类构造函数传参
  Person.call(this, name);
}

// 因为方法都在原型上，所以我们可以直接让 Student 的原型指向 Person 的原型
Student.prototype = Object.create(Person.prototype);
// 确保 Student 的构造函数指向 Student（修复 this 指向问题）
Student.prototype.constructor = Student;

const student = new Student('John');
student.speak();
// #endregion prototype
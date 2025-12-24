// 인터페이스 선언
interface User {
  age: number;
  name: string;
}

// 변수 활용
const hannamoon: User = { name: "hannamoon", age: 24 };

// 함수 인자로의 활용
function getUser(user: User) {
  console.log(user);
}

getUser({ name: "donghyeon", age: 24 });

interface Add {
  (x: number, y: number): number;
}

let addFunc: Add = (a, b) => a + b;

console.log(addFunc(14, 7));

// 배열 활용
interface StringArr {
  [index: number]: string;
}

let arr: StringArr = ["a", "b", "c"];

// 객체 활용
interface Obj {
  [key: string]: string;
}

const obj: Obj = {
  person1: "donghyeon",
  person2: "hannamoon",
};

// interface 확장
interface Person {
  name1: string;
  age: number;
}

interface Developer1 extends Person {
  position: string;
}

const what: Developer1 = {
  name1: "hannamoon",
  age: 24,
  position: "FE",
};

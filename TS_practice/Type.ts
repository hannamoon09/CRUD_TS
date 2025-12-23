type StrOrNum = string | number;

const str1: StrOrNum = "hello world";
const str2: StrOrNum = 77777;

// 연산자(Operator)

// 유니언 타입(Union Type)
function StrOrNum(value: string | number) {
  if (typeof value === "string") {
    value.toString();
  } else if (typeof value === "number") {
    value.toLocaleString();
  } else {
    throw new TypeError("문자열 또는 숫자를 넣어주세요!");
  }
}

StrOrNum("hello world");
StrOrNum(777);

// 교차 타입(Intersection Type)
interface Person2 {
  name2: string;
  age: number;
}

interface Developer2 {
  name2: string;
  skill: string;
}

type Capt = Person2 & Developer2;

let devPerson: Capt = {
  name2: "kim",
  age: 777,
  skill: "Fe",
};

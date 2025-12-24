// 제네릭 선언
function logText<T>(text: T): T {
  console.log(text);
  return text;
}

logText<string>("Hello World!");

// 인터페이스에 제네릭 선언
interface Menu<T> {
  value: T;
  price: number;
}

const hamburger: Menu<string> = { value: "hamburger", price: 5000 };

//제네릭 타입 제한
//배열 힌트
function textLength<T>(text: T[]): T[] {
  console.log(text.length);
  return text;
}

textLength<string>(["hello", "world"]);

// 정의된 타입 이용
interface LengthType {
  length: number;
}

function logTextLen<T extends LengthType>(text: T): T {
  console.log(text.length);
  return text;
}

logTextLen("hello world");
// logTextLen(100); 에러
logTextLen({ length: 100 });

// keyof
//interface에 정의된 key 값만을 허용
interface Item {
  name: string;
  price: number;
  stock: number;
}

function getItemOption<T extends keyof Item>(itemOption: T): T {
  return itemOption;
}

// 'name', 'price', 'stock'만 인자로 사용 가능
getItemOption("price");

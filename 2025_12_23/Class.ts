// 접근 제한자(public, private, protected 등)를 지원함

class Person3 {
  // constructor 위에 선언
  private name3: string;
  public age: number;
  readonly log: string;

  constructor(name: string, age: number) {
    this.name3 = name;
    this.age = age;
  }
}

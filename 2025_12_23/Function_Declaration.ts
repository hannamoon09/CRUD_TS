// ts에서 함수는 js처럼 기명 함수(named function)과 익명 함수(anonymous funtion)로 만들 수 있음

// 함수 타입 선언
function add(x: number, y: number): number {
  return x + y;
}

// 선택적 매개변수(optional parameter)
//optional parameter는 있어도 되고 없어도 되는 param의 앞에 ?를 붙임
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bobs"); // 문제 없음
// let result2 = buildName("Bobs", "Adams", "Sr."); <- Sr. 떄문에 에러
let result3 = buildName("Bobs", "Adams"); // 문제 없음

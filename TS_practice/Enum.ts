// 열거형(Enum)으로 이름이 있는 상수들의 집합을 정의 할 수 있음
// enum을 사용하면 default 값을 선언 할 수 있음

// 숫자형
enum Brands {
  Nike, // 0
  Adidas, // 1
  NewBalance, // 2
}

const muShoes = Brands.Nike; // 0

// 문자형
enum Player {
  kim = "김",
  park = "박",
}

const player = Player.park; // 빅

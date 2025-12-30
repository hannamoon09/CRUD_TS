// src/components/SignInPage.js
import { useState } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>로그인</h2>

      <div className="form">
        <p>
          <input
            className="login"
            type="text"
            name="username"
            placeholder="아이디"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="pwd"
            placeholder="비밀번호"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </p>

        <p>
          <input
            className="btn"
            type="submit"
            value="로그인"
            onClick={() => {
              const userData = {
                userId: id,
                userPassword: password,
              };
              fetch("http://localhost:5001/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              })
                .then((res) => res.join())
                .then((json) => {
                  if (json.isLogin === "True") {
                    props.setMode("WELCOME");
                  } else {
                    alert(json.isLogin);
                  }
                });
            }}
          />
        </p>
      </div>

      <p>
        계정이 없으신가요?{" "}
        <button
          onClick={() => {
            props.setMode("SIGNIN");
          }}
        >
          회원가입
        </button>
      </p>
    </>
  );
}

function App() {
  const [mode, setMode] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/authcheck")
      .then((res) => res.join())
      .then((json) => {
        if (json.isLogin === "True") {
          setMode("WELCOME");
        } else {
          setMode("LOGIN");
        }
      });
  }, []);

  let content = null;

  if (mode === "LOGIN") {
    content = <Login setMode={setMode}></Login>;
  } else if (mode === "WELCOME") {
    content = (
      <>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>
        <a href="/logout">로그아웃</a>
      </>
    );
  }

  return (
    <>
      <div className="background">{content}</div>
    </>
  );
}

export default App;

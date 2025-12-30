import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    if (id === "" || pw === "") {
      alert("아이디 또는 비밀번호를 입력해주시기 바랍니다");
      return;
    } else {
      try {
        const res = await fetch("http://localhost:5001/register", {
          method: "POST",
          body: JSON.stringify({ userID: id, userPW: pw, userEmail: email }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        alert(data.message || "회원가입 성공");
        if (res.status === 201) {
          navigate("/");
        } else {
          setId("");
          setPw("");
          setEmail("");
          return;
        }
      } catch (err) {
        console.log(err);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div>
      <span className="absolute left-[37px] top-12 text-2xl font-semibold mb-[52px]">
        회원가입
      </span>
      <div className="absolute top-[152px] flex flex-col w-full items-center">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="   아이디"
          className="w-5/6 h-[47px] mb-[14px] border border-gray rounded-lg"
          aria-label="아이디"
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="   비밀번호"
          className="w-5/6 h-[47px] mb-[14px] border border-gray rounded-lg"
          aria-label="비밀번호"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="   이메일 주소"
          className="w-5/6 h-[47px] mb-[14px] border border-gray rounded-lg"
          aria-label="이메일 주소"
        />
        <button
          type="submit"
          className="w-5/6 h-[47px] bg-blue text-white font-semibold text-xl rounded-md"
          onClick={submit}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;

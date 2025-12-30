const session = require("express-session");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const sessionOption = require("./sessionOption");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json()); // JSON 요청을 처리하기 위해 필요
app.use(bodyParser.json());

var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(
  session({
    key: "session_cookie_name",
    secret: "~",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// 미들웨어 설정
app.use(bodyParser.json());

app.get("/authcheck", (req, res) => {
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
    sendData.isLogin = "True";
  } else {
    sendData.isLogin = "False";
  }
  res.send(sendData);
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.post("/login", (req, res) => {
  // 데이터 받아서 결과 전송
  const username = req.body.userId;
  const password = req.body.userPassword;
  const sendData = { isLogin: "" };

  if (username & password) {
    // id와 pw가 입력되었는지 확인
    db.query(
      "SELECT * FROM userTable WHERE username = ?",
      [username],
      function (err, results, fields) {
        if (err) throw err;
        if (results.length > 0) {
          // db에서의 반환값이 있다 = 일치하는 아이디가 있다.
          bcrypt.compare(password, results[0].password, (err, result) => {
            // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
            if (result === true) {
              req.session.is_logined = true;
              req.session.nickname = username;
              req.session.save(function () {
                sendData.isLogin = "True";
                res.send(sendData);
              });
              db.query(
                `INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login', ?, ?)`,
                [req.session.nickname, "-", `React 로그인 테스트`],
                function (error, result) {}
              );
            } else {
              sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
              res.send(sendData);
            }
          });
        } else {
          sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
          res.send(sendData);
        }
      }
    );
  }
});

// 회원가입 라우트
app.post("/register", (req, res) => {
  const { userID, userPW, userEmail } = req.body;
  const query =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  db.query(query, [userID, userPW, userEmail], (err, results) => {
    if (err) {
      console.error("Error inserting user: ", err);
      res.status(500).json({ success: false, message: "Database error" });
    }
    res.status(201).json({ success: true, userID: results.insertId });
  });
});

// 게시글 목록 조회 API
app.get("/api/posts", (req, res) => {
  const query = "SELECT * FROM posts";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching posts");
    }
    res.json(results);
  });
});

// 게시글 상세 정보 가져오기
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // 게시글 정보 가져오기
  db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "서버 오류" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    console.log(`### 게시글 조회 성공: ${results[0]}`);
    res.json(results[0]);
  });
});

// 조회수 증가 API 생성
app.patch("/api/posts/:id/view", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE posts SET view_cnt = view_cnt + 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("조회수 증가 오류: ", err);
        return res.status(500).json({ message: "서버 오류" });
      }
      res.status(200).send("조회수 증가 성공");
    }
  );
});

// 검증 미들웨어 작성 - 게시글 작성과 수정 부분
const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content || title.trim() === "" || content.trim() === "") {
    return res
      .status(400)
      .json({ message: "제목과 내용을 모두 입력해야 합니다." });
  }
  next();
};

// 게시글 작성 API, validatePost 추가
app.post("/api/posts", validatePost, (req, res) => {
  const { title, content } = req.body;
  const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
  db.query(query, [title, content], (err, result) => {
    if (err) {
      return res.status(500).send("Error creating post");
    }
    // 데이터 저장 로직
    res.status(201).send("Post created successfully");
  });
});

// 게시글 수정 API
app.put("/api/posts/:id", validatePost, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating post");
    }
    res.send("Post updated successfully");
  });
});

// 게시글 삭제 API
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM posts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting post");
    }
    res.send("Post deleted successfully");
  });
});

// 서버 실행
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

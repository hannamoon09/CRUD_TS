// src/components/PostForm.js
import React, { useState } from "react";
import axios from "axios";
// 게시글을 작성한 후 게시글 목록을 경신할 수 있도록 Navigate를 사용해 목록 페이지로 이동
import { useNavigate } from "react-router-dom";

function PostForm({ setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/api/posts", { title, content })
      .then((response) => {
        alert("게시글이 작성되었습니다.");
        setTitle("");
        setContent("");

        // 작성한 글을 목록에 추가
        axios
          .get("http://localhost:5001/api/posts")
          .then((response) => setPosts(response.data)) // 작성 후 PostList 업데이트
          .catch((error) => console.error("Error fetching posts: ", error));

        navigate("/");
      })
      .catch((error) => console.error("Error creating post: ", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 게시글 작성</h2>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

export default PostForm;

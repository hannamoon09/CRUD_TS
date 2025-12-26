// src/components/PostEdit.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editPost } from "../share/api";
import axios from "axios";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    //게시글 데이터 가져와서 수정할 수 있도록 제목과 내용 상태에 저장
    axios
      .get(`http://localhost:5001/api/posts/${id}`) //템플릿 리터럴 수정
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => console.error("게시글 불러오기 오류: ", error));
  }, [id]);

  const handleSave = async () => {
    const updatedData = { title, content };
    const result = await editPost(id, updatedData);

    if (result.success) {
      alert("Post updated successfully");
      navigate("/");
    } else {
      alert(result.error || "Failed to update post");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default PostEdit;

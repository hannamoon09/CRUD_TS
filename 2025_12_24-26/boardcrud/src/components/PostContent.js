// src/components/PostContent.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { deletePost } from "../share/api";

const PostContent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 변수 선언
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("게시글 불러오기 오류: ", error));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  //수정함수
  const handleEdit = () => {
    //수정 페이지로 이동하는 함수
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const result = await deletePost(id);

    if (result.success) {
      alert("Post deleted successfully");
      navigate("/");
    } else {
      alert(result.error || "Failed to delete post");
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <strong>작성일: </strong> {new Date(post.created_at).toLocaleString()}
      </p>
      {/* 버튼 추가 */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostContent;

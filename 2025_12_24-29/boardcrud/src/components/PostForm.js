// src/components/PostForm.js
import React, { useState } from "react";
import axios from "axios";
// 게시글을 작성한 후 게시글 목록을 경신할 수 있도록 Navigate를 사용해 목록 페이지로 이동
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Container, Alert } from "react-bootstrap";

function PostForm({ setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/api/posts", { title, content })
      .then((response) => {
        setPosts(response.data);
        navigate("/").catch((error) =>
          console.error("Error fetching posts: ", error)
        );
      })
      .catch((error) => console.error("Error creatig post: ", error));

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "50px" }}>
      <h2 className="mb-5">새 게시글 작성</h2>

      {/* 에러 메시지 표시 */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <Row className="mb-3">
          <Form.Label>제목</Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              isInvalid={!title.trim() && error} // 제목이 비어있고 애러가 있으면 스타일 표시
            />
          </Col>
        </Row>

        {/* 내용 입력 및 버튼 */}
        <Row className="mb-4 align-items-center">
          <Form.Label>내용</Form.Label>
          <Col md={10} className="position-relative">
            <Form.Control
              as="textarea"
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              style={{ paddingRight: "100px" }}
              isInvalid={!content.trim() && error} // 내용이 비어있고 에러가 있으면 스타일 표시
            />

            <Form.Control.Feedback type="invalid">
              내용을 입력해주세요
            </Form.Control.Feedback>

            {/* 작성 버튼을 textarea 왼쪽 아래에 배치 */}
            <Button>작성</Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default PostForm;

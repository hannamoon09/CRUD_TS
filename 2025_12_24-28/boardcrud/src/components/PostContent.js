// src/components/PostContent.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { deletePost } from "../share/api";
import { Container, Row, Col, Button } from "react-bootstrap";

const PostContent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 변수 선언
  const [post, setPost] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/posts/${id}`)
  //     .then((response) => setPost(response.data))
  //     .catch((error) => console.error("게시글 불러오기 오류: ", error));
  // }, [id]);

  useEffect(() => {
    // 게시글 데이터 가져오기
    console.log("### useEffect 실행됨");
    axios
      .get(`http://localhost:5001/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);

        //조회수 증가 API 호출
        console.log("### 조회수 증가 API 호출");
        axios
          .patch(`http://localhost:5001/api/posts/${id}/view`)
          .catch((error) => console.error("조회수 증가 오류: ", error));
      })
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
    <Container style={{ maxWidth: "800px", marginTop: "50px" }}>
      <h2 className="mb-4">{post.title}</h2>
      <Row className="mb-4">
        {/* 조회수와 작성일을 같은 Row에 배치 */}
        <Col md="6">
          <p>
            <strong>조회수: </strong> {post.view_cnt}
          </p>
        </Col>
        <Col md="6" className="text-end">
          <p>
            <strong>작성일: </strong>{" "}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {/* 내용에 테두리 추가 */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#f9f9f9",
              minHeight: "350px",
            }}
          >
            <p>{post.content}</p>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {/* 목록으로 돌아가기 버튼을 하단 왼쪽에 배치 */}
        <Col md="6">
          <Link to="/">
            <Button variant="secondary">목록으로 돌아가기</Button>
          </Link>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="me-2" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PostContent;

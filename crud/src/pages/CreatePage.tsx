import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const navigate = useNavigate();

  //입력값 상태 저장
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  //등록 버튼 클릭 시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 막기

    //아직 DB가 없으니 콘솔로 출력
    console.log('작성된 게시글:', {
      title,
      author,
      content,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    });

    // (/) 목록으로 이동 -> 상세 페이지 이동 후 해당 게시글 상세 페이지 이동으로 수정
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>글쓰기</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>작성자</label>
          <br />
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>

        <div>
          <label>내용</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          등록
        </button>
      </form>
    </div>
  );
}

export default CreatePage;

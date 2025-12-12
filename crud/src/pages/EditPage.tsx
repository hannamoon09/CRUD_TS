import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 타입스크립트 타입 정의
interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

// 기존 게시글 더미 데이터
const dummyPosts: Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글',
    author: '이동현',
    content: '나도 이제 프론트 한다!!!!!!',
    date: '2025-07-29',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    author: '한나문',
    content: '정보보안 하는데 프론트 까지 해버리기',
    date: '2025-07-28',
  },
];

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = dummyPosts.find((p) => p.id === Number(id));

  // 초기값 설정 (없을 경우 기본값)
  const [title, setTitle] = useState(post?.title || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [content, setContent] = useState(post?.content || '');

  // 수정 버튼 클릭 시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 아직 DB가 없으니 콘솔로 출력
    console.log('작성된 게시글:', {
      title,
      author,
      content,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    });

    // (/) 목록으로 이동 -> 상세 페이지 생성 후 해당 게시글 상세 페이지 이동으로 수정
    navigate('/');
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>✏️ 게시글 수정</h1>

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
          저장
        </button>
      </form>
    </div>
  );
}

export default EditPage;

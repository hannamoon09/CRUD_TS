import { useNavigate } from 'react-router-dom';

// 타입스크립트의 타입 정의
interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
}

// 더미 데이터
const dummyPosts: Post[] = [
  { id: 1, title: '첫 번째 게시글', author: '이동현', date: '2025-07-29' },
  { id: 2, title: '두 번째 게시글', author: '한나문', date: '2025-07-28' },
];

// 파일 이름과 함수 이름이 반드시 같을 필요는 없지만, 보통은 같게 짓는 개 권장되는 규칙이다.
// 즉, 한 파일당 하나의 주요 컴포넌트 함수만 두는 게 일반적이다.
function ListPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>게시글 목록</h1>

      <button onClick={() => navigate('/create')} style={{ marginBottom: '20px' }}>
        글쓰기
      </button>

      <ul>
        {dummyPosts.map((post) => (
          <li
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <strong>{post.title}</strong> - {post.author} ({post.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;

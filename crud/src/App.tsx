import './App.css';

import { Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Route>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/post/:id" element={<DetailPage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Route>
  );
}

export default App;

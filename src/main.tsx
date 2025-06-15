import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from './layout/index';
const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <BrowserRouter basename='/Gajdascz/'>
    <Routes>
      <Route index element={<Layout />}></Route>
    </Routes>
  </BrowserRouter>
);

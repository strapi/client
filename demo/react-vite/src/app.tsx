import { CollectionDemo } from '@/pages/CollectionDemo.tsx';
import { FilesDemo } from '@/pages/FilesDemo.tsx';

import { Home } from '@/pages/Home.tsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/demos/collections" element={<CollectionDemo />} />
          <Route path="/demos/files" element={<FilesDemo />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

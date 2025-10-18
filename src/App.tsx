import { Link, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <Link className="font-semibold hover:underline" to="/">
            Home
          </Link>
          <Link className="hover:underline" to="/about">
            About
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import About from './routes/About';
import Contact from './routes/Contact';
import Experience from './routes/Experience';
import Home from './routes/Home';
import Projects from './routes/Projects';

export default function Page() {
  const location = useLocation();

  return (
    <main className="page">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

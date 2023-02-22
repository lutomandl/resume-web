import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from 'react-locomotive-scroll';
import { useRef } from 'react';
import Home from './routes/Home';
import About from './routes/About';
import useLocoScroll from '../hooks/useLocoScroll';

export default function Page() {
  const containerRef = useRef(null);
  useLocoScroll(true, containerRef);

  return (
    <main data-scroll-container ref={containerRef} className="page" id="main">
      <Home />
      <About />
    </main>
  );
}

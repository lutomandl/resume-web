import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Header from './Header';
import More from './More';
import Projects from './Projects';

export default function Page() {
  return (
    <main className="page">
      <Header />
      <About />
      <More />
    </main>
  );
}

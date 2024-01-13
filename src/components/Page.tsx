import About from './About';
import Contact from './Contact';
import Header from './Header';
import More from './More';

export default function Page() {
  return (
    <main className="page">
      <Header />
      <About />
      <Contact />
      <More />
    </main>
  );
}

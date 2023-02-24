import About from './About';
import Header from './Header';

export default function Page() {
  return (
    <main className="page">
      <Header />
      <About heading="About" />
    </main>
  );
}

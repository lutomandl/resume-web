import { useEffect, useState } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import Menu from './components/Menu';
import Page from './components/Page';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const sections = [
    {
      id: 'about',
      heading: 'About',
    },
    {
      id: 'experience',
      heading: 'Experience',
    },
    {
      id: 'projects',
      heading: 'Projects',
    },
    {
      id: 'contact',
      heading: 'Contact',
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <>
      <Page />
      <Menu sections={sections} />
    </>
  );
}

export default App;

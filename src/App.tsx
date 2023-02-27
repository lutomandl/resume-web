import Header from './components/Header';
import Menu from './components/Menu';
import Page from './components/Page';

function App() {
  // const { loading, data, error } = useRoutes();

  // if (error) {
  //   // eslint-disable-next-line no-console
  //   console.error(error);
  //   navigate('/error');
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const sections = [
    {
      id: '#about',
      heading: 'About',
    },
    {
      id: '#projects',
      heading: 'Projects',
    },
    {
      id: '#experience',
      heading: 'Experience',
    },
  ];

  return (
    <>
      <Page />
      <Menu sections={sections} />
    </>
  );
}

export default App;

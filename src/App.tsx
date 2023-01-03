import { useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <>
      <Header />
      {element}
    </>
  );
}

export default App;

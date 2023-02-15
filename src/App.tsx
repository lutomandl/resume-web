import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './components/Page';
// import routes from './routes';

function App() {
  return (
    <>
      <Menu />
      <Page />
    </>
  );
}

export default App;

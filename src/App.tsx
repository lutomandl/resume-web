import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './components/Page';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import Experience from './components/routes/Experience';
import Home from './components/routes/Home';
import Projects from './components/routes/Projects';
import RouteTransition from './components/RouteTransition';
import { useRoutes } from './graphql/queries';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, data, error } = useRoutes();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    navigate('/error');
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const routes = data?.routes?.data;

  const mapRouteToComponent = (route: string, heading: string) => {
    switch (route) {
      case 'about':
        return <About heading={heading} />;
      case 'projects':
        return <Projects heading={heading} />;
      case 'experience':
        return <Experience heading={heading} />;
      case 'contact':
        return <Contact heading={heading} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Menu routes={routes || null} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          {routes?.map(
            ({ attributes }) =>
              attributes && (
                <Route
                  key={attributes.pathName}
                  path={attributes.pathName}
                  element={mapRouteToComponent(
                    attributes.pathName,
                    attributes.heading
                  )}
                />
              )
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;

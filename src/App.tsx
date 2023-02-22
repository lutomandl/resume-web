import Menu from './components/Menu';
import Page from './components/Page';
import { useRoutes } from './graphql/queries';

function App() {
  const { loading, data, error } = useRoutes();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const routes = data?.routes?.data;

  return (
    <>
      <Menu routes={routes || null} />
      <Page />
    </>
  );
}

export default App;

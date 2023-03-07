import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Menu from './components/Menu';
import Page from './components/Page';
import { useStrapiContentContext } from './contexts/StrapiContentProvider';
import { HeadingEntity } from './graphql/schema';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  const { data, loading, error } = useStrapiContentContext();

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(loading);
    }, 2000);
  }, [loading]);

  if (error) {
    return <div>Something went wrong</div>;
  }

  return showLoader ? (
    <Loader />
  ) : (
    <>
      <Page />
      <Menu headings={(data?.headings?.data as HeadingEntity[]) || undefined} />
    </>
  );
}

export default App;

import Menu from './components/Menu';
import Page from './components/Page';
import { useTranslationsContext } from './contexts/TranslationsProvider';

function App() {
  const { translations } = useTranslationsContext();

  return (
    <>
      <Page />
      <Menu items={translations.menu} />
    </>
  );
}

export default App;

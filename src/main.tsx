import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TranslationsProvider from './contexts/TranslationsProvider';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TranslationsProvider>
      <App />
    </TranslationsProvider>
  </React.StrictMode>
);

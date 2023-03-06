import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GraphQlClientProvider from './contexts/GraphQlClientProvider';
import StrapiContentProvider from './contexts/StrapiContentProvider';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GraphQlClientProvider>
      <StrapiContentProvider>
        <App />
      </StrapiContentProvider>
    </GraphQlClientProvider>
  </React.StrictMode>
);

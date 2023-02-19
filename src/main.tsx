import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GraphQlClientProvider from './contexts/GraphQlClientProvider';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GraphQlClientProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GraphQlClientProvider>
  </React.StrictMode>
);

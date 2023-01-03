import { RouteObject } from 'react-router-dom';
import Page from './components/Page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Page />,
  },
];

export default routes;

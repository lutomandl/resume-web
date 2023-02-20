import { Outlet } from 'react-router-dom';

export default function Page() {
  return (
    <main className="page">
      <Outlet />
    </main>
  );
}

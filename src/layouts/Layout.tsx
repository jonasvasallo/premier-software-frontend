import Sidebar from './Sidebar';
import MenuBar from './MenuBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Sidebar />

      <div className="flex-1">
        <MenuBar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

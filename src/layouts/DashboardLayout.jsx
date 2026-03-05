import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Menu, Zap } from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="flex h-screen w-screen bg-blue-50 overflow-hidden">

      <aside className="w-64 bg-slate-900 border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="flex items-center justify-center rounded-xl bg-primary-600 p-2 w-8 h-8">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-200">CareerEngine</h4>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                  ? 'bg-slate-800 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <Icon className={`w-6 h-6 mr-3 ${isActive ? 'bg-slate-800' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-sm cursor-pointer">
              AL
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import React from 'react';
import { LayoutDashboard, Bell, MessageSquare, Users, Menu, X,User } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
     { id: 'profile', label: 'Profile', icon: User }, 
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`
    fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 shadow-md z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    lg:translate-x-0
  `}
>
  <div className="p-6 border-b border-gray-200">
    <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
    <p className="text-sm text-gray-600 mt-1">Management System</p>
  </div>

  <nav className="p-4">
    <ul className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <li key={item.id}>
            <button
              onClick={() => {
                onPageChange(item.id);
                if (window.innerWidth < 1024) onToggle(); // only close on mobile
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                ${isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
</aside>

    </>
  );
};

export default Sidebar;

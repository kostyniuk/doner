'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  logo?: React.ReactNode;
}

const Sidebar = ({ logo }: SidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/todos',
      label: 'Todos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      href: '/tags',
      label: 'Tags',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`${collapsed ? 'w-20' : 'w-64'} h-screen glass-surface sidebar-surface rounded-r-2xl overflow-hidden backdrop-blur-md flex flex-col transition-all duration-300`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Header */}
      <div className={`p-4 border-b border-white/10 ${collapsed ? 'flex flex-col items-center gap-2' : 'flex items-center justify-between'}`}>
        <div className={`flex items-center ${collapsed ? 'w-full justify-center' : 'gap-2'}`}>
          {logo && !collapsed && <div className="flex items-center">{logo}</div>}
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white leading-none">Doner</h2>
              {/* <p className="text-gray-300 text-xs mt-0.5">Task Management</p> */}
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Sidebar toggle hotspot"
          title="Sidebar"
          className="shrink-0 inline-flex items-center justify-center rounded-xl border border-white/10 text-white hover:bg-white/10 transition-colors w-10 h-10"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1ed760] text-black font-bold shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`${isActive ? 'text-black' : 'text-gray-300'}`}>
                  {item.icon}
                </div>
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="text-center text-gray-400 text-xs">
            <p>Built with Next.js</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

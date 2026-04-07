"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sliders,
  Bell,
  Map as MapIcon,
  Settings,
  LogOut,
  ShieldCheck,
  ClipboardList,
  Terminal,
  UserRound
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  const isOperator = pathname?.startsWith('/operator');
  const basePath = isOperator ? '/operator' : '/admin';
  const roleName = isOperator ? 'Operator' : 'Admin';
  const accentClass = isOperator ? 'text-accent-operator' : 'text-accent-admin';
  const bgClass = isOperator ? 'bg-accent-operator/10' : 'bg-accent-admin/10';

  const navItems = [
    { name: 'Overview', href: basePath, icon: LayoutDashboard },
    ...(!isOperator ? [{ name: 'Thresholds', href: '/admin/thresholds', icon: Sliders }] : []),
    { name: 'Live Map', href: `${basePath}/map`, icon: MapIcon },
    ...(!isOperator ? [{ name: 'Developer API', href: '/admin/api', icon: Terminal }] : []),
    ...(!isOperator ? [{ name: 'Audit Logs', href: `${basePath}/audit`, icon: ClipboardList }] : []),
    { name: 'Alert History', href: `${basePath}/alerts`, icon: Bell },
  ];

  return (
    <aside className="w-[280px] bg-surface-base/40 text-t-muted flex flex-col h-screen sticky top-0 border-r border-border-subtle backdrop-blur-xl z-50 transition-all duration-300">
      <div className="p-8 pb-6 flex items-center gap-4">
        <div className={`h-10 w-10 rounded-[10px] ${bgClass} flex items-center justify-center`}>
          {isOperator ? (
            <UserRound size={20} strokeWidth={2} className={accentClass} />
          ) : (
            <ShieldCheck size={20} strokeWidth={2} className={accentClass} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold tracking-wide text-t-pure">
            SCEMAS
          </span>
          <span className={`text-[0.65rem] ${accentClass} font-medium uppercase tracking-widest`}>
            {roleName}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="text-[0.6rem] uppercase tracking-[0.15em] font-medium text-t-faint ml-4 mb-4">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[0.8rem] font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? `bg-surface-glass text-t-pure shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] border border-border-highlight`
                  : `hover:bg-surface-glass hover:text-t-pure border border-transparent`
              }`}
            >
              <item.icon size={16} className={`${isActive ? accentClass : 'opacity-60'} transition-colors duration-300`} strokeWidth={2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 space-y-2 border-t border-border-subtle mx-4">
        <button className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[0.8rem] font-medium tracking-wide text-t-muted hover:bg-surface-glass hover:text-t-pure w-full transition-all duration-300 border border-transparent">
          <Settings size={16} className="opacity-60" strokeWidth={2} />
          Settings
        </button>
        <Link href="/" className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[0.8rem] font-medium tracking-wide text-t-muted hover:bg-red-500/10 hover:text-red-400 w-full transition-all duration-300 border border-transparent">
          <LogOut size={16} className="opacity-60" strokeWidth={2} />
          Log Out
        </Link>
      </div>

      <div className="p-6">
        <div className="glass-panel p-4 flex items-center justify-between">
          <p className="text-[0.65rem] uppercase tracking-[0.15em] font-medium text-t-muted">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[0.65rem] text-t-pure font-medium tracking-wide uppercase">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

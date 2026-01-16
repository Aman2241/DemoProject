import React from 'react';
import { LayoutDashboard, Wallet, PieChart, Target, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function NavItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                    ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "text-textMuted hover:bg-surfaceHover hover:text-textMain"
            )}
        >
            <Icon size={20} />
            <span>{label}</span>
            {active && (
                <div className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
            )}
        </button>
    );
}

export default function Sidebar({ activePage, onNavigate }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'budget', label: 'Budget', icon: Wallet },
        { id: 'investments', label: 'Investments', icon: PieChart },
        { id: 'goals', label: 'Goals', icon: Target },
    ];

    return (
        <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r border-border/50 bg-surface/30 backdrop-blur-xl">
            <div className="flex h-full flex-col p-6">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-700 shadow-lg shadow-primary/20">
                        <span className="text-xl font-bold text-white">R</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-textMain tracking-tight">Raj Finance</h1>
                        <p className="text-xs text-textMuted font-medium">Premium Finance</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <div key={item.id} className="relative">
                            <NavItem
                                {...item}
                                active={activePage === item.id}
                                onClick={() => onNavigate(item.id)}
                            />
                        </div>
                    ))}
                </nav>

                <div className="border-t border-border/50 pt-6 space-y-2">
                    <NavItem icon={Settings} label="Settings" onClick={() => onNavigate('settings')} />
                    <NavItem icon={LogOut} label="Logout" onClick={() => onNavigate('logout')} />
                </div>
            </div>
        </aside>
    );
}

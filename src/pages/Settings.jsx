import React from 'react';
import { Moon, Sun, Trash2, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';

export default function Settings({ theme, onToggleTheme, onReset }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
            <header>
                <h2 className="text-3xl font-bold text-textMain tracking-tight">Settings</h2>
                <p className="text-textMuted mt-1">Manage your preferences and data.</p>
            </header>

            {/* Appearance Section */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
                    <Sun size={20} className="text-primary" />
                    Appearance
                </h3>

                <div className="flex items-center justify-between p-4 bg-surfaceHover/50 rounded-xl border border-border/30">
                    <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-500'}`}>
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <p className="font-medium text-textMain">Theme Mode</p>
                            <p className="text-xs text-textMuted">Switch between dark and light mode</p>
                        </div>
                    </div>

                    <button
                        onClick={onToggleTheme}
                        className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            {/* General Settings */}
            <div className="glass-panel p-6 rounded-2xl space-y-2">
                <h3 className="text-lg font-bold text-textMain flex items-center gap-2 mb-4">
                    <Shield size={20} className="text-primary" />
                    General
                </h3>

                {[
                    { icon: Bell, label: 'Notifications', desc: 'Manage alerts and push notifications' },
                    { icon: Shield, label: 'Security', desc: 'Password and 2FA settings' },
                    { icon: HelpCircle, label: 'Help & Support', desc: 'FAQs and contact support' },
                ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-surfaceHover rounded-xl transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-surface/50 border border-border/50 flex items-center justify-center text-textMuted group-hover:text-textMain transition-colors">
                                <item.icon size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-textMain">{item.label}</p>
                                <p className="text-xs text-textMuted">{item.desc}</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-textMuted group-hover:text-textMain" />
                    </button>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 border-rose-500/20">
                <h3 className="text-lg font-bold text-textMain flex items-center gap-2 text-rose-500">
                    <Trash2 size={20} />
                    Danger Zone
                </h3>

                <div className="flex items-center justify-between p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                    <div>
                        <p className="font-medium text-textMain">Reset All Data</p>
                        <p className="text-xs text-textMuted">Clear all local storage and preferences. This cannot be undone.</p>
                    </div>
                    <button
                        onClick={onReset}
                        className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-rose-500/20"
                    >
                        Reset Data
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Sidebar from './layouts/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Investments from './pages/Investments';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

export default function App() {
    const [activePage, setActivePage] = useState('dashboard');
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all data? This is just a demo, so it will just reload the page.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const handleNavigate = (page) => {
        if (page === 'logout') {
            if (confirm('Are you sure you want to logout?')) {
                // Mock logout
                setActivePage('dashboard');
                alert('Logged out successfully!');
            }
            return;
        }
        setActivePage(page);
    };

    return (
        <div className="flex min-h-screen bg-background text-textMain font-sans selection:bg-primary/30 transition-colors duration-300">
            <Sidebar activePage={activePage} onNavigate={handleNavigate} />

            <main className="ml-64 flex-1 p-8">
                <div className="mx-auto max-w-7xl">
                    {activePage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
                    {activePage === 'transactions' && <Transactions onBack={() => handleNavigate('dashboard')} />}
                    {activePage === 'budget' && <Budget />}
                    {activePage === 'investments' && <Investments />}
                    {activePage === 'goals' && <Goals />}
                    {activePage === 'settings' && (
                        <Settings
                            theme={theme}
                            onToggleTheme={toggleTheme}
                            onReset={handleReset}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

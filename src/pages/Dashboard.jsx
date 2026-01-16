import React from 'react';
import { DollarSign, CreditCard, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';

const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4780 },
    { name: 'May', value: 5890 },
    { name: 'Jun', value: 6390 },
    { name: 'Jul', value: 8490 },
];

export default function Dashboard({ onNavigate }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-textMain tracking-tight">Financial Overview</h2>
                    <p className="text-textMuted mt-1">Track your wealth and spending.</p>
                </div>
                <button className="glass-button px-5 py-2.5 rounded-xl font-medium text-textMain shadow-lg shadow-primary/10">
                    + Add Transaction
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Balance" amount="₹24,593.00" change="12.5%" trend="up" icon={DollarSign} color="primary" />
                <StatCard title="Monthly Spending" amount="₹3,240.50" change="-2.4%" trend="down" icon={CreditCard} color="secondary" />
                <StatCard title="Investments" amount="₹12,850.00" change="8.2%" trend="up" icon={TrendingUp} color="accent" />
                <StatCard title="Savings Check" amount="₹8,502.50" change="5.1%" trend="up" icon={Activity} color="emerald-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col">
                    <h3 className="text-xl font-bold text-textMain mb-6">Balance History</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--text-main))' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-textMain">Recent Transactions</h3>
                        <button
                            onClick={() => onNavigate('transactions')}
                            className="text-sm text-primary hover:text-emerald-400"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-surfaceHover rounded-xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-surface/50 border border-border/50 flex items-center justify-center text-textMuted group-hover:text-white group-hover:bg-primary/20 transition-all">
                                        <DollarSign size={18} />
                                    </div>
                                    <div>
                                        <p className="text-textMain font-medium text-sm">Grocery Store</p>
                                        <p className="text-textMuted text-xs">Today, 2:45 PM</p>
                                    </div>
                                </div>
                                <span className="text-textMain font-medium">-₹120.50</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

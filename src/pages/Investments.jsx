import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 10500 },
    { name: 'Mar', value: 10200 },
    { name: 'Apr', value: 11000 },
    { name: 'May', value: 11400 },
    { name: 'Jun', value: 12000 },
    { name: 'Jul', value: 12850 },
];

const assets = [
    { name: 'S&P 500 ETF', type: 'Stock', value: 5400, change: 4.2 },
    { name: 'Bitcoin', type: 'Crypto', value: 2100, change: -1.5 },
    { name: 'Treasury Bonds', type: 'Bond', value: 3500, change: 0.5 },
    { name: 'Tech Growth Fund', type: 'Mutual Fund', value: 1850, change: 12.3 },
];

export default function Investments() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-textMain tracking-tight">Investments</h2>
                    <p className="text-textMuted mt-1">Track your portfolio performance.</p>
                </div>
                <button className="glass-button px-5 py-2.5 rounded-xl font-medium text-textMain">
                    <RefreshCw size={18} className="inline mr-2" />
                    Sync Accounts
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-textMain">Portfolio Growth</h3>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-textMain">₹12,850.00</p>
                            <p className="text-emerald-400 text-sm font-medium flex items-center justify-end gap-1">
                                <TrendingUp size={14} /> +8.2%
                            </p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} opacity={0.3} />
                                <XAxis dataKey="name" stroke="rgb(var(--text-muted))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgb(var(--text-muted))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--text-main))' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorInvest)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex flex-col">
                    <h3 className="text-xl font-bold text-textMain mb-6">Asset Allocation</h3>
                    <div className="flex-1 space-y-4">
                        {assets.map((asset, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-surfaceHover transition-colors cursor-pointer border border-transparent hover:border-border/30">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <Layers size={18} />
                                    </div>
                                    <div>
                                        <p className="text-textMain font-medium">{asset.name}</p>
                                        <p className="text-textMuted text-xs">{asset.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-textMain font-bold">₹{asset.value}</p>
                                    <p className={`text-xs font-medium ${asset.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {asset.change > 0 ? '+' : ''}{asset.change}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 w-full glass-button py-3 rounded-xl font-medium text-textMain">
                        View Detailed Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}

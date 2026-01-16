import React from 'react';
import { DollarSign, Search, Filter, ArrowLeft, Download } from 'lucide-react';

const transactions = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? 'Grocery Store' : 'Online Subscription',
    category: i % 2 === 0 ? 'Food' : 'Entertainment',
    date: 'Today, 2:45 PM',
    amount: i % 2 === 0 ? -120.50 : -14.99,
    status: 'Completed'
}));

export default function Transactions({ onBack }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="glass-button p-2.5 rounded-xl text-textMuted hover:text-textMain"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-textMain tracking-tight">Transactions</h2>
                        <p className="text-textMuted mt-1">View and manage all your transactions.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="glass-button px-4 py-2.5 rounded-xl font-medium text-textMain flex items-center gap-2">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="glass-button px-5 py-2.5 rounded-xl font-medium text-textMain shadow-lg shadow-primary/10">
                        + Add Transaction
                    </button>
                </div>
            </header>

            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={20} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="bg-surface/50 border border-border/50 text-textMain rounded-xl pl-10 pr-4 py-2.5 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <button className="glass-button px-4 py-2.5 rounded-xl font-medium text-textMain flex items-center gap-2">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <div className="space-y-2">
                    {transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 hover:bg-surfaceHover rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-border/30">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-surface/50 border border-border/50 flex items-center justify-center text-textMuted group-hover:text-white group-hover:bg-primary/20 transition-all">
                                    <DollarSign size={20} />
                                </div>
                                <div>
                                    <p className="text-textMain font-bold text-sm">{t.title}</p>
                                    <p className="text-textMuted text-xs">{t.date} • {t.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-bold block ${t.amount > 0 ? 'text-emerald-400' : 'text-textMain'}`}>
                                    {t.amount < 0 ? '-' : '+'}₹{Math.abs(t.amount).toFixed(2)}
                                </span>
                                <span className="text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                    {t.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

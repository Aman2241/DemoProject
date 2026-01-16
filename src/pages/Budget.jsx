import React, { useState } from 'react';
import { Wallet, TrendingDown, AlertCircle, Plus, Edit2, Trash2, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const initialCategories = [
    { id: 1, name: 'Housing', limit: 150000, spent: 120000, color: '#10b981' },
    { id: 2, name: 'Food & Dining', limit: 80000, spent: 60000, color: '#f59e0b' },
    { id: 3, name: 'Transportation', limit: 40000, spent: 30000, color: '#6366f1' },
    { id: 4, name: 'Entertainment', limit: 30000, spent: 20000, color: '#ec4899' },
];

export default function Budget() {
    const [categories, setCategories] = useState(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBudget, setCurrentBudget] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', limit: '', spent: '', color: '#10b981' });

    const openModal = (budget = null) => {
        if (budget) {
            setFormData({ name: budget.name, limit: budget.limit, spent: budget.spent, color: budget.color });
            setCurrentBudget(budget);
        } else {
            setFormData({ name: '', limit: '', spent: '', color: '#10b981' });
            setCurrentBudget(null);
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const limitInfo = parseFloat(formData.limit);
        const spentInfo = parseFloat(formData.spent);

        if (currentBudget) {
            // Update existing
            setCategories(categories.map(c => c.id === currentBudget.id ? { ...c, ...formData, limit: limitInfo, spent: spentInfo } : c));
        } else {
            // Add new
            const newBudget = {
                id: Date.now(),
                ...formData,
                limit: limitInfo,
                spent: spentInfo
            };
            setCategories([...categories, newBudget]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this budget category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const chartData = categories.map(c => ({ name: c.name, value: c.spent, color: c.color }));
    const totalBudget = categories.reduce((acc, curr) => acc + curr.limit, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-textMain tracking-tight">Monthly Budget</h2>
                    <p className="text-textMuted mt-1">Manage your spending limits.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="glass-button px-5 py-2.5 rounded-xl font-medium text-textMain shadow-lg shadow-primary/10"
                >
                    <Plus size={18} className="inline mr-2" />
                    New Budget
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="glass-panel p-6 rounded-2xl lg:col-span-1 flex flex-col items-center justify-center relative">
                    <h3 className="text-lg font-bold text-textMain w-full mb-4">Distribution</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))', borderRadius: '8px', color: 'rgb(var(--text-main))' }}
                                    itemStyle={{ color: 'rgb(var(--text-main))' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-textMuted text-sm">Total Budget</p>
                        <p className="text-3xl font-bold text-textMain">₹{totalBudget.toLocaleString()}</p>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-6">
                    <h3 className="text-lg font-bold text-textMain">Category Breakdown</h3>
                    <div className="space-y-6">
                        {categories.map((cat) => {
                            const percent = Math.min(100, (cat.spent / cat.limit) * 100);
                            return (
                                <div key={cat.id} className="space-y-2 group">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-medium text-textMain flex items-center gap-2">
                                                {cat.name}
                                                <button onClick={() => openModal(cat)} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-emerald-400">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(cat.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500 hover:text-rose-400">
                                                    <Trash2 size={14} />
                                                </button>
                                            </p>
                                            <p className="text-xs text-textMuted">{percent.toFixed(0)}% used</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-textMain">₹{cat.spent.toLocaleString()} <span className="text-textMuted text-sm font-normal">/ ₹{cat.limit.toLocaleString()}</span></p>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-surfaceHover rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percent}%`, backgroundColor: cat.color }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-panel p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 text-textMuted hover:text-textMain"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-textMain mb-6">
                            {currentBudget ? 'Edit Budget' : 'New Budget Category'}
                        </h3>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-textMuted mb-1">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-surfaceHover border border-border/50 rounded-xl px-4 py-2 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-textMuted mb-1">Limit (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-surfaceHover border border-border/50 rounded-xl px-4 py-2 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={formData.limit}
                                        onChange={e => setFormData({ ...formData, limit: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-textMuted mb-1">Spent (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-surfaceHover border border-border/50 rounded-xl px-4 py-2 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={formData.spent}
                                        onChange={e => setFormData({ ...formData, spent: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textMuted mb-2">Color Label</label>
                                <div className="flex gap-2">
                                    {['#10b981', '#f59e0b', '#6366f1', '#ec4899', '#ef4444', '#3b82f6'].map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color: c })}
                                            className={`h-8 w-8 rounded-full border-2 transition-all ${formData.color === c ? 'border-textMain scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full glass-button bg-primary/20 hover:bg-primary/30 text-primary font-bold py-3 rounded-xl mt-4"
                            >
                                Save Budget
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

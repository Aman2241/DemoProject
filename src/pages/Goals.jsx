import React from 'react';
import { Target, Plus, Trophy, Car, Home } from 'lucide-react';

const goals = [
    { id: 1, title: 'Emergency Fund', current: 8500, target: 10000, icon: Trophy, color: 'bg-emerald-400', date: 'Dec 2024' },
    { id: 2, title: 'New Car', current: 12000, target: 45000, icon: Car, color: 'bg-blue-500', date: 'Aug 2025' },
    { id: 3, title: 'House Down Payment', current: 45000, target: 100000, icon: Home, color: 'bg-purple-500', date: 'Jan 2027' },
];

export default function Goals() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-textMain tracking-tight">Financial Goals</h2>
                    <p className="text-textMuted mt-1">Dream big, plan smart.</p>
                </div>
                <button className="glass-button px-5 py-2.5 rounded-xl font-medium text-textMain shadow-lg shadow-primary/10">
                    <Plus size={18} className="inline mr-2" />
                    New Goal
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => {
                    const percentage = Math.min(100, (goal.current / goal.target) * 100);
                    const Icon = goal.icon;
                    return (
                        <div key={goal.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full group hover:bg-surfaceHover/50 transition-colors cursor-pointer border border-border/50 hover:border-border">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`h-12 w-12 rounded-2xl ${goal.color.replace('bg-', 'bg-')}/10 flex items-center justify-center ${goal.color.replace('bg-', 'text-')}`}>
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-textMuted bg-surface/50 px-2 py-1 rounded-full border border-border/30">
                                        Target: {goal.date}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-textMain mb-1">{goal.title}</h3>
                                <div className="flex justify-between items-end mb-4">
                                    <p className="text-2xl font-bold text-textMain">₹{goal.current.toLocaleString()}</p>
                                    <p className="text-sm text-textMuted mb-1">of ₹{goal.target.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-emerald-400">{percentage.toFixed(0)}% Achieved</span>
                                    <span className="text-textMuted">₹{(goal.target - goal.current).toLocaleString()} to go</span>
                                </div>
                                <div className="h-3 w-full bg-surfaceHover rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${goal.color} transition-all duration-1000 ease-out`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-textMuted hover:text-textMain hover:bg-surfaceHover border-2 border-dashed border-border/30 hover:border-primary/50 transition-all group h-[280px]">
                    <div className="h-16 w-16 rounded-full bg-surface/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Plus size={32} />
                    </div>
                    <p className="font-bold">Add New Goal</p>
                    <p className="text-sm opacity-70 mt-1">Start saving for something new</p>
                </button>
            </div>
        </div>
    );
}

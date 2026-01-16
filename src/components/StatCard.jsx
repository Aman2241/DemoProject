import React from 'react';

const colorVariants = {
    primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        glow: 'bg-primary'
    },
    secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        glow: 'bg-secondary'
    },
    accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        glow: 'bg-accent'
    },
    'emerald-400': {
        bg: 'bg-emerald-400/10',
        text: 'text-emerald-400',
        glow: 'bg-emerald-400'
    }
};

export default function StatCard({ title, amount, change, trend, icon: Icon, color }) {
    const isPositive = trend === 'up';
    const theme = colorVariants[color] || colorVariants.primary;

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300 ${theme.glow}`} />

            <div className="relative flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span>{isPositive ? '+' : ''}{change}</span>
                </div>
            </div>

            <div>
                <p className="text-textMuted text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-textMain tracking-tight">{amount}</h3>
            </div>
        </div>
    );
}

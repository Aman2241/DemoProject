/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background) / <alpha-value>)',
                surface: 'rgb(var(--surface) / <alpha-value>)',
                surfaceHover: 'rgb(var(--surface-hover) / <alpha-value>)',
                primary: '#10b981',   // Emerald 500 (kept constant for brand)
                secondary: '#f59e0b', // Amber 500
                accent: '#6366f1',    // Indigo 500
                textMain: 'rgb(var(--text-main) / <alpha-value>)',
                textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
                border: 'rgb(var(--border) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

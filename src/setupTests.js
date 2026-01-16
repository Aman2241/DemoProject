import '@testing-library/jest-dom';

// Polyfill for ResizeObserver which is used by Recharts
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

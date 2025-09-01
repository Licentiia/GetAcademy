import { state, CONSTANTS } from './model.js';

export function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
}

export function loadTheme() {
    const saved = localStorage.getItem(CONSTANTS.THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark' : 'light';
}

export function toggleTheme(render) {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(CONSTANTS.THEME_KEY, next);
    render && render(); // let controller update the button label
}

import { state, CONSTANTS } from './model.js';

export function save() {
    localStorage.setItem(
        CONSTANTS.STORAGE_KEY,
        JSON.stringify({ points: state.points, pointsPerClick: state.pointsPerClick })
    );
}

export function load() {
    try {
        const raw = localStorage.getItem(CONSTANTS.STORAGE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (typeof saved.points === 'number') state.points = saved.points;
        if (typeof saved.pointsPerClick === 'number') state.pointsPerClick = saved.pointsPerClick;
    } catch (e) {
        console.warn('Ignoring bad saved state:', e);
    }
}

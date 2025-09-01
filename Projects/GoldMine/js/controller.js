import { state } from './model.js';
import { load, save } from './storage.js';
import { applyTheme, loadTheme, toggleTheme } from './theme.js';
import { view } from './view.js';

const root = document.getElementById('root');

// ----- actions -----
function doClick() {
    state.points += state.pointsPerClick;
    save();
    render();
}
function buyUpgrade() {
    if (state.points < 10) return pushAlert('Not enough points!');
    state.points -= 10;
    state.pointsPerClick += 1;
    save();
    render();
}
function resetStats() {
    state.points = 0;
    state.pointsPerClick = 1;
    save();
    pushAlert('Stats reset');
}
function pushAlert(msg) {
    state.alertMsg = msg;
    state.alertOpen = true;
    render();
}
function closeAlert() {
    state.alertOpen = false;
    render();
}

// ----- render & events -----
export function render() {
    root.innerHTML = view(state);

    root.querySelector('#btnClick')?.addEventListener('click', doClick);
    root.querySelector('#btnUpgrade')?.addEventListener('click', buyUpgrade);
    root.querySelector('#btnHelp')?.addEventListener('click', () => pushAlert(
        'Get to 10 points, then buy an upgrade to boost your click power.'
    ));
    root.querySelector('#btnAlertOk')?.addEventListener('click', closeAlert);
    root.querySelector('#btnReset')?.addEventListener('click', resetStats);
    root.querySelector('#btnTheme')?.addEventListener('click', () => toggleTheme(render));
}

// ----- init -----
export function init() {
    load();
    applyTheme(loadTheme());
    render();
}

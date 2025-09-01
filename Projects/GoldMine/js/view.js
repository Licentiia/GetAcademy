export function view(s) {
    const canUpgrade = s.points >= 10;
    const needed = Math.max(0, 10 - s.points);

    return `
    <div id="topLeftPanel" data-tooltip="Tooltip text">
      <strong>Status</strong><br>
      Points: <span>${s.points}</span>
    </div>

    <h1>Points: ${s.points}</h1>

    <div class="row">
      <button id="btnClick">Click (+${s.pointsPerClick})</button>
      <button id="btnUpgrade" ${canUpgrade ? '' : 'disabled'}>Buy upgrade (10)</button>
    </div>

    <div class="row mt-8">
      <button id="btnHelp">Help</button>
      <button id="btnReset">Reset Stats</button>
      <button id="btnTheme" title="Toggle dark mode">
        ${s.theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
      </button>
    </div>

    <div id="customAlert" data-open="${s.alertOpen}">
      <div class="box">
        <p>${s.alertMsg}</p>
        <button id="btnAlertOk">Ok</button>
      </div>
    </div>

    <div class="muted mt-6">
      ${canUpgrade ? '' : `Need ${needed} more point${needed === 1 ? '' : 's'} to upgrade`}
    </div>
  `;
}

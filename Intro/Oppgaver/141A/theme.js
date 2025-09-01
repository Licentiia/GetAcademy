/**
 * Theme.js
 * 
 * Source: ChatGPT
 */
(function () {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") || "dark";
  }
  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    renderBtn();
  }
  function pickInitial() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return saved ?? (systemPrefersDark ? "dark" : "dark"); // default dark
  }

  let btn;
  function renderBtn() {
    if (!btn) return;
    const isDark = currentTheme() === "dark";
    btn.textContent = isDark ? "🌙 Dark" : "☀️ Light";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", "Toggle theme");
  }

  function ensureButton() {
    btn = document.getElementById("themeToggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "themeToggle";
      btn.className = "theme-toggle";
      btn.textContent = "🌙 Dark";
      document.body.appendChild(btn);
    }
    btn.addEventListener("click", () => {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  function syncWithOS() {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (localStorage.getItem(STORAGE_KEY)) return; // respect explicit choice
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      renderBtn();
    };
    // Safari older versions use addListener
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else if (mql.addListener) mql.addListener(handler);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    // set initial theme
    root.setAttribute("data-theme", pickInitial());
    // make sure the button exists and is wired
    ensureButton();
    renderBtn();
    syncWithOS();
  });
})();

/**
 * Theme Manager - Dark/Light Mode Toggle
 * PlannerTime Portal
 * Default theme: dark
 */

const ThemeManager = {
  STORAGE_KEY: 'plannertime-theme',
  DARK: 'dark',
  LIGHT: 'light',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    // Dark mode is the default; only switch to light if explicitly saved.
    this.set(saved === this.LIGHT ? this.LIGHT : this.DARK);
    this.bindToggles();
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleIcons();
  },

  toggle() {
    this.set(this.current === this.DARK ? this.LIGHT : this.DARK);
  },

  bindToggles() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  updateToggleIcons() {
    document.querySelectorAll('[data-theme-toggle] .material-symbols-outlined').forEach(icon => {
      icon.textContent = this.current === 'dark' ? 'light_mode' : 'dark_mode';
    });
  },

  get current() {
    return document.documentElement.getAttribute('data-theme') || this.DARK;
  }
};

ThemeManager.init();
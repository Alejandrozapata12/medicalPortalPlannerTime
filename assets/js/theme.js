const ThemeManager = {
  KEY: 'pt-theme',
  init() {
    const saved = localStorage.getItem(this.KEY);
    const preferred = saved || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    this.set(preferred);
    this.bindToggles();
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.KEY, theme);
    this.updateToggleIcons();
  },
  toggle() {
    this.set(this.current === 'dark' ? 'light' : 'dark');
  },
  bindToggles() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.removeEventListener('click', this._toggleBound);
      this._toggleBound = () => this.toggle();
      btn.addEventListener('click', this._toggleBound);
    });
  },
  updateToggleIcons() {
    document.querySelectorAll('[data-theme-toggle] .material-symbols-outlined').forEach(icon => {
      icon.textContent = this.current === 'dark' ? 'light_mode' : 'dark_mode';
    });
  },
  get current() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());

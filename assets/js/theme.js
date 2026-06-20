const ThemeManager = {
  STORAGE_KEY: 'plannertime-theme',
  DARK: 'dark',
  LIGHT: 'light',

  init() {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? this.DARK : this.LIGHT);
    this.setTheme(initialTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? this.DARK : this.LIGHT);
      }
    });
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Update toggle button if exists
    const toggleBtn = document.querySelector('[data-theme-toggle]');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = theme === this.DARK ? 'light_mode' : 'dark_mode';
      }
    }
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.setTheme(current === this.DARK ? this.LIGHT : this.DARK);
  },

  get current() {
    return document.documentElement.getAttribute('data-theme') || this.LIGHT;
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});
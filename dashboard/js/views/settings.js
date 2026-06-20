export default function() {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle" style="color: var(--text-secondary);">Manage your account preferences.</p>
      </div>
    </div>
    <div class="card" style="max-width: 600px;">
      <div class="card-body">
        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; color: var(--text-primary);">Appearance</h3>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-primary);">
          <div>
            <p style="font-weight: 500; color: var(--text-primary);">Dark Mode</p>
            <p style="font-size: 14px; color: var(--text-secondary);">Toggle between light and dark themes</p>
          </div>
          <button class="btn btn-secondary btn-sm" data-theme-toggle>
            <span class="material-symbols-outlined" style="font-size: 18px;">dark_mode</span>
            Toggle
          </button>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => ThemeManager.toggle());
  }
}
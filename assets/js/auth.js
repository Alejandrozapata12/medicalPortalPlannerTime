/**
 * Auth Forms Logic
 * PlannerTime Portal
 */

const AuthForms = {
  init() {
    this.setupPasswordToggles();
  },

  setupPasswordToggles() {
    document.querySelectorAll('[data-password-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const wrapper = btn.closest('.form-input-wrapper');
        if (!wrapper) return;

        const input = wrapper.querySelector('input');
        const icon = btn.querySelector('.material-symbols-outlined');

        if (!input || !icon) return;

        const isPassword = input.type === 'password';

        if (isPassword) {
          input.type = 'text';
          icon.textContent = 'visibility_off';
          icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        } else {
          input.type = 'password';
          icon.textContent = 'visibility';
          icon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        }

        input.focus();
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => AuthForms.init());
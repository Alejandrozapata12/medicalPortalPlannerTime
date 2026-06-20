const AuthForms = {
  init() {
    this.setupPasswordToggles();
    this.setupFormSubmissions();
  },

  setupPasswordToggles() {
    document.querySelectorAll('[data-password-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.form-input-wrapper')?.querySelector('input');
        const icon = btn.querySelector('.material-symbols-outlined');
        
        if (input && icon) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        }
      });
    });
  },

  setupFormSubmissions() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignup();
      });
    }

    // Reset password form
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
      resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleResetPassword();
      });
    }
  },

  handleLogin() {
    const btn = document.querySelector('#login-form .btn-primary');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `
      <span class="material-symbols-outlined animate-spin" style="font-size:20px">progress_activity</span>
      Signing in...
    `;
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      window.location.href = 'dashboard/index.html';
    }, 1500);
  },

  handleSignup() {
    const btn = document.querySelector('#signup-form .btn-primary');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `
      <span class="material-symbols-outlined animate-spin" style="font-size:20px">progress_activity</span>
      Creating account...
    `;
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      window.location.href = 'dashboard/index.html';
    }, 1500);
  },

  handleResetPassword() {
    const btn = document.querySelector('#reset-form .btn-primary');
    
    btn.innerHTML = `
      <span class="material-symbols-outlined animate-spin" style="font-size:20px">progress_activity</span>
      Sending...
    `;
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      btn.innerHTML = `
        <span class="material-symbols-outlined" style="font-size:20px">check_circle</span>
        Email Sent!
      `;
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
      
      setTimeout(() => {
        btn.innerHTML = originalText || 'Send Reset Link';
        btn.disabled = false;
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      }, 3000);
    }, 1500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthForms.init();
});
/**
 * Dashboard App - Main Entry Point
 * PlannerTime Portal
 */

const App = {
  init() {
    this.setupMobileMenu();
    this.setupRouter();
    this.setupThemeToggle();
  },

  setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (menuBtn && sidebar && overlay) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });

      // Close on nav item click (mobile)
      sidebar.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth < 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });
    }
  },

  setupRouter() {
    // Register routes
    router
      .register('/', {
        title: 'Dashboard',
        loader: () => import('./views/home.js').then(m => m.default()),
        init: () => import('./views/home.js').then(m => m.init?.())
      })
      .register('/appointments', {
        title: 'Appointments',
        loader: () => import('./views/appointments.js').then(m => m.default()),
        init: () => import('./views/appointments.js').then(m => m.init?.())
      })
      .register('/records', {
        title: 'Records',
        loader: () => import('./views/records.js').then(m => m.default()),
        init: () => import('./views/records.js').then(m => m.init?.())
      })
      .register('/messages', {
        title: 'Messages',
        loader: () => import('./views/messages.js').then(m => m.default()),
        init: () => import('./views/messages.js').then(m => m.init?.())
      })
      .register('/settings', {
        title: 'Settings',
        loader: () => import('./views/settings.js').then(m => m.default()),
        init: () => import('./views/settings.js').then(m => m.init?.())
      });

    // Initialize router
    router.init('app-content');

    // Setup nav click handlers
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(item.getAttribute('data-route'));
      });
    });
  },

  setupThemeToggle() {
    const toggleBtn = document.querySelector('[data-theme-toggle]');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        ThemeManager.toggle();
      });
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
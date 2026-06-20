/**
 * SPA Router - Simple hash-based routing
 * PlannerTime Portal Dashboard
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.container = null;
    this.onNavigate = null;
    
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  /**
   * Register a route
   * @param {string} path - Route path (e.g., '/' or '/appointments')
   * @param {Object} config - Route configuration
   * @param {Function} config.loader - Async function that returns HTML string
   * @param {Function} config.init - Optional init function after view loads
   * @param {string} config.title - Page title
   */
  register(path, config) {
    this.routes[path] = config;
    return this;
  }

  /**
   * Initialize router with container element
   * @param {string} containerId - ID of the content container
   */
  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Router: Container #${containerId} not found`);
      return;
    }
    
    // Handle initial route
    this.handleRoute();
  }

  /**
   * Navigate to a route
   * @param {string} path - Route path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Handle current hash route
   */
  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const route = this.routes[hash];

    if (!route) {
      // 404 - redirect to home
      this.navigate('/');
      return;
    }

    // Skip if same route
    if (this.currentRoute === hash) return;
    this.currentRoute = hash;

    // Update page title
    if (route.title) {
      document.title = `${route.title} - PlannerTime Portal`;
    }

    // Update active nav item
    this.updateActiveNav(hash);

    // Show loading state
    this.showLoading();

    try {
      // Load view content
      const html = await route.loader();
      
      // Render view
      this.container.innerHTML = `<div class="view-container">${html}</div>`;

      // Run init function if exists
      if (route.init) {
        route.init();
      }

      // Call onNavigate callback
      if (this.onNavigate) {
        this.onNavigate(hash);
      }
    } catch (error) {
      console.error('Router: Error loading view', error);
      this.showError();
    }
  }

  /**
   * Update active state in navigation
   */
  updateActiveNav(path) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const itemPath = item.getAttribute('data-route');
      if (itemPath === path) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.container.innerHTML = `
      <div class="flex-center" style="height: 300px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--text-tertiary); animation: spin 1s linear infinite;">progress_activity</span>
          <span style="color: var(--text-tertiary); font-size: 14px;">Loading...</span>
        </div>
      </div>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  }

  /**
   * Show error state
   */
  showError() {
    this.container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <span class="material-symbols-outlined">error</span>
        </div>
        <h3 class="empty-state-title">Something went wrong</h3>
        <p class="empty-state-description">Unable to load the requested page. Please try again.</p>
        <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
      </div>
    `;
  }
}

// Export singleton
const router = new Router();
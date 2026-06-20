/**
 * Utility Functions
 * PlannerTime Portal
 */

const Utils = {
  formatDate(date, options = {}) {
    const defaults = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaults, ...options });
  },

  formatTime(time) {
    const [h, m] = time.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    return (hr % 12 || 12) + ':' + m + ' ' + ampm;
  },

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  template(str, data) {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  },

  genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  },

  showToast(msg, type = 'info', duration = 3000) {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span class="material-symbols-outlined">' + (icons[type] || 'info') + '</span><span>' + msg + '</span>';
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
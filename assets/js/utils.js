const Utils = {
  fmtDate(d) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
  fmtTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    return (hr % 12 || 12) + ':' + m + ' ' + (hr >= 12 ? 'PM' : 'AM');
  },
  timeAgo(iso) {
    const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (s < 60) return 'Just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    if (s < 604800) return Math.floor(s / 86400) + 'd ago';
    return new Date(iso).toLocaleDateString();
  },
  debounce(fn, d = 300) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); };
  },
  openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    const firstInput = el.querySelector('input, button, select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
    document.body.style.overflow = 'hidden';
  },
  closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const trigger = document.querySelector(`[data-modal-trigger="${id}"]`);
    if (trigger) trigger.focus();
  },
  showConfirm(title, msg, onOk) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMsg').textContent = msg;
    document.getElementById('confirmOkBtn').onclick = () => { Utils.closeModal('confirmModal'); if (onOk) onOk(); };
    Utils.openModal('confirmModal');
  },
  showToast(msg, type = 'info', duration = 3000) {
    if (typeof notyf !== 'undefined') {
      const map = { success: 'success', error: 'error', warning: 'warning', info: 'info' };
      notyf[map[type] || 'open'](msg);
      return;
    }
    const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = '<span class="material-symbols-outlined">' + (icons[type] || 'info') + '</span><span>' + msg + '</span>';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  trapFocus(e, modalId) {
    const modal = document.getElementById(modalId);
    if (!modal || !modal.classList.contains('open')) return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') Utils.closeModal(modalId);
  }
};

document.addEventListener('keydown', (e) => {
  document.querySelectorAll('.modal-overlay.open').forEach(m => {
    Utils.trapFocus(e, m.id);
  });
});

export default function() {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">Medical Records</h1>
        <p class="page-subtitle" style="color: var(--text-secondary);">Access your health documents and lab results.</p>
      </div>
      <button class="btn btn-primary">
        <span class="material-symbols-outlined">upload</span>
        Upload Document
      </button>
    </div>
    <div class="empty-state">
      <div class="empty-state-icon">
        <span class="material-symbols-outlined">folder_open</span>
      </div>
      <h3 class="empty-state-title">No records yet</h3>
      <p class="empty-state-description">Your medical records will appear here once your healthcare provider uploads them.</p>
    </div>
  `;
}
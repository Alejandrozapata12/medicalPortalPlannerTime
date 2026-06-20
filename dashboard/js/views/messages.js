export default function() {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">Messages</h1>
        <p class="page-subtitle" style="color: var(--text-secondary);">Communicate with your healthcare team.</p>
      </div>
      <button class="btn btn-primary">
        <span class="material-symbols-outlined">edit</span>
        New Message
      </button>
    </div>
    <div class="empty-state">
      <div class="empty-state-icon">
        <span class="material-symbols-outlined">chat_bubble</span>
      </div>
      <h3 class="empty-state-title">No messages</h3>
      <p class="empty-state-description">Start a conversation with your doctor or healthcare provider.</p>
    </div>
  `;
}
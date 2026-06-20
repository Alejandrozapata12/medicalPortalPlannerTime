/**
 * Appointments View
 */

const appointmentsTemplate = `
  <div class="page-header">
    <div>
      <h1 class="page-title">My Appointments</h1>
      <p class="page-subtitle" style="color: var(--text-secondary);">View and manage your scheduled visits.</p>
    </div>
    <button class="btn btn-primary">
      <span class="material-symbols-outlined">add</span>
      Book New Appointment
    </button>
  </div>

  <!-- Tabs & Filters -->
  <div style="display: flex; flex-direction: column; gap: var(--space-6); margin-bottom: var(--space-6);">
    <div class="tabs">
      <a class="tab active" href="#">Upcoming</a>
      <a class="tab" href="#">History</a>
      <a class="tab" href="#">Canceled</a>
    </div>
    <div class="filter-bar">
      <div class="filter-input" style="flex: 1; max-width: 280px;">
        <span class="material-symbols-outlined">search</span>
        <input type="text" placeholder="Search doctor or specialty...">
      </div>
      <div class="filter-input" style="max-width: 200px;">
        <span class="material-symbols-outlined">calendar_month</span>
        <input type="text" placeholder="Filter by date">
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="card">
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="table-doctor">
                <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face');"></div>
                <div class="table-doctor-info">
                  <span class="table-doctor-name">Dr. Sarah Jenkins</span>
                  <span class="table-doctor-specialty-mobile">Cardiologist</span>
                </div>
              </div>
            </td>
            <td>Cardiologist</td>
            <td>
              <div class="table-date">
                <span class="table-date-time">Oct 24, 2023</span>
                <span class="table-date-date">10:00 AM</span>
              </div>
            </td>
            <td><span class="badge badge-primary"><span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Confirmed</span></td>
            <td class="table-actions">
              <button class="table-action-btn">
                <span class="material-symbols-outlined" style="font-size: 20px;">more_vert</span>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="table-doctor">
                <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&crop=face');"></div>
                <div class="table-doctor-info">
                  <span class="table-doctor-name">Dr. Mark Lee</span>
                  <span class="table-doctor-specialty-mobile">Dermatologist</span>
                </div>
              </div>
            </td>
            <td>Dermatologist</td>
            <td>
              <div class="table-date">
                <span class="table-date-time">Nov 05, 2023</span>
                <span class="table-date-date">02:30 PM</span>
              </div>
            </td>
            <td><span class="badge badge-warning"><span class="material-symbols-outlined" style="font-size: 14px;">schedule</span> Pending</span></td>
            <td class="table-actions">
              <button class="table-action-btn">
                <span class="material-symbols-outlined" style="font-size: 20px;">more_vert</span>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="table-doctor">
                <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=80&h=80&fit=crop&crop=face');"></div>
                <div class="table-doctor-info">
                  <span class="table-doctor-name">Dr. Emily Chen</span>
                  <span class="table-doctor-specialty-mobile">Pediatrician</span>
                </div>
              </div>
            </td>
            <td>Pediatrician</td>
            <td>
              <div class="table-date">
                <span class="table-date-time">Nov 12, 2023</span>
                <span class="table-date-date">09:15 AM</span>
              </div>
            </td>
            <td><span class="badge badge-primary"><span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Confirmed</span></td>
            <td class="table-actions">
              <button class="table-action-btn">
                <span class="material-symbols-outlined" style="font-size: 20px;">more_vert</span>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="table-doctor">
                <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=80&h=80&fit=crop&crop=face');"></div>
                <div class="table-doctor-info">
                  <span class="table-doctor-name">Dr. James Wilson</span>
                  <span class="table-doctor-specialty-mobile">Orthopedist</span>
                </div>
              </div>
            </td>
            <td>Orthopedist</td>
            <td>
              <div class="table-date">
                <span class="table-date-time">Nov 20, 2023</span>
                <span class="table-date-date">11:00 AM</span>
              </div>
            </td>
            <td><span class="badge badge-primary"><span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Confirmed</span></td>
            <td class="table-actions">
              <button class="table-action-btn">
                <span class="material-symbols-outlined" style="font-size: 20px;">more_vert</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-pagination">
      <p class="table-pagination-info">
        Showing <strong>1</strong> to <strong>4</strong> of <strong>4</strong> results
      </p>
      <div class="table-pagination-buttons">
        <button class="btn btn-sm btn-secondary" disabled>Previous</button>
        <button class="btn btn-sm btn-secondary" disabled>Next</button>
      </div>
    </div>
  </div>
`;

export default function() {
  return appointmentsTemplate;
}

export function init() {
  console.log('Appointments view initialized');
  
  // Setup tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}
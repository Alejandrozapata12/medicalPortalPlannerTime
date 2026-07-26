const DATA = {};

DATA.doctors = [
  { name: 'Dr. Richard Lee', specialty: 'Cardiologist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face' },
  { name: 'Dr. Mark Lee', specialty: 'Dermatologist', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Dr. Emily Chen', specialty: 'Pediatrician', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=80&h=80&fit=crop&crop=face' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedist', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=80&h=80&fit=crop&crop=face' }
];

DATA.specMap = {};
DATA.docAvatars = {};
DATA.doctors.forEach(d => {
  DATA.specMap[d.name] = d.specialty;
  DATA.docAvatars[d.name] = d.avatar;
});

DATA.genId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 6);

DATA.get = (k, def = []) => {
  try { return JSON.parse(localStorage.getItem('pt_' + k)) || def; } catch { return def; }
};

DATA.set = (k, v) => localStorage.setItem('pt_' + k, JSON.stringify(v));

DATA.initDefaults = () => {
  if (localStorage.getItem('pt_inited')) return;
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

  DATA.set('user', {
    firstName: 'Sarah', lastName: 'Connor',
    email: 'sarah.connor@email.com', phone: '(555) 123-4567',
    dob: '1985-06-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
  });

  DATA.set('appointments', [
    { id: 'a1', doctor: 'Dr. Richard Lee', specialty: 'Cardiologist', date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', notes: 'Follow-up checkup' },
    { id: 'a2', doctor: 'Dr. Mark Lee', specialty: 'Dermatologist', date: fmt(addDays(today, 5)), time: '14:30', status: 'pending', notes: '' },
    { id: 'a3', doctor: 'Dr. Emily Chen', specialty: 'Pediatrician', date: fmt(addDays(today, 12)), time: '09:15', status: 'confirmed', notes: '' },
    { id: 'a4', doctor: 'Dr. James Wilson', specialty: 'Orthopedist', date: fmt(addDays(today, 20)), time: '11:00', status: 'confirmed', notes: '' }
  ]);

  DATA.set('records', [
    { id: 'r1', type: 'Lab Results', title: 'Comprehensive Metabolic Panel', doctor: 'Dr. Richard Lee', date: fmt(addDays(today, -7)), notes: 'All values within normal range.' },
    { id: 'r2', type: 'Prescription', title: 'Atorvastatin 20mg', doctor: 'Dr. Richard Lee', date: fmt(addDays(today, -9)), notes: 'Take once daily with food.' },
    { id: 'r3', type: 'Imaging', title: 'Chest X-Ray', doctor: 'Heart Center', date: fmt(addDays(today, -15)), notes: '' },
    { id: 'r4', type: 'Clinical Note', title: 'Annual Physical Summary', doctor: 'Dr. Sarah Jenkins', date: fmt(addDays(today, -20)), notes: 'Patient in good health.' }
  ]);

  DATA.set('messages', [
    { id: 'm1', from: 'Dr. Richard Lee', subject: 'Lab Results Ready', body: 'Your lab results look great! Let\'s discuss them during our appointment tomorrow.', date: new Date(Date.now() - 7200000).toISOString(), read: false },
    { id: 'm2', from: 'Dr. Emily Chen', subject: 'Vaccination Schedule', body: 'I\'ve reviewed the vaccination schedule. Here are my recommendations.', date: new Date(Date.now() - 86400000).toISOString(), read: false },
    { id: 'm3', from: 'Dr. Sarah Jenkins', subject: 'Prescription Refill', body: 'The prescription refill has been processed and sent to your pharmacy.', date: new Date(Date.now() - 172800000).toISOString(), read: true },
    { id: 'm4', from: 'Support Team', subject: 'Welcome to PlannerTime', body: 'Your account has been verified successfully. Welcome!', date: new Date(Date.now() - 604800000).toISOString(), read: true }
  ]);

  DATA.set('medications', [
    { id: 'med1', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', prescribedBy: 'Dr. Richard Lee', startDate: fmt(addDays(today, -90)), endDate: '', refillsRemaining: 3, pharmacy: 'CVS Pharmacy', active: true },
    { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Richard Lee', startDate: fmt(addDays(today, -180)), endDate: '', refillsRemaining: 1, pharmacy: 'CVS Pharmacy', active: true },
    { id: 'med3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Sarah Jenkins', startDate: fmt(addDays(today, -60)), endDate: '', refillsRemaining: 5, pharmacy: 'Walgreens', active: true },
    { id: 'med4', name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', prescribedBy: 'Dr. Mark Lee', startDate: fmt(addDays(today, -30)), endDate: fmt(addDays(today, -5)), refillsRemaining: 0, pharmacy: 'CVS Pharmacy', active: false }
  ]);

  DATA.set('bills', [
    { id: 'b1', date: fmt(addDays(today, -5)), description: 'Office Visit - Dr. Richard Lee', amount: 150, status: 'pending' },
    { id: 'b2', date: fmt(addDays(today, -20)), description: 'Lab Work - Comprehensive Panel', amount: 320, status: 'paid', paidDate: fmt(addDays(today, -18)) },
    { id: 'b3', date: fmt(addDays(today, -45)), description: 'Annual Physical', amount: 200, status: 'paid', paidDate: fmt(addDays(today, -40)) },
    { id: 'b4', date: fmt(addDays(today, -60)), description: 'Prescription - Atorvastatin', amount: 25, status: 'paid', paidDate: fmt(addDays(today, -55)) }
  ]);

  DATA.set('conditions', [
    { id: 'c1', name: 'Hypertension', diagnosedDate: fmt(addDays(today, -365)), status: 'Managed', notes: 'Well-controlled with Lisinopril' },
    { id: 'c2', name: 'Hypercholesterolemia', diagnosedDate: fmt(addDays(today, -180)), status: 'Managed', notes: 'Responding well to Atorvastatin' },
    { id: 'c3', name: 'Type 2 Diabetes', diagnosedDate: fmt(addDays(today, -90)), status: 'Monitoring', notes: 'Recent diagnosis, monitoring blood glucose' }
  ]);

  DATA.set('allergies', [
    { id: 'al1', name: 'Penicillin', severity: 'Severe', reaction: 'Hives, difficulty breathing' },
    { id: 'al2', name: 'Sulfa Drugs', severity: 'Moderate', reaction: 'Skin rash' },
    { id: 'al3', name: 'Peanuts', severity: 'Mild', reaction: 'Minor itching' }
  ]);

  DATA.set('immunizations', [
    { id: 'im1', name: 'Influenza (Flu)', date: fmt(addDays(today, -60)), provider: 'CVS Pharmacy' },
    { id: 'im2', name: 'COVID-19 Booster', date: fmt(addDays(today, -120)), provider: 'PlannerTime Clinic' },
    { id: 'im3', name: 'Tdap (Tetanus)', date: fmt(addDays(today, -730)), provider: 'PlannerTime Clinic' },
    { id: 'im4', name: 'Hepatitis B', date: fmt(addDays(today, -1095)), provider: 'PlannerTime Clinic' }
  ]);

  DATA.set('notifications', [
    { id: 'n1', title: 'Appointment Reminder', desc: `You have an appointment with Dr. Richard Lee ${fmt(addDays(today, 1))} at 10:00 AM`, time: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: 'n2', title: 'Lab Results Available', desc: 'Your Comprehensive Metabolic Panel results are ready to view', time: new Date(Date.now() - 7200000).toISOString(), read: false },
    { id: 'n3', title: 'Prescription Refilled', desc: 'Atorvastatin 20mg has been sent to CVS Pharmacy', time: new Date(Date.now() - 86400000).toISOString(), read: true }
  ]);

  localStorage.setItem('pt_inited', '1');
};

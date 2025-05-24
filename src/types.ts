export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredReminder: 'sms' | 'email' | 'whatsapp' | 'call';
  lastAppointment: string | null;
  active: boolean;
}

export interface ReminderStatus {
  sms: boolean;
  email: boolean;
  whatsapp: boolean;
  call: boolean;
}

export interface Appointment {
  id: string;
  patient: Patient;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  reminderStatus: ReminderStatus;
}
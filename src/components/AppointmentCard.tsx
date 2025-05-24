import React from 'react';
import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import './AppointmentCard.css';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onReminderSend: (id: string, type: 'sms' | 'email' | 'whatsapp' | 'call') => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onReminderSend }) => {
  const { id, patient, time, date, status, reminderStatus, type } = appointment;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusClass = () => {
    switch (status) {
      case 'confirmed': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-danger';
      case 'completed': return 'badge-info';
      default: return '';
    }
  };
  
  return (
    <div className="appointment-card card">
      <div className="appointment-header">
        <div className="appointment-info">
          <h3>{patient.name}</h3>
          <div className="appointment-details">
            <span className="appointment-date">
              <Clock size={14} />
              {formatDate(date)} at {time}
            </span>
            <span className={`appointment-status badge ${getStatusClass()}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="appointment-type">
              {type}
            </span>
          </div>
        </div>
        <div className="patient-avatar">
          {patient.name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      <div className="reminder-status">
        <div className="reminder-label">Reminder Status:</div>
        <div className="reminder-badges">
          <span className={`reminder-badge ${reminderStatus.sms ? 'sent' : 'pending'}`}>
            SMS
          </span>
          <span className={`reminder-badge ${reminderStatus.email ? 'sent' : 'pending'}`}>
            Email
          </span>
          <span className={`reminder-badge ${reminderStatus.whatsapp ? 'sent' : 'pending'}`}>
            WhatsApp
          </span>
          <span className={`reminder-badge ${reminderStatus.call ? 'sent' : 'pending'}`}>
            Call
          </span>
        </div>
      </div>
      
      <div className="card-actions">
        <button 
          className="btn-outline" 
          onClick={() => onReminderSend(id, 'sms')}
          disabled={reminderStatus.sms}
        >
          <MessageSquare size={16} />
          SMS
        </button>
        <button 
          className="btn-outline" 
          onClick={() => onReminderSend(id, 'email')}
          disabled={reminderStatus.email}
        >
          <Mail size={16} />
          Email
        </button>
        <button 
          className="btn-outline" 
          onClick={() => onReminderSend(id, 'whatsapp')}
          disabled={reminderStatus.whatsapp}
        >
          <MessageSquare size={16} />
          WhatsApp
        </button>
        <button 
          className="btn-outline" 
          onClick={() => onReminderSend(id, 'call')}
          disabled={reminderStatus.call}
        >
          <Phone size={16} />
          Call
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
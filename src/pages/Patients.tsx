import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Mail, Phone, MessageSquare } from 'lucide-react';
import './Patients.css';
import { useAppointment } from '../context/AppointmentContext';

const Patients: React.FC = () => {
  const { patients } = useAppointment();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );
  
  return (
    <div className="patients-container">
      <div className="page-header">
        <h1>Patients</h1>
        <button className="btn btn-primary">
          <UserPlus size={16} />
          Add Patient
        </button>
      </div>
      
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search patients by name, email, or phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="patients-table-container">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Contact</th>
              <th>Preferred Reminder</th>
              <th>Last Appointment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td className="patient-cell">
                  <div className="patient-avatar">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="patient-info">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-id">ID: {patient.id}</div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={14} />
                      <span>{patient.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={14} />
                      <span>{patient.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="reminder-preference">
                    <span className="preference-icon">
                      {patient.preferredReminder === 'email' && <Mail size={16} />}
                      {patient.preferredReminder === 'sms' && <MessageSquare size={16} />}
                      {patient.preferredReminder === 'whatsapp' && <MessageSquare size={16} />}
                      {patient.preferredReminder === 'call' && <Phone size={16} />}
                    </span>
                    <span className="preference-text">
                      {patient.preferredReminder.charAt(0).toUpperCase() + patient.preferredReminder.slice(1)}
                    </span>
                  </div>
                </td>
                <td>
                  {patient.lastAppointment ? (
                    <div className="appointment-date">
                      {new Date(patient.lastAppointment).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  ) : (
                    <span className="no-appointment">No appointments</span>
                  )}
                </td>
                <td>
                  <span className={`patient-status ${patient.active ? 'active' : 'inactive'}`}>
                    {patient.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="action-button">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPatients.length === 0 && (
          <div className="empty-state">
            <h3>No patients found</h3>
            <p>Try adjusting your search or add a new patient.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
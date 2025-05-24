import React, { useState } from 'react';
import { X } from 'lucide-react';
import './Modal.css';
import { Patient } from '../types';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: any) => void;
  patients: Patient[];
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  patients
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'Follow-up',
    notes: '',
    reminderTypes: {
      sms: true,
      email: true,
      whatsapp: false,
      call: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleReminderTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      reminderTypes: {
        ...formData.reminderTypes,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      patientId: '',
      date: '',
      time: '',
      type: 'Follow-up',
      notes: '',
      reminderTypes: {
        sms: true,
        email: true,
        whatsapp: false,
        call: false
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Schedule New Appointment</h2>
          <button className="close-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="patientId" className="form-label">Patient</label>
              <select
                id="patientId"
                name="patientId"
                className="form-control"
                value={formData.patientId}
                onChange={handleChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="form-control"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="type" className="form-label">Appointment Type</label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Follow-up">Follow-up</option>
                <option value="Check-up">Check-up</option>
                <option value="Consultation">Consultation</option>
                <option value="Treatment">Treatment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes" className="form-label">Notes</label>
              <textarea
                id="notes"
                name="notes"
                className="form-control"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">Reminder Methods</label>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="sms"
                    name="sms"
                    checked={formData.reminderTypes.sms}
                    onChange={handleReminderTypeChange}
                  />
                  <label htmlFor="sms">SMS</label>
                </div>
                
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="email"
                    name="email"
                    checked={formData.reminderTypes.email}
                    onChange={handleReminderTypeChange}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    name="whatsapp"
                    checked={formData.reminderTypes.whatsapp}
                    onChange={handleReminderTypeChange}
                  />
                  <label htmlFor="whatsapp">WhatsApp</label>
                </div>
                
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="call"
                    name="call"
                    checked={formData.reminderTypes.call}
                    onChange={handleReminderTypeChange}
                  />
                  <label htmlFor="call">Voice Call</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
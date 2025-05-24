import React, { useState } from 'react';
import { Plus, Search, Calendar, Filter, ChevronDown } from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';
import AddAppointmentModal from '../components/AddAppointmentModal';
import './Appointments.css';
import { useAppointment } from '../context/AppointmentContext';

const Appointments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { appointments, patients, addAppointment, sendReminder } = useAppointment();
  
  const filteredAppointments = appointments.filter(appointment => {
    // Text search
    const patientNameMatch = appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'all' || appointment.status === statusFilter;
    
    // Date range filter
    let dateMatch = true;
    if (dateRange.start && dateRange.end) {
      const appointmentDate = new Date(appointment.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of the day
      
      dateMatch = appointmentDate >= startDate && appointmentDate <= endDate;
    }
    
    return patientNameMatch && statusMatch && dateMatch;
  });
  
  const handleAddAppointment = (appointmentData: any) => {
    // Generate a unique ID for the new appointment
    const newAppointment = {
      id: Date.now().toString(),
      patient: patients.find(p => p.id === appointmentData.patientId) || patients[0],
      date: appointmentData.date,
      time: appointmentData.time,
      type: appointmentData.type,
      notes: appointmentData.notes,
      status: 'pending',
      reminderStatus: {
        sms: false,
        email: false,
        whatsapp: false,
        call: false
      }
    };
    
    addAppointment(newAppointment);
  };
  
  const handleReminderSend = (id: string, type: 'sms' | 'email' | 'whatsapp' | 'call') => {
    sendReminder(id, type);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRange({ start: '', end: '' });
  };
  
  return (
    <div className="appointments-container">
      <div className="page-header">
        <h1>Appointments</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          New Appointment
        </button>
      </div>
      
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search patients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className="filter-toggle-btn" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          Filters
          <ChevronDown size={16} className={`chevron ${showFilters ? 'rotate' : ''}`} />
        </button>
      </div>
      
      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range">
              <input 
                type="date" 
                className="form-control" 
                placeholder="From"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
              <span className="date-separator">to</span>
              <input 
                type="date" 
                className="form-control" 
                placeholder="To"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
          
          <button className="btn btn-outline" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
      
      <div className="appointments-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment}
              onReminderSend={handleReminderSend}
            />
          ))
        ) : (
          <div className="empty-state">
            <Calendar size={48} className="empty-icon" />
            <h3>No appointments found</h3>
            <p>Try adjusting your filters or create a new appointment.</p>
          </div>
        )}
      </div>
      
      <AddAppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAppointment}
        patients={patients}
      />
    </div>
  );
};

export default Appointments;
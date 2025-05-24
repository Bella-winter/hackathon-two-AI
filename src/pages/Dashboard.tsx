import React, { useState } from 'react';
import { CalendarClock, Users, CheckCircle, Calendar, Clock, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import './Dashboard.css';
import AppointmentCard from '../components/AppointmentCard';
import { useAppointment } from '../context/AppointmentContext';
import { Appointment } from '../types';

const Dashboard: React.FC = () => {
  const { appointments, sendReminder } = useAppointment();
  const [filter, setFilter] = useState('today');
  
  const stats = {
    todayAppointments: 8,
    upcomingAppointments: 23,
    completedToday: 5,
    remindersSent: 17,
    reminderDelivery: 96
  };
  
  const handleReminderSend = (id: string, type: 'sms' | 'email' | 'whatsapp' | 'call') => {
    sendReminder(id, type);
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case 'today':
        return appointment.date === today;
      case 'upcoming':
        return new Date(appointment.date) > new Date(today);
      case 'overdue':
        return new Date(appointment.date) < new Date(today) && appointment.status !== 'completed';
      default:
        return true;
    }
  });
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CalendarClock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-title">Today's Appointments</p>
            <h3 className="stat-value">{stats.todayAppointments}</h3>
            <p className="stat-trend up">
              <ArrowUp size={14} />
              <span>12% from yesterday</span>
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-title">Upcoming Appointments</p>
            <h3 className="stat-value">{stats.upcomingAppointments}</h3>
            <p className="stat-trend up">
              <ArrowUp size={14} />
              <span>8% from last week</span>
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-title">Completed Today</p>
            <h3 className="stat-value">{stats.completedToday}</h3>
            <p className="stat-trend down">
              <ArrowDown size={14} />
              <span>3% from yesterday</span>
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-title">Reminder Delivery Rate</p>
            <h3 className="stat-value">{stats.reminderDelivery}%</h3>
            <p className="stat-trend up">
              <ArrowUp size={14} />
              <span>2% from last week</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="appointments-section">
        <div className="section-header">
          <h2>Appointments</h2>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'today' ? 'active' : ''}`}
              onClick={() => setFilter('today')}
            >
              Today
            </button>
            <button 
              className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`filter-tab ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
          </div>
        </div>
        
        <div className="appointments-grid">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment}
                onReminderSend={handleReminderSend}
              />
            ))
          ) : (
            <div className="empty-state">
              <Clock size={48} className="empty-icon" />
              <h3>No appointments found</h3>
              <p>There are no {filter} appointments to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
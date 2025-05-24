import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment, Patient } from '../types';
import { toast } from 'react-hot-toast';

interface AppointmentContextType {
  appointments: Appointment[];
  patients: Patient[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  sendReminder: (id: string, type: 'sms' | 'email' | 'whatsapp' | 'call') => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  // Demo data for patients
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 123-4567',
      preferredReminder: 'sms',
      lastAppointment: '2025-06-10',
      active: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'mrodriguez@example.com',
      phone: '(555) 234-5678',
      preferredReminder: 'email',
      lastAppointment: '2025-06-05',
      active: true
    },
    {
      id: '3',
      name: 'Emily Chen',
      email: 'echen@example.com',
      phone: '(555) 345-6789',
      preferredReminder: 'whatsapp',
      lastAppointment: '2025-06-12',
      active: true
    },
    {
      id: '4',
      name: 'David Williams',
      email: 'dwilliams@example.com',
      phone: '(555) 456-7890',
      preferredReminder: 'call',
      lastAppointment: '2025-05-28',
      active: true
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      email: 'jtaylor@example.com',
      phone: '(555) 567-8901',
      preferredReminder: 'sms',
      lastAppointment: null,
      active: false
    }
  ]);
  
  // Demo data for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patient: patients[0],
      date: '2025-06-15',
      time: '10:30',
      type: 'Follow-up',
      status: 'confirmed',
      notes: 'Review lab results from previous visit',
      reminderStatus: {
        sms: true,
        email: true,
        whatsapp: false,
        call: false
      }
    },
    {
      id: '2',
      patient: patients[1],
      date: '2025-06-15',
      time: '11:45',
      type: 'Consultation',
      status: 'pending',
      notes: 'New patient consultation for chronic pain',
      reminderStatus: {
        sms: true,
        email: false,
        whatsapp: false,
        call: false
      }
    },
    {
      id: '3',
      patient: patients[2],
      date: '2025-06-15',
      time: '14:15',
      type: 'Check-up',
      status: 'confirmed',
      notes: 'Annual check-up, bring previous records',
      reminderStatus: {
        sms: false,
        email: true,
        whatsapp: true,
        call: false
      }
    },
    {
      id: '4',
      patient: patients[3],
      date: '2025-06-16',
      time: '09:00',
      type: 'Treatment',
      status: 'confirmed',
      notes: 'Third session of physical therapy',
      reminderStatus: {
        sms: false,
        email: false,
        whatsapp: false,
        call: false
      }
    },
    {
      id: '5',
      patient: patients[0],
      date: '2025-06-22',
      time: '15:30',
      type: 'Follow-up',
      status: 'pending',
      notes: 'Follow-up for medication adjustment',
      reminderStatus: {
        sms: false,
        email: false,
        whatsapp: false,
        call: false
      }
    }
  ]);
  
  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
    toast.success('Appointment scheduled successfully!');
  };
  
  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
    toast.success('Appointment updated successfully!');
  };
  
  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appointment deleted successfully!');
  };
  
  const sendReminder = (id: string, type: 'sms' | 'email' | 'whatsapp' | 'call') => {
    // In a real app, this would call an API to send the reminder
    setAppointments(
      appointments.map(appointment => {
        if (appointment.id === id) {
          return {
            ...appointment,
            reminderStatus: {
              ...appointment.reminderStatus,
              [type]: true
            }
          };
        }
        return appointment;
      })
    );
    
    // Show success toast
    const reminderTypes = {
      sms: 'SMS',
      email: 'Email',
      whatsapp: 'WhatsApp',
      call: 'Voice Call'
    };
    
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
      toast.success(`${reminderTypes[type]} reminder sent to ${appointment.patient.name}!`);
    }
  };
  
  const value = {
    appointments,
    patients,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    sendReminder
  };
  
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
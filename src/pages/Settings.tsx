import React, { useState } from 'react';
import { Save, BellRing, MessageSquare, Mail, Phone, Clock, ShieldCheck, Zap, X } from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reminders');
  const [reminderSettings, setReminderSettings] = useState({
    defaultReminders: {
      sms: true,
      email: true,
      whatsapp: false,
      call: false
    },
    reminderTiming: [
      { id: 1, value: 24, unit: 'hours', enabled: true },
      { id: 2, value: 1, unit: 'hours', enabled: true }
    ],
    reminderTemplates: {
      sms: "Hi [PATIENT_NAME], this is a reminder for your appointment with [DOCTOR_NAME] on [DATE] at [TIME]. Reply YES to confirm or call [PHONE] to reschedule.",
      email: "<p>Dear [PATIENT_NAME],</p><p>This is a friendly reminder about your upcoming appointment:</p><p><strong>Doctor:</strong> [DOCTOR_NAME]<br><strong>Date:</strong> [DATE]<br><strong>Time:</strong> [TIME]</p><p>Please arrive 10 minutes early to complete any necessary paperwork.</p><p>To confirm, please click the button below or reply to this email.</p><p>If you need to reschedule, please call us at [PHONE].</p><p>Best regards,<br>[CLINIC_NAME] Team</p>",
      whatsapp: "Hello [PATIENT_NAME], this is a reminder for your appointment with [DOCTOR_NAME] on [DATE] at [TIME]. Reply YES to confirm or call [PHONE] to reschedule.",
      call: "Hello, this is [CLINIC_NAME] calling to remind [PATIENT_NAME] about an appointment with [DOCTOR_NAME] on [DATE] at [TIME]. Please press 1 to confirm or 2 to speak with a staff member to reschedule."
    }
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    twilioEnabled: true,
    twilioSettings: {
      accountSid: "AC*****************",
      authToken: "****************************",
      phoneNumber: "+1234567890"
    },
    whatsappEnabled: false,
    whatsappSettings: {
      apiKey: "",
      templateName: ""
    }
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    dataRetention: 24,
    dataRetentionUnit: 'months',
    encryptData: true,
    requireTwoFactor: false,
    auditLogging: true
  });
  
  const handleReminderTimingAdd = () => {
    const newId = reminderSettings.reminderTiming.length > 0 
      ? Math.max(...reminderSettings.reminderTiming.map(item => item.id)) + 1 
      : 1;
      
    setReminderSettings({
      ...reminderSettings,
      reminderTiming: [
        ...reminderSettings.reminderTiming,
        { id: newId, value: 1, unit: 'hours', enabled: true }
      ]
    });
  };
  
  const handleReminderTimingRemove = (id: number) => {
    setReminderSettings({
      ...reminderSettings,
      reminderTiming: reminderSettings.reminderTiming.filter(item => item.id !== id)
    });
  };
  
  const handleReminderTimingChange = (id: number, field: string, value: any) => {
    setReminderSettings({
      ...reminderSettings,
      reminderTiming: reminderSettings.reminderTiming.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };
  
  const handleDefaultReminderChange = (type: string, checked: boolean) => {
    setReminderSettings({
      ...reminderSettings,
      defaultReminders: {
        ...reminderSettings.defaultReminders,
        [type]: checked
      }
    });
  };
  
  const handleTemplateChange = (type: string, value: string) => {
    setReminderSettings({
      ...reminderSettings,
      reminderTemplates: {
        ...reminderSettings.reminderTemplates,
        [type]: value
      }
    });
  };
  
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-layout">
        <div className="settings-sidebar">
          <ul className="settings-nav">
            <li>
              <button 
                className={activeTab === 'reminders' ? 'active' : ''} 
                onClick={() => setActiveTab('reminders')}
              >
                <BellRing size={18} />
                Reminder Settings
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'integrations' ? 'active' : ''} 
                onClick={() => setActiveTab('integrations')}
              >
                <Zap size={18} />
                Integrations
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'security' ? 'active' : ''} 
                onClick={() => setActiveTab('security')}
              >
                <ShieldCheck size={18} />
                Security & Privacy
              </button>
            </li>
          </ul>
        </div>
        
        <div className="settings-content">
          {activeTab === 'reminders' && (
            <div className="settings-panel">
              <div className="settings-header">
                <h2>Reminder Settings</h2>
                <button className="btn btn-primary">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
              
              <div className="settings-section">
                <h3>Default Reminder Methods</h3>
                <p className="settings-description">
                  Select which reminder methods will be enabled by default for new appointments.
                </p>
                
                <div className="checkbox-grid">
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="default-sms" 
                      checked={reminderSettings.defaultReminders.sms}
                      onChange={(e) => handleDefaultReminderChange('sms', e.target.checked)}
                    />
                    <label htmlFor="default-sms">
                      <MessageSquare size={16} />
                      SMS
                    </label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="default-email" 
                      checked={reminderSettings.defaultReminders.email}
                      onChange={(e) => handleDefaultReminderChange('email', e.target.checked)}
                    />
                    <label htmlFor="default-email">
                      <Mail size={16} />
                      Email
                    </label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="default-whatsapp" 
                      checked={reminderSettings.defaultReminders.whatsapp}
                      onChange={(e) => handleDefaultReminderChange('whatsapp', e.target.checked)}
                    />
                    <label htmlFor="default-whatsapp">
                      <MessageSquare size={16} />
                      WhatsApp
                    </label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="default-call" 
                      checked={reminderSettings.defaultReminders.call}
                      onChange={(e) => handleDefaultReminderChange('call', e.target.checked)}
                    />
                    <label htmlFor="default-call">
                      <Phone size={16} />
                      Voice Call
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Reminder Timing</h3>
                <p className="settings-description">
                  Configure when reminders should be sent before appointments.
                </p>
                
                <div className="reminder-timing-list">
                  {reminderSettings.reminderTiming.map((item) => (
                    <div key={item.id} className="reminder-timing-item">
                      <div className="timing-enabled">
                        <input 
                          type="checkbox" 
                          checked={item.enabled}
                          onChange={(e) => handleReminderTimingChange(item.id, 'enabled', e.target.checked)}
                        />
                      </div>
                      
                      <div className="timing-value">
                        <input 
                          type="number" 
                          min="1" 
                          max="72" 
                          value={item.value}
                          onChange={(e) => handleReminderTimingChange(item.id, 'value', parseInt(e.target.value))}
                          className="form-control"
                        />
                      </div>
                      
                      <div className="timing-unit">
                        <select 
                          value={item.unit}
                          onChange={(e) => handleReminderTimingChange(item.id, 'unit', e.target.value)}
                          className="form-control"
                        >
                          <option value="minutes">Minutes</option>
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                      
                      <div className="timing-label">
                        before appointment
                      </div>
                      
                      <button 
                        className="timing-remove" 
                        onClick={() => handleReminderTimingRemove(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <button className="add-timing-btn" onClick={handleReminderTimingAdd}>
                    + Add Timing
                  </button>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Reminder Templates</h3>
                <p className="settings-description">
                  Customize message templates for each reminder type.
                  You can use the following placeholders: [PATIENT_NAME], [DOCTOR_NAME], [DATE], [TIME], [CLINIC_NAME], [PHONE].
                </p>
                
                <div className="template-tabs">
                  <button className="template-tab active">SMS</button>
                  <button className="template-tab">Email</button>
                  <button className="template-tab">WhatsApp</button>
                  <button className="template-tab">Voice Call</button>
                </div>
                
                <div className="template-editor">
                  <textarea 
                    className="form-control template-textarea"
                    value={reminderSettings.reminderTemplates.sms}
                    onChange={(e) => handleTemplateChange('sms', e.target.value)}
                    rows={5}
                  ></textarea>
                  
                  <div className="template-preview">
                    <h4>Preview</h4>
                    <div className="preview-message">
                      <div className="preview-bubble">
                        {reminderSettings.reminderTemplates.sms
                          .replace('[PATIENT_NAME]', 'John Smith')
                          .replace('[DOCTOR_NAME]', 'Dr. Williams')
                          .replace('[DATE]', 'Jun 15, 2025')
                          .replace('[TIME]', '10:30 AM')
                          .replace('[CLINIC_NAME]', 'City Health Clinic')
                          .replace('[PHONE]', '(555) 123-4567')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="settings-panel">
              <div className="settings-header">
                <h2>Integrations</h2>
                <button className="btn btn-primary">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
              
              <div className="settings-section">
                <div className="integration-card">
                  <div className="integration-header">
                    <div className="integration-icon twilio-icon">
                      <Phone size={24} />
                    </div>
                    <div className="integration-info">
                      <h3>Twilio</h3>
                      <p>Send SMS and make voice calls</p>
                    </div>
                    <div className="integration-toggle">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={integrationSettings.twilioEnabled}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            twilioEnabled: e.target.checked
                          })}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  {integrationSettings.twilioEnabled && (
                    <div className="integration-form">
                      <div className="form-group">
                        <label className="form-label">Account SID</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={integrationSettings.twilioSettings.accountSid}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            twilioSettings: {
                              ...integrationSettings.twilioSettings,
                              accountSid: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Auth Token</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          value={integrationSettings.twilioSettings.authToken}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            twilioSettings: {
                              ...integrationSettings.twilioSettings,
                              authToken: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={integrationSettings.twilioSettings.phoneNumber}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            twilioSettings: {
                              ...integrationSettings.twilioSettings,
                              phoneNumber: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <button className="btn btn-outline">Test Connection</button>
                    </div>
                  )}
                </div>
                
                <div className="integration-card">
                  <div className="integration-header">
                    <div className="integration-icon whatsapp-icon">
                      <MessageSquare size={24} />
                    </div>
                    <div className="integration-info">
                      <h3>WhatsApp Business API</h3>
                      <p>Send appointment reminders via WhatsApp</p>
                    </div>
                    <div className="integration-toggle">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={integrationSettings.whatsappEnabled}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            whatsappEnabled: e.target.checked
                          })}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  {integrationSettings.whatsappEnabled && (
                    <div className="integration-form">
                      <div className="form-group">
                        <label className="form-label">API Key</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={integrationSettings.whatsappSettings.apiKey}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            whatsappSettings: {
                              ...integrationSettings.whatsappSettings,
                              apiKey: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Template Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={integrationSettings.whatsappSettings.templateName}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            whatsappSettings: {
                              ...integrationSettings.whatsappSettings,
                              templateName: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <button className="btn btn-outline">Test Connection</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="settings-panel">
              <div className="settings-header">
                <h2>Security & Privacy</h2>
                <button className="btn btn-primary">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
              
              <div className="settings-section">
                <h3>Data Protection</h3>
                
                <div className="form-group">
                  <label className="form-label">Data Retention Period</label>
                  <div className="retention-input">
                    <input 
                      type="number" 
                      className="form-control" 
                      min="1"
                      value={securitySettings.dataRetention}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        dataRetention: parseInt(e.target.value)
                      })}
                    />
                    <select 
                      className="form-control"
                      value={securitySettings.dataRetentionUnit}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        dataRetentionUnit: e.target.value
                      })}
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="encrypt-data" 
                    checked={securitySettings.encryptData}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      encryptData: e.target.checked
                    })}
                  />
                  <label htmlFor="encrypt-data">
                    Encrypt patient data at rest
                  </label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="two-factor" 
                    checked={securitySettings.requireTwoFactor}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      requireTwoFactor: e.target.checked
                    })}
                  />
                  <label htmlFor="two-factor">
                    Require two-factor authentication for all users
                  </label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="audit-logging" 
                    checked={securitySettings.auditLogging}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      auditLogging: e.target.checked
                    })}
                  />
                  <label htmlFor="audit-logging">
                    Enable detailed audit logging
                  </label>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Compliance</h3>
                <div className="compliance-info">
                  <p>This system is designed to comply with healthcare data protection regulations. Ensure your usage adheres to:</p>
                  <ul>
                    <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
                    <li>GDPR (General Data Protection Regulation)</li>
                    <li>Local healthcare privacy regulations</li>
                  </ul>
                  <p>Consult with your legal team to ensure full compliance with regulations in your jurisdiction.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
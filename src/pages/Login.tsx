import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing, Lock } from 'lucide-react';
import './Login.css';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any login
      login({ name: 'Dr. Smith', email, role: 'Administrator' });
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-branding">
          <div className="login-logo">
            <BellRing size={32} />
          </div>
          <h1>CareRemind</h1>
          <p className="login-tagline">Smart Follow-Up Reminder System</p>
        </div>
        
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Please sign in to your account</p>
          
          {error && <div className="login-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <Lock size={16} className="password-icon" />
              </div>
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary login-button" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <a href="#">Contact administrator</a></p>
          </div>
        </div>
      </div>
      
      <div className="login-features">
        <div className="feature-item">
          <div className="feature-icon">
            <BellRing size={24} />
          </div>
          <h3>Multi-Channel Reminders</h3>
          <p>Send automated reminders via SMS, WhatsApp, email, and voice calls.</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">
            <MessageSquare size={24} />
          </div>
          <h3>Two-Way Communication</h3>
          <p>Allow patients to confirm or reschedule appointments with a simple reply.</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">
            <ShieldCheck size={24} />
          </div>
          <h3>HIPAA Compliant</h3>
          <p>Secure platform that protects patient data and meets healthcare regulations.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
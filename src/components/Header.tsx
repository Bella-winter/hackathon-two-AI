import React, { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import './Header.css';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New appointment request from Sarah Johnson',
      time: '10 min ago',
      read: false
    },
    {
      id: 2,
      message: 'Reminder: Dr. Wilson has 3 pending follow-ups',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      message: 'System update scheduled for tonight at 2 AM',
      time: '3 hours ago',
      read: true
    }
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="header-right">
        <div className="notification-container">
          <button className="notification-button" onClick={toggleNotifications}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button onClick={toggleNotifications} className="close-button">
                  <X size={18} />
                </button>
              </div>
              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p>{notification.message}</p>
                      <small>{notification.time}</small>
                    </div>
                  ))
                ) : (
                  <p className="no-notifications">No notifications</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="user-profile">
          <div className="avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Dr. Smith'}</span>
            <span className="user-role">{user?.role || 'Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
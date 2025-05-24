import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          {collapsed ? (
            <span className="logo-icon">CR</span>
          ) : (
            <h1>CareRemind</h1>
          )}
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" className={({ isActive }) => isActive ? 'active' : ''}>
              <Calendar size={20} />
              {!collapsed && <span>Appointments</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" className={({ isActive }) => isActive ? 'active' : ''}>
              <Users size={20} />
              {!collapsed && <span>Patients</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={logout}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
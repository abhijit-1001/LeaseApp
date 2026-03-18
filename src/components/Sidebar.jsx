import React from 'react';
import {
  MdDashboard,
  MdOpenInBrowser,
  MdAssignment,
  MdReceipt,
  MdBuild,
  MdSettings,
  MdTune,
  MdLogout
} from 'react-icons/md';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', icon: MdDashboard, label: 'Dashboard' },
  { id: 'landing', icon: MdOpenInBrowser, label: 'Landing Page' },
  { id: 'requests', icon: MdAssignment, label: 'Requests' },
  { id: 'expenses', icon: MdReceipt, label: 'Expenses' },
  { id: 'build', icon: MdBuild, label: 'Build Sessions' },
  { id: 'configuration', icon: MdSettings, label: 'Configuration' },
  { id: 'setup', icon: MdTune, label: 'Setup' },
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <span>L</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
            title={label}
          >
            <Icon className="nav-icon" />
            <span className="nav-tooltip">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout" title="Logout">
          <MdLogout className="nav-icon" />
          <span className="nav-tooltip">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

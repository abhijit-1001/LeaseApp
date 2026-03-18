import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdNotifications, MdApps, MdAccountCircle, MdAdd } from 'react-icons/md';
import DonutChart from '../components/DonutChart';
import MyTasksTable from '../components/MyTasksTable';
import ProcessCards from '../components/ProcessCards';
import SideDrawer from '../components/SideDrawer';
import { setActiveTab } from '../store/requestsSlice';
import './RequestsPage.css';

const TABS = ['Overview', 'All Tasks', 'Hold Tracking'];

function RequestsPage() {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.requests.activeTab);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="requests-page">
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-left">
          <h1 className="page-title">Requests</h1>
        </div>
        <div className="topbar-right">
          <button className="icon-btn" title="Notifications">
            <MdNotifications size={22} />
            <span className="badge">3</span>
          </button>
          <button className="icon-btn" title="Apps">
            <MdApps size={22} />
          </button>
          <button className="icon-btn avatar-btn" title="Account">
            <MdAccountCircle size={28} />
          </button>
        </div>
      </div>

      {/* Tabs + Create Button */}
      <div className="tabs-bar">
        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab(tab))}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="create-request-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <MdAdd size={18} />
          Create Request
        </button>
      </div>

      {/* Body */}
      {activeTab === 'Overview' && (
        <div className="overview-body">
          {/* Left: Donut Chart */}
          <div className="chart-section card">
            <DonutChart />
          </div>

          {/* Right: My Tasks */}
          <div className="tasks-section card">
            <MyTasksTable />
          </div>
        </div>
      )}

      {activeTab === 'All Tasks' && (
        <div className="overview-body">
          <div className="card full-width-card">
            <MyTasksTable showAll />
          </div>
        </div>
      )}

      {activeTab === 'Hold Tracking' && (
        <div className="overview-body">
          <div className="card full-width-card placeholder-tab">
            <span>🔒</span>
            <p>No holds currently tracked.</p>
          </div>
        </div>
      )}

      {/* Process Cards */}
      <div className="process-section">
        <ProcessCards />
      </div>

      {/* Side Drawer Component */}
      <SideDrawer 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}

export default RequestsPage;

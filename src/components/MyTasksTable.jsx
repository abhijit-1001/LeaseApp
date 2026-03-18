import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdFilterAlt, MdClear, MdOpenInNew } from 'react-icons/md';
import { updateFilters, applyFilters, clearFilters } from '../store/requestsSlice';
import './MyTasksTable.css';

const STATUSES = ['All Status', 'In Progress', 'Completed', 'Cancelled'];
const PROCESSES = ['Process', 'Amendment Process', 'Payment Process', 'BNI&G Process', 'Ticket Management'];

const statusClass = (status) => {
  if (status === 'In Progress') return 'status-inprogress';
  if (status === 'Completed')   return 'status-completed';
  if (status === 'Cancelled')   return 'status-cancelled';
  return '';
};

const slaClass = (sla) => {
  if (sla === 'Met' || sla === 'On Track') return 'sla-good';
  if (sla === 'At Risk') return 'sla-risk';
  if (sla === 'Breached') return 'sla-bad';
  return '';
};

function MyTasksTable({ showAll = false }) {
  const dispatch = useDispatch();
  const { tasks, filters, filteredTasks } = useSelector(state => state.requests);

  const displayTasks = showAll ? tasks : (filteredTasks !== null ? filteredTasks : []);
  const myTasksCount = displayTasks.length;

  const handleFilterChange = (field, value) => {
    dispatch(updateFilters({ [field]: value }));
  };

  const handleApply = () => {
    dispatch(applyFilters());
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="tasks-wrapper">
      <div className="tasks-header">
        <h3 className="tasks-title">
          My Tasks <span className="count-badge">{myTasksCount}</span>
        </h3>
      </div>

      {!showAll && (
        <div className="filters-row">
          <input
            className="filter-input"
            placeholder="Site ID"
            value={filters.siteId}
            onChange={e => handleFilterChange('siteId', e.target.value)}
          />
          <select
            className="filter-select"
            value={filters.process}
            onChange={e => handleFilterChange('process', e.target.value)}
          >
            {PROCESSES.map(p => <option key={p}>{p}</option>)}
          </select>
          <input
            className="filter-input"
            placeholder="Task Name"
            value={filters.taskName}
            onChange={e => handleFilterChange('taskName', e.target.value)}
          />
          <select
            className="filter-select"
            value={filters.status}
            onChange={e => handleFilterChange('status', e.target.value)}
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="apply-btn" onClick={handleApply}>
            <MdFilterAlt size={15} /> Apply Filter
          </button>
          <button className="clear-btn" onClick={handleClear}>
            <MdClear size={14} /> Clear All
          </button>
        </div>
      )}

      <div className="table-container">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Site ID</th>
              <th>Process Name</th>
              <th>Task Name</th>
              <th>Task Status</th>
              <th>SLA Status</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {displayTasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-records">
                  <div className="no-records-content">
                    <span className="no-records-icon">📋</span>
                    <p>No Records Found</p>
                    {!showAll && <span>Apply filters to search for tasks</span>}
                  </div>
                </td>
              </tr>
            ) : (
              displayTasks.map(task => (
                <tr key={task.id} className="task-row">
                  <td className="req-id">{task.id}</td>
                  <td>{task.siteId}</td>
                  <td>{task.process}</td>
                  <td>{task.taskName}</td>
                  <td>
                    <span className={`status-badge ${statusClass(task.taskStatus)}`}>
                      {task.taskStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`sla-badge ${slaClass(task.slaStatus)}`}>
                      {task.slaStatus}
                    </span>
                  </td>
                  <td>{task.sla}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!showAll && (
        <div className="view-all-link">
          <button className="link-btn">
            <MdOpenInNew size={13} /> View all tasks
          </button>
        </div>
      )}
    </div>
  );
}

export default MyTasksTable;

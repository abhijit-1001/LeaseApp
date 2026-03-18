import React from 'react';
import './ProcessCards.css';

const summaryData = [
  { process: 'Amendment Process', inProgress: 4, completed: 28, cancelled: 3 },
  { process: 'Payment Process',   inProgress: 13, completed: 15, cancelled: 46 },
  { process: 'BNI&G Process',     inProgress: 488, completed: 0,  cancelled: 14 },
  { process: 'Ticket Management', inProgress: 1,  completed: 1,  cancelled: 1 }
];

function ProcessCards() {
  return (
    <div className="process-cards-container">
      {summaryData.map(data => (
        <div key={data.process} className="process-card card">
          <h4 className="process-title">{data.process}</h4>
          <div className="process-stats">
            <div className="stat-row">
              <span className="stat-label">In Progress</span>
              <span className="stat-value">{data.inProgress}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{data.completed}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Cancelled</span>
              <span className="stat-value">{data.cancelled}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProcessCards;

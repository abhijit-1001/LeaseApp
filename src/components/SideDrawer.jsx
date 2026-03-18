import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineBuild, MdOutlineAccountBalance, MdOutlinePayment, MdClose } from 'react-icons/md';
import { addRequest } from '../store/requestsSlice';
import './SideDrawer.css';

const PROCESSES = [
  {
    id: 'site-acquisition',
    title: 'Site Acquisition',
    description: 'Site Acquisition process enable user to find and acquire suitable candidate for BTS site.',
    icon: MdOutlineBuild,
  },
  {
    id: 'municipality-permit',
    title: 'Municipality Permit Process',
    description: 'The Municipality Permit Status provides legal legitimacy for the tower\'s existence and operation.',
    icon: MdOutlineAccountBalance,
  },
  {
    id: 'payment-process',
    title: 'Payment Process',
    description: 'Initiate scheduled payments to ensure timely disbursements to your landlords and it also provides a document capture function.',
    icon: MdOutlinePayment,
  }
];

function SideDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleInitiate = (processTitle) => {
    const newReq = {
      id: `REQ-${Math.floor(Math.random() * 9000) + 1000}`,
      siteId: `SITE-0${Math.floor(Math.random() * 9) + 1}`,
      process: processTitle,
      taskName: 'Draft Request',
      taskStatus: 'In Progress',
      slaStatus: 'On Track',
      sla: '5d'
    };
    dispatch(addRequest(newReq));
    onClose();
    alert(`${processTitle} initiated successfully!`);
  };

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />
      
      {/* Drawer Panel */}
      <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Initiate Process</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="drawer-body">
          {PROCESSES.map((process, index) => {
            const Icon = process.icon;
            return (
              <div key={process.id} className="process-item">
                <div className="process-icon-wrapper">
                  <Icon className="process-icon" size={28} />
                </div>
                <h3 className="process-item-title">{process.title}</h3>
                <p className="process-item-desc">{process.description}</p>
                <button className="initiate-btn" onClick={() => handleInitiate(process.title)}>
                  Initiate Request
                </button>
                
                {/* Add a divider except for the last item */}
                {index < PROCESSES.length - 1 && <div className="process-divider" />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SideDrawer;

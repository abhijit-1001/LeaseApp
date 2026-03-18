import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 'REQ-1001', siteId: 'SITE-01', process: 'Amendment Process', taskName: 'Review Docs', taskStatus: 'In Progress', slaStatus: 'On Track', sla: '2d' },
    { id: 'REQ-1002', siteId: 'SITE-02', process: 'Payment Process',   taskName: 'Invoice Check', taskStatus: 'Completed',   slaStatus: 'Met',      sla: '1d' },
    { id: 'REQ-1003', siteId: 'SITE-03', process: 'BNI&G Process',     taskName: 'Approval',     taskStatus: 'In Progress', slaStatus: 'At Risk',   sla: '3d' },
    { id: 'REQ-1004', siteId: 'SITE-01', process: 'Ticket Management', taskName: 'Escalation',   taskStatus: 'Cancelled',   slaStatus: 'Breached',  sla: '0d' },
    { id: 'REQ-1005', siteId: 'SITE-04', process: 'Payment Process',   taskName: 'Reconcile',    taskStatus: 'In Progress', slaStatus: 'On Track',  sla: '5d' },
    { id: 'REQ-1006', siteId: 'SITE-02', process: 'Amendment Process', taskName: 'Sign Off',     taskStatus: 'Completed',   slaStatus: 'Met',       sla: '1d' },
  ],
  activeTab: 'Overview',
  filters: {
    siteId: '',
    process: 'Process',
    taskName: '',
    status: 'All Status',
  },
  filteredTasks: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      const { siteId, process, taskName, status } = state.filters;
      let result = state.tasks;

      if (siteId) {
        result = result.filter(t => t.siteId.toLowerCase().includes(siteId.toLowerCase()));
      }
      if (process !== 'Process') {
        result = result.filter(t => t.process === process);
      }
      if (taskName) {
        result = result.filter(t => t.taskName.toLowerCase().includes(taskName.toLowerCase()));
      }
      if (status !== 'All Status') {
        result = result.filter(t => t.taskStatus === status);
      }

      state.filteredTasks = result;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredTasks = null;
    },
    addRequest: (state, action) => {
      state.tasks.unshift(action.payload);
    }
  },
});

export const { setActiveTab, updateFilters, applyFilters, clearFilters, addRequest } = requestsSlice.actions;
export default requestsSlice.reducer;

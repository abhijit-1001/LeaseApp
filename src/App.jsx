import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RequestsPage from './pages/RequestsPage';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('requests');

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        {activePage === 'requests' && <RequestsPage />}
        {activePage !== 'requests' && (
          <div className="placeholder-page">
            <div className="placeholder-icon">🚧</div>
            <h2>Coming Soon</h2>
            <p>This section is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

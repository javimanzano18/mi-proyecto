import React from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="split-left">
        <LeftPanel />
      </div>
      <div className="split-right">
        <RightPanel />
      </div>
    </div>
  );
}

export default App;

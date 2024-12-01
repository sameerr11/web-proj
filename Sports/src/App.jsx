import React from 'react';
import Dashboard from './components/Dashboard';
import TeamManager from './components/TeamManager';
import MatchScheduler from './components/MatchScheduler';
import GroundManager from './components/GroundManager';
import Ecommerce from './components/Ecommerce';

function App() {
    return (
        <div className="App">
            <Dashboard />
            <TeamManager />
            <MatchScheduler />
            <GroundManager />
            <Ecommerce />
        </div>
    );
}

export default App;

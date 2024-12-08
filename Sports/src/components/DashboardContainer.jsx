import React, { useState } from 'react';
import Dashboard from './Dashboard';
import TeamManager from './TeamManager';
import MatchScheduler from './MatchScheduler';
import GroundManager from './GroundManager';
import Ecommerce from './Ecommerce';

function DashboardContainer() {
    const [currentView, setCurrentView] = useState('dashboard'); // Default view is 'dashboard'

    const handleViewChange = (newView) => {
        setCurrentView(newView);  // Update the current view based on button click
    };

    return (
        <div>
            <Dashboard handleViewChange={handleViewChange} currentView={currentView} />
            <section>
                {currentView === 'team-manager' && <TeamManager />}
                {currentView === 'match-scheduler' && <MatchScheduler />}
                {currentView === 'ground-manager' && <GroundManager />}
                {currentView === 'ecommerce' && <Ecommerce />}
            </section>
        </div>
    );
}

export default DashboardContainer;

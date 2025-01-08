import React, { useState } from 'react';
import Dashboard from './Dashboard';
import TeamManager from './TeamManager';
import MatchScheduler from './MatchScheduler';
import GroundManager from './GroundManager';
import Ecommerce from './Ecommerce';
import GetTicket from './GetTicket';
import Profile from './Profile'
import Feedback from './Feedback'
import '../styles/dashboard.css'; 

function DashboardContainer() {
    const [currentView, setCurrentView] = useState('dashboard'); 

    const handleViewChange = (newView) => {
        setCurrentView(newView); 
    };

    return (
        <div>
            <Dashboard handleViewChange={handleViewChange} currentView={currentView} />
            <section>
                {currentView === 'team-manager' && <TeamManager />}
                {currentView === 'match-scheduler' && <MatchScheduler />}
                {currentView === 'ground-manager' && <GroundManager />}
                {currentView === 'ecommerce' && <Ecommerce />}
                {currentView === 'get-ticket' && <GetTicket />}
                {currentView === 'profile' && <Profile />}
                {currentView === 'feedback' && <Feedback />}
            </section>
        </div>
    );
}

export default DashboardContainer;

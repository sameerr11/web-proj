import React from 'react';

function Dashboard({ handleViewChange }) {
    return (
        <div className="dashboard-container">
            <h1>Welcome to My Sports Manager</h1>
            <p>Manage your teams, schedule matches, and more.</p>
            <div className="dashboard-options">
                <button onClick={() => handleViewChange('team-manager')} className="dashboard-button">
                    Team Management
                </button>
                <button onClick={() => handleViewChange('match-scheduler')} className="dashboard-button">
                    Match Scheduling
                </button>
                <button onClick={() => handleViewChange('ground-manager')} className="dashboard-button">
                    Ground Management
                </button>
                <button onClick={() => handleViewChange('ecommerce')} className="dashboard-button">
                    E-commerce
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

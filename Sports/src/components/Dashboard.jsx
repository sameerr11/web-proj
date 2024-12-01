import React from 'react';
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Welcome to My Sports Manager</h1>
            <p>Manage your teams, schedule matches, and view sports grounds.</p>
            <div className="dashboard-options">
                <button className="dashboard-button">Team Management</button>
                <button className="dashboard-button">Match Scheduling</button>
                <button className="dashboard-button">Ground Management</button>
                <button className="dashboard-button">E-commerce</button>
            </div>
        </div>
    );
}

export default Dashboard;

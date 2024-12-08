import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Dashboard from './Dashboard'; // Assuming Dashboard is in the same directory

function DashboardContainer() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [view, setView] = useState('dashboard'); // Default view

    const handleViewChange = (newView) => {
        setView(newView);
        navigate(`/${newView}`); // Navigate to the path corresponding to the view
    };

    return (
        <div>
            <Dashboard handleViewChange={handleViewChange} currentView={view} />
        </div>
    );
}

export default DashboardContainer;

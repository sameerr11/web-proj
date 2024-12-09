import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';  // Adjust path based on your folder structure

import { useNavigate } from 'react-router-dom';  // Import useNavigate to redirect after logout

function Dashboard({ handleViewChange, currentView }) {
    const [user, setUser] = useState({ name: '', email: '', profilePicture: '' });
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [financialStats, setFinancialStats] = useState({ totalEarnings: 0, expenses: 0 });

    const navigate = useNavigate();  // Initialize useNavigate hook

    // Fetch user details
    useEffect(() => {
        fetch('/api/users/me') // Replace with your backend API endpoint
            .then(response => response.json())
            .then(data => {
                console.log("User data:", data);  // Check if data is being set correctly
                setUser(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    // Fetch upcoming matches
    useEffect(() => {
        fetch('/api/matches/upcoming') // Replace with your backend API endpoint
            .then(response => response.json())
            .then(data => setUpcomingMatches(data))
            .catch(error => console.error('Error fetching matches:', error));
    }, []);

    // Fetch financial statistics
    useEffect(() => {
        fetch('/api/financial-stats') // Replace with your backend API endpoint
            .then(response => response.json())
            .then(data => setFinancialStats(data))
            .catch(error => console.error('Error fetching financial stats:', error));
    }, []);

    // Handle Logout
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="user-profile">
                <img
                    src={user.profilePicture || 'default-profile.png'}
                    alt="Profile"
                    className="profile-picture"
                />
                <h1>Welcome, {user.name || 'User'}</h1>
                <p>Email: {user.email || 'Not provided'}</p>
            </header>

            <section className="dashboard-options">
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
            </section>

            <section className="dashboard-overview">
                {currentView === 'dashboard' && (
                    <>
                        <h2>Upcoming Matches</h2>
                        <ul className="match-list">
                            {upcomingMatches.length > 0 ? (
                                upcomingMatches.map(match => (
                                    <li key={match.id}>
                                        {match.teamA} vs {match.teamB} on {new Date(match.date).toLocaleDateString()}
                                    </li>
                                ))
                            ) : (
                                <p>No upcoming matches found.</p>
                            )}
                        </ul>

                        <h2>Financial Statistics</h2>
                        <div className="financial-stats">
                            <p>Total Earnings: ${financialStats.totalEarnings}</p>
                            <p>Expenses: ${financialStats.expenses}</p>
                        </div>
                    </>
                )}

                {currentView === 'team-manager' && <h2>Team Management Page</h2>}
                {currentView === 'match-scheduler' && <h2>Match Scheduling Page</h2>}
                {currentView === 'ground-manager' && <h2>Ground Management Page</h2>}
                {currentView === 'ecommerce' && <h2>E-commerce Page</h2>}
            </section>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;

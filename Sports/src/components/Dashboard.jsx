import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard({ currentView }) {
    const [user, setUser] = useState({ name: '', email: '', profilePicture: '' });
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [financialStats, setFinancialStats] = useState({ totalEarnings: 0, expenses: 0 });

    const navigate = useNavigate();

    // Fetch user details
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users/me');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    // Fetch upcoming matches
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/api/matches/upcoming');
                const data = await response.json();
                setUpcomingMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };
        fetchMatches();
    }, []);

    // Fetch financial statistics
    useEffect(() => {
        const fetchFinancialStats = async () => {
            try {
                const response = await fetch('/api/financial-stats');
                const data = await response.json();
                setFinancialStats(data);
            } catch (error) {
                console.error('Error fetching financial stats:', error);
            }
        };
        fetchFinancialStats();
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="user-profile">
                <img
                    src={user.profilePicture || '/default-profile.png'}
                    alt="Profile"
                    className="profile-picture"
                />
                <h1>Welcome, {user.name || 'User'}</h1>
                <p>Email: {user.email || 'Not provided'}</p>
            </header>

            <section className="dashboard-options">
                <button onClick={() => navigate('/team-manager')} className="dashboard-button">
                    Team Management
                </button>
                <button onClick={() => navigate('/match-scheduler')} className="dashboard-button">
                    Match Scheduling
                </button>
                <button onClick={() => navigate('/ground-manager')} className="dashboard-button">
                    Ground Management
                </button>
                <button onClick={() => navigate('/ecommerce')} className="dashboard-button">
                    E-commerce
                </button>
            </section>

            <section className="dashboard-overview">
                {currentView === 'dashboard' && (
                    <>
                        <h2>Upcoming Matches</h2>
                        <ul className="match-list">
                            {upcomingMatches.length > 0 ? (
                                upcomingMatches.map((match) => (
                                    <li key={match.id} className="match-item">
                                        <strong>{match.teamA}</strong> vs <strong>{match.teamB}</strong> on{' '}
                                        {new Date(match.date).toLocaleDateString()} at {match.venue}
                                    </li>
                                ))
                            ) : (
                                <p>No upcoming matches found.</p>
                            )}
                        </ul>
                    </>
                )}
            </section>

            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;

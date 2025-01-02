import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard({ currentView }) {
    const [user, setUser] = useState({ name: '', email: '', profilePicture: '' });
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const filteredMatches = upcomingMatches.filter((match) => {
        const matchDate = new Date(match.date).toISOString().split('T')[0];
        const matchTeams = `${match.teamA} vs ${match.teamB}`.toLowerCase();
        return (
            (!filterDate || matchDate === filterDate) &&
            (!searchQuery || matchTeams.includes(searchQuery.toLowerCase()))
        );
    });

    const handleProfileClick = () => {
        navigate('/profile');
    };
    
    return (
        <div className="dashboard-container">
            {/* Profile Button */}
            <button className="profile-button" onClick={handleProfileClick}>
                <img
                    src={user.profilePicture || '/assets/default-profile.png'}
                    alt="Profile"
                    className="profile-picture"
                />
                {user.name || 'Profile'}
            </button>

            <header className="user-profile">
                <h1>Welcome, {user.name || 'User'}</h1>
                <button onClick={() => navigate('/feedback')} className="feedback-button">
                    Feedback
                </button>
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
                <button onClick={() => navigate('/get-ticket')} className="dashboard-button">
                    Get Ticket
                </button>
            </section>

            <section className="dashboard-overview">
                {currentView === 'dashboard' && (
                    <>
                        <h2>Upcoming Matches</h2>
                        <div className="search-filter-container">
                            <input
                                type="text"
                                placeholder="Search (e.g., TeamA vs TeamB)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="filter-date-input"
                            />
                        </div>
                        <ul className="match-list">
                            {filteredMatches.length > 0 ? (
                                filteredMatches.map((match) => (
                                    <li key={match.id} className="match-item">
                                        <strong>{match.teamA}</strong> vs <strong>{match.teamB}</strong> on{' '}
                                        {new Date(match.date).toLocaleDateString()} at {match.venue}{' '}
                                        <span className="ticket-price">- Rs. {match.ticketPrice}</span>
                                    </li>
                                ))
                            ) : (
                                <p>No matches found.</p>
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

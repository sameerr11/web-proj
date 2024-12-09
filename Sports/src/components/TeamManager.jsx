import React, { useState } from 'react';
import '../styles/team-manager.css'; // Adjust the path based on your folder structure
import { useNavigate } from 'react-router-dom'; // For navigation

function TeamManager() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate(); // Initialize navigate

    const fetchTeams = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error state before making a request

        try {
            const response = await fetch('/api/teams');
            if (!response.ok) {
                throw new Error('Failed to fetch teams');
            }
            const data = await response.json();
            setTeams(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="team-manager">
            {/* Header */}
            <header className="team-manager-header">
                <h2>Manage Teams</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    ⬅ Back to Dashboard
                </button>
            </header>

            {/* Fetch Teams Section */}
            <section className="team-manager-content">
                {/* Loading state */}
                {loading && <p>Loading teams...</p>}

                {/* Error handling */}
                {error && <p className="error-message">Error: {error}</p>}

                {/* Fetch Teams button */}
                <button
                    className="fetch-teams-button"
                    onClick={fetchTeams}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Load Teams'}
                </button>

                {/* Display Teams */}
                {teams.length === 0 && !loading && !error && (
                    <p className="empty-state-message">No teams available.</p>
                )}
                <ul className="team-list">
                    {teams.map((team) => (
                        <li key={team._id} className="team-item">
                            <h3>{team.name}</h3>
                            <p>Players: {team.players.length}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default TeamManager;

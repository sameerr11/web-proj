import React, { useState } from 'react';

function TeamManager() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);  // State for loading indicator
    const [error, setError] = useState(null);  // State for error handling

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
            <h2>Manage Teams</h2>

            {/* Loading state */}
            {loading && <p>Loading teams...</p>}

            {/* Error handling */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Fetch Teams button */}
            <button className="fetch-teams" onClick={fetchTeams} disabled={loading}>
                {loading ? 'Loading...' : 'Load Teams'}
            </button>

            {/* Display teams */}
            {teams.length === 0 && !loading && !error && <p>No teams available.</p>}
            <ul className="team-list">
                {teams.map((team) => (
                    <li key={team._id} className="team-item">
                        <h3>{team.name}</h3>
                        <p>Players: {team.players.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamManager;

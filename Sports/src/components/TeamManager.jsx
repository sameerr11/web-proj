import React, { useState, useEffect } from 'react';
import '../styles/team-manager.css';
import { useNavigate } from 'react-router-dom';

function TeamManager() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [newTeam, setNewTeam] = useState({
        name: '',
        city: '',
        teamCoach: '',
        numberOfPlayers: '',
    });
    const navigate = useNavigate();

    // Fetch teams from the database when the component loads
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        setLoading(true);
        setError(null);

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
            setLoading(false);
        }
    };

    // Handle input changes for adding a new team
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({
            ...newTeam,
            [name]: value,
        });
    };

    // Add a new team
    const handleAddTeam = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newTeam.name,
                    city: newTeam.city,
                    teamCoach: newTeam.teamCoach,
                    numberOfPlayers: parseInt(newTeam.numberOfPlayers, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add team');
            }

            const addedTeam = await response.json();

            // Add the new team at the top of the list
            setTeams((prevTeams) => [addedTeam, ...prevTeams]);

            // Clear the input fields
            setNewTeam({
                name: '',
                city: '',
                teamCoach: '',
                numberOfPlayers: '',
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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

            {/* Add Team Section */}
            <section className="team-manager-content">
                {/* Loading state */}
                {loading && <p>Loading...</p>}

                {/* Error handling */}
                {error && <p className="error-message">Error: {error}</p>}

                {/* Add Team Form */}
                <div className="add-team-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Team Name"
                        value={newTeam.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newTeam.city}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="teamCoach"
                        placeholder="Team Coach"
                        value={newTeam.teamCoach}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="numberOfPlayers"
                        placeholder="Number of Players"
                        value={newTeam.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={handleAddTeam}
                        className="fetch-teams-button"
                        disabled={loading}
                    >
                        {loading ? 'Adding Team...' : 'Add Team'}
                    </button>
                </div>

                {/* Display Teams */}
                {teams.length === 0 && !loading && !error ? (
                    <p className="empty-state-message">No teams available.</p>
                ) : (
                    <ul className="team-list">
                        {teams.map((team) => (
                            <li key={team._id} className="team-item">
                                <h3>{team.name}</h3>
                                <p>City: {team.city}</p>
                                <p>Coach: {team.teamCoach}</p>
                                <p>Number of Players: {team.numberOfPlayers}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default TeamManager;

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
    const [editTeam, setEditTeam] = useState(null); // State for editing a team
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({
            ...newTeam,
            [name]: value,
        });
    };

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
            setTeams((prevTeams) => [addedTeam, ...prevTeams]);
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

    const handleDeleteTeam = async (teamId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/teams/${teamId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete team');
            }
            setTeams(teams.filter((team) => team._id !== teamId));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTeam({
            ...editTeam,
            [name]: value,
        });
    };

    const handleEditTeam = (team) => {
        setEditTeam(team); // Set the team to be edited
    };

    const handleSaveEdit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/teams/${editTeam._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editTeam.name,
                    city: editTeam.city,
                    teamCoach: editTeam.teamCoach,
                    numberOfPlayers: parseInt(editTeam.numberOfPlayers, 10),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update team');
            }
            const updatedTeam = await response.json();
            setTeams((prevTeams) =>
                prevTeams.map((team) => (team._id === updatedTeam._id ? updatedTeam : team))
            );
            setEditTeam(null); // Clear the edit state
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="team-manager">
            <header className="team-manager-header">
                <h2>Manage Teams</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    ⬅ Back to Dashboard
                </button>
            </header>
            <section className="team-manager-content">
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">Error: {error}</p>}
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
                    <button onClick={handleAddTeam} className="fetch-teams-button" disabled={loading}>
                        {loading ? 'Adding Team...' : 'Add Team'}
                    </button>
                </div>
                <div className="search-team">
                    <h2 className="search-team-heading">Search Team</h2>
                    <input
                        type="text"
                        placeholder="Search by Team Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                {filteredTeams.length === 0 && !loading && !error ? (
                    <p className="empty-state-message">No teams found.</p>
                ) : (
                    <ul className="team-list">
                        {filteredTeams.map((team) => (
                            <li key={team._id} className="team-item">
                                <h3>{team.name}</h3>
                                <p>City: {team.city}</p>
                                <p>Coach: {team.teamCoach}</p>
                                <p>Number of Players: {team.numberOfPlayers}</p>
                                <button
                                    onClick={() => handleDeleteTeam(team._id)}
                                    className="delete-team-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Delete Team'}
                                </button>
                                <button
                                    onClick={() => handleEditTeam(team)}
                                    className="delete-team-button"
                                    disabled={loading}
                                >
                                    Edit Team
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {editTeam && (
                    <div className="edit-team-form">
                        <h2>Edit Team</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Team Name"
                            value={editTeam.name}
                            onChange={handleEditInputChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={editTeam.city}
                            onChange={handleEditInputChange}
                        />
                        <input
                            type="text"
                            name="teamCoach"
                            placeholder="Team Coach"
                            value={editTeam.teamCoach}
                            onChange={handleEditInputChange}
                        />
                        <input
                            type="number"
                            name="numberOfPlayers"
                            placeholder="Number of Players"
                            value={editTeam.numberOfPlayers}
                            onChange={handleEditInputChange}
                        />
                        <button onClick={handleSaveEdit} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default TeamManager;

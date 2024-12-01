import React, { useState } from 'react';

function TeamManager() {
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        const response = await fetch('/api/teams');
        const data = await response.json();
        setTeams(data);
    };

    return (
        <div className="team-manager">
            <h2>Manage Teams</h2>
            <button className="fetch-teams" onClick={fetchTeams}>Load Teams</button>
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

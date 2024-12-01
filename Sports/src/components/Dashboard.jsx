import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch('/api/teams')
            .then(res => res.json())
            .then(data => setTeams(data));
    }, []);

    return (
        <div>
            <h1>My Sports Manager Dashboard</h1>
            <h2>Teams</h2>
            <ul>
                {teams.map(team => (
                    <li key={team._id}>{team.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';

function MatchScheduler() {
    const [teams, setTeams] = useState([]);
    const [match, setMatch] = useState({ teamA: '', teamB: '', venue: '', date: '', time: '' });

    useEffect(() => {
        fetch('/api/teams')
            .then((res) => res.json())
            .then((data) => setTeams(data));
    }, []);

    const scheduleMatch = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/matches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(match),
        });

        if (response.ok) {
            alert('Match Scheduled Successfully');
            setMatch({ teamA: '', teamB: '', venue: '', date: '', time: '' });
        } else {
            alert('Error scheduling match');
        }
    };

    return (
        <div className="match-scheduler">
            <h2>Schedule a Match</h2>
            <form onSubmit={scheduleMatch}>
                <label>
                    Team A:
                    <select
                        value={match.teamA}
                        onChange={(e) => setMatch({ ...match, teamA: e.target.value })}
                        required
                    >
                        <option value="">Select Team A</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Team B:
                    <select
                        value={match.teamB}
                        onChange={(e) => setMatch({ ...match, teamB: e.target.value })}
                        required
                    >
                        <option value="">Select Team B</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Venue"
                    value={match.venue}
                    onChange={(e) => setMatch({ ...match, venue: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={match.date}
                    onChange={(e) => setMatch({ ...match, date: e.target.value })}
                    required
                />
                <input
                    type="time"
                    value={match.time}
                    onChange={(e) => setMatch({ ...match, time: e.target.value })}
                    required
                />
                <button type="submit">Schedule Match</button>
            </form>
        </div>
    );
}

export default MatchScheduler;

import React, { useState, useEffect } from 'react';
import '../styles/match-scheduler.css';

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
        <div className="match-scheduler-container">
            <h2>Schedule a Match</h2>
            <form onSubmit={scheduleMatch}>
                <div className="form-group">
                    <label>Team A:</label>
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
                </div>
                <div className="form-group">
                    <label>Team B:</label>
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
                </div>
                <div className="form-group">
                    <label>Venue:</label>
                    <input
                        type="text"
                        placeholder="Venue"
                        value={match.venue}
                        onChange={(e) => setMatch({ ...match, venue: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={match.date}
                        onChange={(e) => setMatch({ ...match, date: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        value={match.time}
                        onChange={(e) => setMatch({ ...match, time: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="match-button">
                    Schedule Match
                </button>
            </form>
        </div>
    );
}

export default MatchScheduler;

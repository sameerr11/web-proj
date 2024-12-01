import React, { useState } from 'react';

function MatchScheduler() {
    const [match, setMatch] = useState({ teamA: '', teamB: '', venue: '', date: '', time: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/matches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(match),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Team A" onChange={(e) => setMatch({ ...match, teamA: e.target.value })} />
            <input placeholder="Team B" onChange={(e) => setMatch({ ...match, teamB: e.target.value })} />
            <input placeholder="Venue" onChange={(e) => setMatch({ ...match, venue: e.target.value })} />
            <input type="date" onChange={(e) => setMatch({ ...match, date: e.target.value })} />
            <input type="time" onChange={(e) => setMatch({ ...match, time: e.target.value })} />
            <button type="submit">Schedule Match</button>
        </form>
    );
}

export default MatchScheduler;

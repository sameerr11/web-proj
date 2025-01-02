import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetTicket.css';

function GetTicket() {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/api/matches/upcoming');
                const data = await response.json();
                const matchesWithSeats = data.map(match => ({
                    ...match,
                    seatsAvailable: match.seatsAvailable || 1000
                }));
                setMatches(matchesWithSeats);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const handleBuyNow = (matchId) => {
        setMatches((prevMatches) =>
            prevMatches.map(match =>
                match._id === matchId && match.seatsAvailable > 0
                    ? { ...match, seatsAvailable: match.seatsAvailable - 1 }
                    : match
            )
        );
    };

    return (
        <div className="container">
            <header className="user-profile">
                <h1>Upcoming Matches</h1>
                <button onClick={() => navigate('/')} className="back-button">
                    ⬅ Back to Dashboard
                </button>
            </header>

            <section className="overview">
                {matches.length > 0 ? (
                    <ul className="match-list">
                        {matches.map((match) => (
                            <li key={match._id} className="match-item">
                                <div className="match-info">
                                    <strong>{match.teamA}</strong> vs <strong>{match.teamB}</strong>
                                    <p>{new Date(match.date).toLocaleDateString()} - {match.venue}</p>
                                </div>
                                <div className="match-actions">
                                    <span className="ticket-price">Rs. {match.ticketPrice}</span>
                                    <span className="seats-available">Seats: {match.seatsAvailable}</span>
                                    <button
                                        className="buy-now-button"
                                        onClick={() => handleBuyNow(match._id)}
                                        disabled={match.seatsAvailable === 0}
                                    >
                                        {match.seatsAvailable > 0 ? 'Buy Now' : 'Sold Out'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming matches available.</p>
                )}
            </section>
        </div>
    );
}

export default GetTicket;

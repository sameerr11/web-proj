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
                    seatsAvailable: match.seatsAvailable || 100
                }));
                setMatches(matchesWithSeats);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const handleBuyNow = async (matchId) => {
        try {
            // Make a POST request to the backend to update seats
            const response = await fetch(`/api/matches/buy-ticket/${matchId}`, {
                method: 'POST',
            });
    
            if (response.ok) {
                const updatedMatch = await response.json();
    
                // Update the local state to reflect the change
                setMatches((prevMatches) =>
                    prevMatches.map(match =>
                        match._id === updatedMatch.match._id
                            ? { ...match, seatsAvailable: updatedMatch.match.seatsAvailable }
                            : match
                    )
                );
            } else {
                console.error('Error purchasing ticket:', await response.json());
                alert('Failed to purchase ticket. Please try again.');
            }
        } catch (error) {
            console.error('Error handling Buy Now:', error);
            alert('An error occurred. Please try again.');
        }
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
                                    <span className="ticket-price">$ {match.ticketPrice}</span>
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

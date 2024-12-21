import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/feedback.css';

function Feedback() {
    const [username, setUsername] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !feedback) {
            alert('Please provide your username and feedback!');
            return;
        }

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, feedback }),
            });

            const data = await response.json();

            console.log('Feedback Response:', data);
            if (response.ok) {
                setUsername('');
                setFeedback('');
                alert('Thank you for your feedback!');
            } else {
                alert(data.message || 'Failed to submit feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Submit Your Feedback</h1>
            <button onClick={() => navigate('/')} className="back-button">
                ⬅ Back to Dashboard
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="6"
                    required
                />
                <button type="submit" className="submit-feedback-button">Submit</button>
            </form>
        </div>
    );
}

export default Feedback;

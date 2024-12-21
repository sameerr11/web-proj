import React, { useState } from 'react';
import '../styles/feedback.css'; // Add your custom styles here

function Feedback() {
    const [username, setUsername] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !feedback) {
            alert('Please provide your username and feedback!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, feedback }),
            });

            const data = await response.json(); // Parse the response data

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Share your thoughts about your sports experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="6"
                    required
                />
                <button type="submit" className="submit-feedback-button">
                    Submit
                </button>
            </form>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
        </button>
    </div>
);

}

export default Feedback;

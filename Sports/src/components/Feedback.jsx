import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/feedback.css';

function Feedback() {
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback) {
            alert('Please provide your feedback!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback }),
            });

            if (response.ok) {
                alert('Thank you for your feedback!');
                setFeedback('');
            } else {
                alert('Failed to submit feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
    <div className="feedback-container">
        <h1>We Value Your Feedback!</h1>
        <div className="feedback-form">
            <form onSubmit={handleSubmit}>
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

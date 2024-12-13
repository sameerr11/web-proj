import React, { useState } from 'react';
import '../styles/feedback.css'; // Add your custom styles here

function Feedback() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback) {
            alert('Please provide your feedback!');
            return;
        }

        try {
            const response = await fetch('/api/feedback', {
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
            <h1>Submit Your Feedback</h1>
            <form onSubmit={handleSubmit}>
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

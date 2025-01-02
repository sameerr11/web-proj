import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        profilePicture: '',
        wallet: { balance: 0, currency: 'USD' },
    });
    const [amountToAdd, setAmountToAdd] = useState('');
    const [error, setError] = useState(null); // To track errors
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    return;
                }

                const response = await fetch('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                console.log('User data:', data); // Debugging line
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message); // Capture the error message
            }
        };

        fetchUserData();
    }, []);

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();

        const newBalance = user.wallet.balance + parseFloat(amountToAdd);
        setUser({
            ...user,
            wallet: { ...user.wallet, balance: newBalance },
        });

        try {
            const token = localStorage.getItem('token');
            await fetch('/api/users/update-wallet', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ balance: newBalance }),
            });
        } catch (error) {
            console.error('Error updating wallet:', error);
        }

        setAmountToAdd('');
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            {/* Display an error if any */}
            {error && <p className="error-message">Error: {error}</p>}

            {/* User Info */}
            <img
                src={user.profilePicture || '../images.png'}
                alt="Profile"
                className="profile-picture"
            />
            <p><strong>Name:</strong> {user.name || 'Loading...'}</p>
            <p><strong>Email:</strong> {user.email || 'Loading...'}</p>

            {/* Wallet Section */}
            <div className="wallet-section">
                <h2>Wallet</h2>
                <p><strong>Balance:</strong> {user.wallet.balance} {user.wallet.currency}</p>

                {/* Add Money Form */}
                <form className="add-money-form" onSubmit={handleAddMoney}>
                    <label htmlFor="amount">Add Money:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amountToAdd}
                        onChange={(e) => setAmountToAdd(e.target.value)}
                        placeholder="Enter amount"
                        min="0"
                        required
                    />
                    <button type="submit" className="add-money-button">Add</button>
                </form>
            </div>

            {/* Back to Dashboard Button */}
            <button onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}

export default Profile;

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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in to access this page');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleAddMoney = async (e) => {
        e.preventDefault();

        const amount = parseFloat(amountToAdd);
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid positive amount');
            return;
        }

        const newBalance = user.wallet.balance + amount;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/update-wallet', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ balance: newBalance }),
            });

            if (!response.ok) {
                throw new Error('Failed to update wallet balance');
            }

            setUser((prevUser) => ({
                ...prevUser,
                wallet: { ...prevUser.wallet, balance: newBalance },
            }));
            setAmountToAdd('');
            setError(null);
            setSuccess('Wallet balance updated successfully!');
        } catch (error) {
            console.error('Error updating wallet:', error);
            setError(error.message);
            setSuccess(null);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(file);
        }
    };

    const handleUploadProfilePicture = async (e) => {
        e.preventDefault();

        if (!newProfilePicture) {
            setError('Please select a profile picture');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/update-profile-picture', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload profile picture');
            }

            const data = await response.json();
            setUser((prevUser) => ({
                ...prevUser,
                profilePicture: data.profilePicture,
            }));
            setNewProfilePicture(null);
            setError(null);
            setSuccess('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            setError(error.message);
            setSuccess(null);
        }
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            {error && <p className="error-message">Error: {error}</p>}
            {success && <p className="success-message">{success}</p>}

            <img
                src={user.profilePicture ? `http://localhost:5000${user.profilePicture}` : '../images.png'}
                alt="Profile"
                className="profile-picture"
            />
            <p><strong>Name:</strong> {user.name || 'Loading...'}</p>
            <p><strong>Email:</strong> {user.email || 'Loading...'}</p>

            {/* Profile Picture Upload Section */}
            <form onSubmit={handleUploadProfilePicture} className="upload-picture-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    required
                />
                <button type="submit" className="upload-button">Upload Profile Picture</button>
            </form>

            <div className="wallet-section">
                <h2>Wallet</h2>
                <p><strong>Balance:</strong> {user.wallet.balance} {user.wallet.currency}</p>

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

            <button onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}

export default Profile;

import React from 'react';

function UserDashboard({ user }) {
    return (
        <div className="user-dashboard">
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <h2>Your Dashboard</h2>
            <ul>
                <li>Manage Teams</li>
                <li>Schedule Matches</li>
                <li>View Grounds</li>
                <li>Financial Summary</li>
            </ul>
        </div>
    );
}

export default UserDashboard;

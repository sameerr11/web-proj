import React, { useState, useEffect } from 'react';
import '../styles/ground-manager.css';  // Adjust path based on your folder structure

function GroundManager() {
    const [grounds, setGrounds] = useState([]);
    const [newGround, setNewGround] = useState({ name: '', location: '', capacity: '', facilities: '' });

    useEffect(() => {
        fetch('/api/grounds')
            .then((res) => res.json())
            .then((data) => setGrounds(data));
    }, []);

    const addGround = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/grounds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newGround,
                facilities: newGround.facilities.split(',').map((f) => f.trim()),
            }),
        });

        if (response.ok) {
            const addedGround = await response.json();
            setGrounds([...grounds, addedGround]);
            setNewGround({ name: '', location: '', capacity: '', facilities: '' });
        }
    };

    return (
        <div className="ground-manager">
            <h2>Manage Grounds</h2>
            <form onSubmit={addGround}>
                <input
                    type="text"
                    placeholder="Ground Name"
                    value={newGround.name}
                    onChange={(e) => setNewGround({ ...newGround, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newGround.location}
                    onChange={(e) => setNewGround({ ...newGround, location: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={newGround.capacity}
                    onChange={(e) => setNewGround({ ...newGround, capacity: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Facilities (comma-separated)"
                    value={newGround.facilities}
                    onChange={(e) => setNewGround({ ...newGround, facilities: e.target.value })}
                />
                <button type="submit">Add Ground</button>
            </form>
            <ul>
                {grounds.map((ground) => (
                    <li key={ground._id} className="ground-item">
                        <h3>{ground.name}</h3>
                        <p>Location: {ground.location}</p>
                        <p>Capacity: {ground.capacity || 'N/A'}</p>
                        <p>Facilities: {ground.facilities.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroundManager;

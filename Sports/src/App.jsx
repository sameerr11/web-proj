import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Ensure the API endpoint matches the backend route
        axios.get('/api/')
            .then(response => setMessage(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Frontend-Backend Integration</h1>
            <p>{message}</p>
        </div>
    );
};

export default App;

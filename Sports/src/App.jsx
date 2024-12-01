import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TeamManager from './components/TeamManager';
import MatchScheduler from './components/MatchScheduler';
import GroundManager from './components/GroundManager';
import Ecommerce from './components/Ecommerce';
import './styles/global.css'; 

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Set the mode on page load
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') || 'light';
        setIsDarkMode(storedMode === 'dark');
        document.body.classList.add(storedMode === 'dark' ? 'dark-mode' : 'light-mode');
    }, []);

    const toggleTheme = () => {
        const newMode = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.body.classList.remove(isDarkMode ? 'dark-mode' : 'light-mode');
        document.body.classList.add(newMode);
        localStorage.setItem('theme', newMode); // Save to localStorage
    };

    return (
        <div className="App">
            <button onClick={toggleTheme} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            <Dashboard />
            <TeamManager />
            <MatchScheduler />
            <GroundManager />
            <Ecommerce />
        </div>
    );
}

export default App;

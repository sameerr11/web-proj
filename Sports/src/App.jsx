import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TeamManager from './components/TeamManager';
import MatchScheduler from './components/MatchScheduler';
import GroundManager from './components/GroundManager';
import Ecommerce from './components/Ecommerce';
import './styles/global.css'; // Ensure this is the correct path for global styles

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Set the mode on page load (on initial load)
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') || 'light';
        setIsDarkMode(storedMode === 'dark');
        document.body.classList.add(storedMode === 'dark' ? 'dark-mode' : 'light-mode');
    }, []);

    // Toggle the theme when button is clicked
    const toggleTheme = () => {
        const newMode = isDarkMode ? 'light' : 'dark'; // Toggle the mode
        setIsDarkMode(!isDarkMode); // Update state

        // Remove the previous mode class and add the new mode class
        document.body.classList.remove(isDarkMode ? 'dark-mode' : 'light-mode');
        document.body.classList.add(newMode === 'dark' ? 'dark-mode' : 'light-mode');

        // Save the theme choice to localStorage
        localStorage.setItem('theme', newMode); // Store the selected mode in localStorage
    };

    return (
        <div className="App">
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            
            {/* Render all components */}
            <Dashboard />
            <TeamManager />
            <MatchScheduler />
            <GroundManager />
            <Ecommerce />
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import routing
import Dashboard from './components/Dashboard';
import TeamManager from './components/TeamManager';
import MatchScheduler from './components/MatchScheduler';
import GroundManager from './components/GroundManager';
import Ecommerce from './components/Ecommerce';
import Login from './components/Login'; // Assuming you have this component
import Register from './components/Register'; // Assuming you have this component
import './styles/global.css'; // Ensure this is the correct path for global styles

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // To track authentication

    // Set the mode on page load (on initial load)
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') || 'light';
        setIsDarkMode(storedMode === 'dark');
        document.body.classList.add(storedMode === 'dark' ? 'dark-mode' : 'light-mode');
        
        // Check if token exists for authentication state
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // If token exists, set authenticated to true
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
        <Router>
            <div className="App">
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                    Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>

                {/* Render Routes */}
                <Routes>
                    {/* If authenticated, show Dashboard and other components */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team-manager" element={<TeamManager />} />
                            <Route path="/match-scheduler" element={<MatchScheduler />} />
                            <Route path="/ground-manager" element={<GroundManager />} />
                            <Route path="/ecommerce" element={<Ecommerce />} />
                        </>
                    ) : (
                        // If not authenticated, redirect to Login
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            {/* Redirect to login page if trying to access a protected route */}
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

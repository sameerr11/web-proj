import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DashboardContainer from './components/DashboardContainer';
import TeamManager from './components/TeamManager';
import MatchScheduler from './components/MatchScheduler';
import GroundManager from './components/GroundManager';
import Ecommerce from './components/Ecommerce';
import Login from './components/Login'; 
import Register from './components/Register';
import GetTicket from './components/GetTicket';
import Feedback from './components/Feedback';
import './styles/global.css'; 
import Profile from './components/Profile';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Set the mode on page load (on initial load)
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') || 'light';
        setIsDarkMode(storedMode === 'dark');
        document.body.classList.add(storedMode === 'dark' ? 'dark-mode' : 'light-mode');
        
        // Check if token exists for authentication state
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Toggle the theme when button is clicked
    const toggleTheme = () => {
        const newMode = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode); 

        // Remove the previous mode class and add the new mode class
        document.body.classList.remove(isDarkMode ? 'dark-mode' : 'light-mode');
        document.body.classList.add(newMode === 'dark' ? 'dark-mode' : 'light-mode');

        // Save the theme choice to localStorage
        localStorage.setItem('theme', newMode);
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
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<DashboardContainer />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/team-manager" element={<TeamManager />} />
                        <Route path="/match-scheduler" element={<MatchScheduler />} />
                        <Route path="/ground-manager" element={<GroundManager />} />
                        <Route path="/ecommerce" element={<Ecommerce />} />
                        <Route path="/get-ticket" element={<GetTicket />} />
                        <Route path="/feedback" element={<Feedback />} />
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

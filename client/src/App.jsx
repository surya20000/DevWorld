import './App.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Motion from './components/Motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link">DevWorld</Link>
            <div className="navbar-links">
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/users" className="navbar-link">New User</Link>
                <Link to="/uploadMedias" className="navbar-link">Upload Projects</Link>
                <Link to="/displayMedias" className="navbar-link">Browse Projects</Link>
            </div>
        </nav>
    );
};

const App = () => {

    return (
        <>
            <Navbar />
            <AnimatedRoutes />
        </>
    );
};

export default App;

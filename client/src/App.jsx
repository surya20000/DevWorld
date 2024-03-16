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

    const [motionOpen, setMotionOpen] = useState(false);

    const toggleMotion = () => {
        setMotionOpen(prevOpen => !prevOpen);
    };

    const handleClose = () => {
        setMotionOpen(false); // Close the motion
    };

    return (
        <>
            <Navbar />
            <AnimatedRoutes />
            <div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMotion}
                >
                    {motionOpen ? "Close Motion" : "Developer's Message"}
                </motion.button>
                <AnimatePresence
                    initial={false}
                    mode='wait'
                    onExitComplete={() => null}
                >
                    {motionOpen && (
                        <Motion text={"Thankyou for being the part of our community!!"} handleClose={handleClose} />
                    )}
                </AnimatePresence>
            </div>

        </>
    );
};

export default App;

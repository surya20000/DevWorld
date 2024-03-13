import '../components/LandingPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            // transition={{ duration: 2 }}
            exit={{ opacity: 0 }}
            className="landing-page-container"
        >
            <header>
                <h1>Welcome to DevWorld</h1>
                <p>A free platform for developers to showcase their capstone and full-stack web applications.</p>
            </header>
            <main>
                <section className="features">
                    <div className="feature">
                        <h2>Showcase Your Projects</h2>
                        <p>Display your capstone and full-stack web applications to the world.</p>
                    </div>
                    <div className="feature">
                        <h2>Connect with Developers</h2>
                        <p>Network with other developers and get inspired by their projects.</p>
                    </div>
                    <div className="feature">
                        <h2>Learn and Grow</h2>
                        <p>Explore a variety of projects and expand your skills as a developer.</p>
                    </div>
                </section>
                <section className="cta">
                    <h2>Ready to Join?</h2>
                    <div className="cta-buttons">
                        <Link to="/login" className="login-btn"> Login</Link>
                        <Link to="/users" className="signup-btn">Sign Up</Link>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 DevWorld. All rights reserved.</p>
            </footer>
        </motion.div>
    );
};

export default LandingPage;


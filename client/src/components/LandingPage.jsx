import '../components/LandingPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextAnimation from './TextAnimation';

const LandingPage = () => {

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const defaultAnimations = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    }

    const text = "Welcome to DevWorld!!"

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            exit={{ opacity: 0 }}
            className="landing-page-container"
        >
            <header>
                <motion.span
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.02 }}
                    aria-hidden
                >
                    {text.split(" ").map((word) => (
                        <span key={word} className="ib">
                            {word.split("").map((char, index) => (
                                <motion.span
                                    className="ib"
                                    variants={defaultAnimations}
                                    key={index}
                                >
                                    <h1> {char} </h1>
                                </motion.span>
                            ))}
                            &nbsp;
                        </span>
                    ))}
                </motion.span>
                {<TextAnimation/>}
            </header >
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
        </motion.div >
    );
};

export default LandingPage;


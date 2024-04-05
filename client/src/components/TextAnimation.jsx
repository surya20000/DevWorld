import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TextAnimation.css'

const TextAnimation = () => {
    const phrases = [
        " showcase their capstone",
        " Connect with other developers",
        " Generate a patent certificate",
        " Get Inspiration from other developers"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='phrases'>
            <b>A free platform for developers to</b>
            <motion.span
                key={phrases[index]}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
                {phrases[index]}
            </motion.span>
        </div>
    );
};

export default TextAnimation;

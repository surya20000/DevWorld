import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import '../App.css';
import PropTypes from 'prop-types';

const Motion = ({ text, handleClose }) => {


    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                className="modal"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
            >
                <p>{text}</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                >
                    Close</motion.button>
            </motion.div>
        </Backdrop>
    );
};

Motion.propTypes = {
    handleClose: PropTypes.func.isRequired,
};

export default Motion;

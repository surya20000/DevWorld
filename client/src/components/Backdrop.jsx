import { motion } from "framer-motion"
import '../App.css'
import PropTypes from 'prop-types';

const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

Backdrop.propTypes = {
    children: PropTypes.node.isRequired, 
    onClick: PropTypes.func.isRequired, 
};

export default Backdrop

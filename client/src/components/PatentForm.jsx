import { useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import './PatentForm.Module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motion from './Motion';

const PatentForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [projectname, setProjectName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleInfo = (e) => {
        e.preventDefault();

        axios.post(`${backend_Uri}/media/devInfo`, { name, email, projectname, password })
            .then(response => {
                console.log("Info added Successfully", response.data, response.token);
                setSuccessMessage("Info added Successfully");
                setErrorMessage(""); 
                setTimeout(() => { navigate('/displayMedias'), console.log("You are being redirected") }, 1000)

            })
            .catch(error => {
                console.error("Error", error);
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error.map(err => err.message).join(", "));
                } else {
                    setErrorMessage("Error adding info. Please try again.");
                }
                setSuccessMessage(""); 
            });
    }

    const handleClose = () => {
        setSuccessMessage("")
        setErrorMessage("")
    }

    return (
        <div className="form-container">
            <form onSubmit={handleInfo}>
                <p className='formH'> Sign up for Patent </p>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Enter Name</label>
                    <input type="text" name="name" id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Enter Email</label>
                    <input type="email" name="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="text">Projectname</label>
                    <input type="text" name="text" id="text" className="form-input" value={projectname} onChange={(e) => setProjectName(e.target.value)} placeholder="Eg: B-tech 1st year" required />
                </div>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="form-button"
                >
                    Submit
                </motion.button>
            </form>
            {successMessage && <Motion text={successMessage} handleClose={handleClose} />}
            {errorMessage && <Motion text={errorMessage} handleClose={handleClose} />}
        </div>
    );
};

export default PatentForm;
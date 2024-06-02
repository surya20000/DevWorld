import { useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import styles from "../components/PatentForm.module.css";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motion from './Motion';
import img1 from "../assets/2.png";

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
        <div className={styles.container}>
                <div className={styles.imageSection}>
                      <img src={img1} alt="image" className={styles.image} />
                </div>
                <div className={styles.formcontainer}>
                <form onSubmit={handleInfo}>
                <p className={styles.heading}> Sign up for Patent </p>
                <div className={styles.formInput}>
                    <label className="form-label" htmlFor="name">Enter Name</label>
                    <input type="text" name="name" id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className={styles.formInput}>
                    <label className="form-label" htmlFor="email">Enter Email</label>
                    <input type="email" name="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.formInput}>
                    <label className="form-label" htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={styles.formInput}>
                    <label className="form-label" htmlFor="text">Project Name</label>
                    <input type="text" name="text" id="text" className="form-input" value={projectname} onChange={(e) => setProjectName(e.target.value)}  required />
                </div>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.9 }}

                    className={styles.formButton}
                >
                    Submit
                </motion.button>
            </form>
            {successMessage && <Motion text={successMessage} handleClose={handleClose} />}
            {errorMessage && <Motion text={errorMessage} handleClose={handleClose} />}
                </div>
        </div>
    );
};

export default PatentForm;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import './PatentForm.Module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from 'framer-motion';
import Motion from './Motion';
import styles from "./Login.module.css";
import "./Button.css";
import img1 from "../assets/o.png";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const { user, loginWithPopup, loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
    const [logedIn, setLogedIn] = useState("")
    const [signedInWithGoogle, setSignedInWithGoogle] = useState(false);
    console.log(user);
    const handleClose = () => {
        setSuccessMsg("");
        setErrMsg("")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backend_Uri}/media/login`, { email, password }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })

            .then(res => {
                console.log("Response", res);
                document.cookie = `jwt=${res.data}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
                localStorage.setItem('jwt', res.data)
                console.log("Cookie", document.cookie);
                setSuccessMsg("Logged In Successfully");
                setLogedIn(true)
                setErrMsg("");
                setTimeout(() => navigate('/displayMedias'), 1000);
                onLogin();
            })
            .catch(error => {
                console.log("Err", error);
                setErrMsg("No such user Exist!!");
                setSuccessMsg("");
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={img1} alt="Your Image" />
            </div>
            <div className={styles.formSection}>
                {
                    isAuthenticated || logedIn ?
                        <>
                            {navigate('/displayMedias')}
                        </>
                        :
                        <form className={styles.formcontainer}>

                            <span className={styles.heading}>Welcome back!</span>
                            <p className={styles.text}>Please enter your login details</p>
                            <div className={styles.formInput}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input type="password" placeholder='Password' id='password' name="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className={styles.formController}>
                            </div>
                            <button onClick={loginWithRedirect} className="login-with-google-btn">Login in with Google</button>
                            <motion.button onClick={handleSubmit} className="animated-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="arr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                </svg>
                                <span className="text">S U B M I T</span>
                                <span className="circle"></span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="arr-1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                </svg>
                            </motion.button>
                            {successMsg === "Logged In Successfully" && <Motion text={successMsg} handleClose={handleClose} />}
                            {errMsg === "No such user Exist!!" && <Motion text={errMsg} handleClose={handleClose} />}
                        </form>
                }
            </div>

        </div >
    );
};

export default Login;

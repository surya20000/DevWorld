import { useState } from 'react'
import axios from 'axios'
import { backend_Uri } from '../config/constants'
import { useNavigate } from 'react-router-dom'
import './PatentForm.Module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motion from './Motion';
import img1 from '../assets/o.png';
import styles from './Users.module.css';
import "./Button.css";
import { useAuth0 } from "@auth0/auth0-react";

const Users = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errMsg, seterrMsg] = useState("")
    const navigate = useNavigate()
    const { user,loginWithRedirect, isAuthenticated, } = useAuth0();


    const handleClose = () => {
        setSuccessMsg("");
        seterrMsg("")
    };

    const handelSubmit = (e) => {
        e.preventDefault()
        axios.post(`${backend_Uri}/media/createUser`, { name, email, password })
            .then(res => {
                console.log("Response", res.data)
                localStorage.setItem("email", res.userInfo.email)
                setSuccessMsg("User Created Successfully")
                localStorage.setItem("signedIn",true)
                seterrMsg("")
                setTimeout(() => navigate('/displayMedias'), 1000)
            })
            .catch(error => {
                console.log("Error", error)
                if (error.response && error.response.data && error.response.data.error) {
                    seterrMsg(error.response.data.error.map(err => err.message).join(", "));
                } else {
                    seterrMsg("Error adding info. Please try again.");
                }
                setSuccessMsg("");
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={img1} alt="Your Image" />
            </div>
            <div className={styles.formSection}>
                <div className={styles.formcontainer}>

                    <form className={styles.formInput}>
                        <input type="text" name='text' required placeholder='Name' id='Name' onChange={(e) => setName(e.target.value)} />
                        <input type="email" name='email' id='email' required placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name='name' id='password' required placeholder='Password' className='form-input' onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <button onClick={()=>loginWithRedirect()} className="login-with-google-btn">Sign in with Google</button>
                    <motion.button
                        onClick={handelSubmit}
                        className='animated-button' >    <svg
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
                    <Link to='/patentForm'><span className={styles.users_a}> Sign up as developer </span></Link>
                    {successMsg && <Motion text={successMsg} handleClose={handleClose} />}
                    {errMsg && <Motion text={errMsg} handleClose={handleClose} />}
                </div>
            </div>
        </div>
    )
}

export default Users
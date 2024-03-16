import { useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import './PatentForm.Module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from 'framer-motion';
import Motion from './Motion'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
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
                setErrMsg("");
                setTimeout(() => navigate('/displayMedias'), 1000);
            })
            .catch(error => {
                console.log("Err", error);
                setErrMsg("No such user Exist!!");
                setSuccessMsg("");
            });
    };
    

    return (
        <div>
            {
                isAuthenticated ?
                    <>
                        {isAuthenticated && <h3> Hello {user.name} </h3>}
                        <>
                            <button onClick={logout}> Log Out </button>
                        </>
                    </>

                    :

                    <form className='form-container'>
                        <span className='heading'>Login</span>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' id='email' name="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' id='password' name="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className='formController'>
                        </div>
                        <button onClick={loginWithRedirect}>Continue with Auth0</button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSubmit}>Submit
                        </motion.button>
                        {successMsg === "Logged In Successfully" && <Motion text={successMsg} handleClose={handleClose} />} 
                        {errMsg === "No such user Exist!!" && <Motion text={errMsg} handleClose={handleClose}/>}
                    </form>
            }
        </div>
    );
};

export default Login;

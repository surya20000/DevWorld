import { useState } from 'react'
import axios from 'axios'
import { backend_Uri } from '../config/constants'
import { useNavigate } from 'react-router-dom'
import './PatentForm.Module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motion from './Motion';

const Users = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errMsg, seterrMsg] = useState("")
    const navigate = useNavigate()
    // const [motionOpen, setMotionOpen] = useState(false);


    const handleClose = () => {
        // setMotionOpen(false); // Close the motion
        setSuccessMsg("");
        seterrMsg("")
    };

    const handelSubmit = (e) => {
        e.preventDefault()
        axios.post(`${backend_Uri}/media/createUser`, { name, email, password })
            .then(res => {
                console.log("Response", res.data)
                setSuccessMsg("User Created Successfully")
                seterrMsg("")
                setTimeout(() => navigate('/displayMedias'), 1000)
            })
            .catch(error => {
                console.log("Error", error)
                if (error.response && error.response.data && error.response.data.error) {
                    // Server returned validation error messages
                    seterrMsg(error.response.data.error.map(err => err.message).join(", "));
                } else {
                    seterrMsg("Error adding info. Please try again.");
                }
                setSuccessMsg(""); // Clear any previous success messages
            })
    }

    return (
        <div className="form-container">
            <form>
                <label htmlFor="name" name="name">Name</label>
                <input type="text" name='name' required placeholder='name' id='name' onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email" name="email">Email</label>
                <input type="email" name='email' id='email' required placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" name="password">Password</label>
                <input type="password" name='name' id='password' required placeholder='password' className='form-input' onChange={(e) => setPassword(e.target.value)} />
            </form>
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                type='submit'
                onClick={handelSubmit}
                > Submit
            </motion.button>
            <Link to='/patentForm'><span className='at'> Sign up as developer </span></Link>
            {successMsg && <Motion text={successMsg} handleClose={handleClose} />}
            {errMsg && <Motion text={errMsg} handleClose={handleClose} />}
        </div>
    )
}

export default Users

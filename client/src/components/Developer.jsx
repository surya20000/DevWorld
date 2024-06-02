import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { useParams } from 'react-router-dom';
import styles from './Dev.module.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Developer = () => {
    const { email } = useParams()
    const [developerInfo, setDeveloperInfo] = useState(null);
    console.log(email)
    useEffect(() => {
        const fetchDeveloperInfo = async () => {
            try {
                const response = await axios.get(`${backend_Uri}/media/getDeveloper/${email}`);
                setDeveloperInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching developer info:', error);
            }
        };

        fetchDeveloperInfo();
    }, []);
    const dateObj = new Date(developerInfo && developerInfo.date)
    const day = dateObj.getDate()
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()
    const formatDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`
    return (
        <div>
            <h2>Developer Information</h2>
            {developerInfo ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: 0.1 }}
                >
                    <div className={styles.certificateContainer}>
                        <h3 className={styles.certificatetitle}>Patent Certificate</h3>
                        <p className={styles.certificatebody}>
                            This certificate is awarded to {developerInfo.name} in recognition of their
                            contribution to the development of the project named <b> {developerInfo.projectname} </b>.
                        </p>
                        <p className={styles.certificatefooter}>
                            Issued on {formatDate}.
                        </p>
                    </div>
                    <p>Name: {developerInfo.name}</p>
                    <p>Email: {developerInfo.email}</p>
                    <Link to='/displayMedias'> <button> Back </button> </Link>
                    <hr />
                </motion.div>
            ) : (
                <p>Loading developer information...</p>
            )}
        </div>
    );

};

export default Developer;

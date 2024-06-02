import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { Link, useNavigate } from 'react-router-dom';
import Motion from './Motion';
import styles from "./UploadForm.module.css"
import img1 from '../assets/3.png';

const UploadForm = ({ getAllMedias }) => {
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [deployedLink, setDeployedLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [successMsg, setSuccessMessage] = useState("")
  const [errMsg, setErrMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("deployedLink", deployedLink);

    for (let key in videos) {
      formData.append("videos", videos[key]);
    }
    axios.post(`${backend_Uri}/media/create`, formData)
      .then(() => {
        setSuccessMessage("Data Added Successfully, Get a Patent for yourself");
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setErrMessage(error.response.data.error.map(err => err.message).join(", "));
        } else {
          setErrMessage("Error adding info. Please try again.");
        }
        setSuccessMessage("");
      });
  };

  const handleClose = () => {
    setSuccessMessage("");
    setErrMessage("");
  };

  useEffect(() => {
    const locallog = localStorage.getItem("logedIn");
    if (locallog === "false") {
      navigate('/login');
    }
    axios.get(`${backend_Uri}/media/developer/${localStorage.getItem("email")}`)
      .then((res) => {
        if (res.data.data === false) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.Image}>
           <img src={img1} alt="" />
      </div>
      <div className={styles.formcontainer}>
         
      
        <form onSubmit={handleSubmit}>
          <div className={styles.formInput}>
            <label htmlFor="email">Email</label>
            <input  name='email' id='email' className='formInput' onChange={(e) => { setEmail(e.target.value); }} placeholder='Enter your email' />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="Projectname">Project Name</label>
            <input  name='Projectname' id='Projectname' className='formInput' onChange={(e) => { setProjectName(e.target.value); }} placeholder='Capstone project name' />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="projectDescription">Project Description</label>
            <input  name='projectDescription' id='projectDescription' className='formInput' onChange={(e) => { setProjectDescription(e.target.value); }} placeholder='Description of your project' />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="deployedLink">Share Deployed link</label>
            <input type="url" name='deployedLink' id='deployedLink' className='formInput' onChange={(e) => { setDeployedLink(e.target.value); }} placeholder='http://abc@netlify.com' />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="videos">Upload Videos</label>
            <input type="file" name='videos' id='videos' multiple className='formInput' accept='.mp4, .mkv' onChange={(e) => { setVideos(e.target.files); }} />
          </div>
          <button>Submit</button>
          <div className='endbtns'>
            <Link to="/displayMedias"><button className='workBtn'>Continue</button></Link>
            <Link to="/patentForm"><button className='workBtn'>Get a Patent</button></Link>
          </div>
          {errMsg && <Motion text={errMsg} handleClose={handleClose} />}
          {successMsg && <Motion text={successMsg} handleClose={handleClose} />}
        </form>
      </div>
    </div>
  
  );
};

export default UploadForm;
import { useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { Link } from 'react-router-dom';
import '../components/Components.css'
import './PatentForm.Module.css'
import Motion from './Motion';

const UploadForm = ({ getAllMedias }) => {
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [deployedLink, setDeployedLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [successMsg, setSuccessMessage] = useState("")
  const [errMsg, setErrMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email)
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("deployedLink", deployedLink);

    for (let key in videos) {
      formData.append("videos", videos[key]);
    }
    console.log(formData);
    axios.post(`${backend_Uri}/media/create`, formData)
      .then(success => {
        getAllMedias();
        console.log('Video Added successfully', success.message);
        setSuccessMessage("Data Added Successfully,Get a Patent for yourself")
      })
      .catch(error => {
        console.error("Error", error.message);
        if (error.response && error.response.data && error.response.data.error) {
          // Server returned validation error messages
          setErrMessage(error.response.data.error.map(err => err.message).join(", "));
        } else {
          setErrMessage("Error adding info. Please try again.");
        }
        setSuccessMessage(""); // Clear any previous success messages
      });

  };

  const handleClose = () => {
    setSuccessMessage("");
    setErrMessage("")
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className='formGroup'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' className='formInput' onChange={(e) => { setEmail(e.target.value), console.log(email) }} placeholder='Enter your email' />
        </div>
        <div className='formGroup'>
          <label htmlFor="Projectname">Project Name</label>
          <input type="text" name='Projectname' id='Projectname' className='formInput' onChange={(e) => { setProjectName(e.target.value), console.log(projectName) }} placeholder='Capstone project name' />
        </div>
        <div className='formGroup'>
          <label htmlFor="projectDescription">Project Description</label>
          <input type="text" name='projectDescription' id='projectDescription' className='formInput' onChange={(e) => { setProjectDescription(e.target.value), console.log(projectDescription) }} placeholder='Description of your project' />
        </div>
        <div className='formGroup'>
          <label htmlFor="deployedLink">Share Deployed link</label>
          <input type="url" name='deployedLink' id='deployedLink' className='formInput' onChange={(e) => { setDeployedLink(e.target.value), console.log(deployedLink) }} placeholder='http://abc@netlify.com' />
        </div>
        <div className='formGroup'>
          <label htmlFor="videos">Upload Videos</label>
          <input type="file" name='videos' id='videos' multiple className='formInput' accept='.mp4, .mkv' onChange={(e) => { setVideos(e.target.files), console.log(videos) }} />
        </div>
        <button type='submit'>Submit</button>
        <div className='endbtns'>
          <Link to="/displayMedias"> <button className='workBtn'> Continue </button> </Link>
          <Link to="/patentForm"> <button className='workBtn'> Get a Patent </button> </Link>
        </div>
        {errMsg && <Motion text={errMsg} handleClose={handleClose} />}
        {successMsg && <Motion text={successMsg} handleClose={handleClose} />}

      </form>
    </div>
  );
};

export default UploadForm;
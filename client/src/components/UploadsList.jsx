import { useState, useEffect } from 'react';
import { backend_Uri } from '../config/constants';
import '../components/Components.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAuth0 } from "@auth0/auth0-react";

const UploadsList = ({ setSelected, item }) => {
  const [mediaWithDeveloperInfo, setMediaWithDeveloperInfo] = useState([]);
  const { logout } = useAuth0();
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { user, getAccessTokenSilently } = useAuth0();
  const [seachProject, setSearchProject] = useState("")
  const [list, setList] = useState([])

  useEffect(() => {
    const res = mediaWithDeveloperInfo.filter(media => media.projectName === seachProject)
    setList([...res])
  }, [seachProject])


  const tokenByauth0 = async () => {
    const token = await getAccessTokenSilently()
    console.log("token by OAuth0", token);
    console.log(user);
    localStorage.setItem('jwt', token)
  }

  const googleSignIn = () => {
    axios.post(`${backend_Uri}/media/signInByGoogle`, { name: user.name, email: user.email })
      .then(res => {
        console.log("Response", res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllMediaWithDeveloperInfo();
    tokenByauth0();
    if (location.state && location.state.signedInWithGoogle) {
      googleSignIn();
    }
  }, []);


  const getAllMediaWithDeveloperInfo = async () => {
    try {
      const response = await axios.get(`${backend_Uri}/media/allWithDeveloperInfo`);
      setMediaWithDeveloperInfo(response.data);
      console.log(response.data);
      const animation = animate(count, response.data.length, { duration: 1 });
      return animation.stop;
    } catch (error) {
      console.error('Error fetching media with developer info:', error);
    }
  };


  const filterProjects = seachProject === "" ? mediaWithDeveloperInfo : mediaWithDeveloperInfo.filter(media => media.projectName === seachProject)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}

      exit={{ opacity: 0 }}
      className="uploads-list-container"
    >
      <div className="wrapper">
        <input type="text" name="search" id="search" placeholder='Search project by name' onChange={(e) => setSearchProject(e.target.value)} />
        <motion.div layout className="suggestions">
          {seachProject && (
            <>
              {mediaWithDeveloperInfo.map((media) => (
                media.projectName.includes(seachProject) && (
                  <motion.div layout key={media.projectName} className="list">
                    {media.projectName}
                  </motion.div>
                )
              ))}
            </>
          )}
        </motion.div>
      </div>
      <p className='contribution-statement'>
        An honor to present
        <motion.span
          className='contribution-number'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {rounded}
        </motion.span>
        + contributions!!
      </p>
      <motion.div
        className="project-cards-container"
        initial={{
          opacity: 0,
          y: 50
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 1
          }
        }}
        viewport={{ once: true }}
        exit={{
          opacity: 0,
          y: -50
        }}
      >
        {filterProjects.map(media => (
          <div className="project-card" key={media._id}>
            <h3 className="project-name">{media.projectName}</h3>
            <div className='projDes'>
              <span> Description: </span><p className="project-description">{media.projectDescription}</p>
            </div>
            <div className="project-links">
              <a href={media.deployedLink} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
              </a>
              {media.developerInfo ? (
                <Link to={`/developer/${media.developerInfo.email}`} className="project-link">
                  <span> Developer </span>{media.developerInfo.name}
                </Link>
              ) : (
                <span className="not-available">Developer Info Not Available</span>
              )}
              <Link to={`/editMedia/${media._id}`} className="action-link">Edit</Link>
            </div>
            <div className="videos-container">
              {media.videos.map((video, index) => (
                <div className="video" key={index}>
                  <video className="uploaded-video" preload='auto' controls>
                    <source src={`${backend_Uri}${video.replace(/\\/g, '/')}`} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      <motion.button
        onClick={logout}
        className='logoutbtn'
        whileTap={{ scale: 0.85 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default UploadsList;


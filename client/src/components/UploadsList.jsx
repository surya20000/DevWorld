import { useState, useEffect } from 'react';
import { backend_Uri } from '../config/constants';
import '../components/Components.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import './Uploadlist.css';

const UploadsList = ({ setSelected, item }) => {
  const [mediaWithDeveloperInfo, setMediaWithDeveloperInfo] = useState([]);
  const { logout } = useAuth0();
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { user, getAccessTokenSilently } = useAuth0();
  const [searchProject, setSearchProject] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const res = mediaWithDeveloperInfo.filter(media => media.projectName.toLowerCase().includes(searchProject.toLowerCase()));
    setList([...res]);
  }, [searchProject, mediaWithDeveloperInfo]);

  const tokenByauth0 = async () => {
    const token = await getAccessTokenSilently();
    localStorage.setItem('jwt', token);
  };

  const googleSignIn = () => {
    axios.post(`${backend_Uri}/media/signInByGoogle`, { name: user.name, email: user.email })
      .then(res => {
        console.log("Response", res.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getAllMediaWithDeveloperInfo();
    tokenByauth0();
    if (location.state && location.state.signedInWithGoogle) {
      googleSignIn();
    }
    const locallog = localStorage.getItem("logedIn");
    if (locallog === "false") {
      navigate('/login');
    }
  }, []);

  const getAllMediaWithDeveloperInfo = async () => {
    try {
      const response = await axios.get(`${backend_Uri}/media/allWithDeveloperInfo`);
      setMediaWithDeveloperInfo(response.data);
      animate(count, response.data.length, { duration: 1 });
    } catch (error) {
      console.error('Error fetching media with developer info:', error);
    }
  };

  const handleSuggestionClick = (projectName) => {
    setSearchProject(projectName);
  };

  // Function to toggle full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      exit={{ opacity: 0 }}
      className="uploads-list-container"
    >
      <div className='Heading'>
        <h1 className='explore'>
          "Elevating Achievements, Celebrating Success: Your Path to Recognition Begins Here!"
        </h1>
        <p className='para'>Explore projects..Get Certificate for yourself..Be Own</p>
        <div className="wrapper">
          <input type="input" name="search" id="search" placeholder='Search project by name' value={searchProject} onChange={(e) => setSearchProject(e.target.value)} />
          <motion.div layout className="suggestions">
            {searchProject && (
              <>
                {mediaWithDeveloperInfo.map((media) => (
                  media.projectName.toLowerCase().includes(searchProject.toLowerCase()) && (
                    <motion.div layout key={media.projectName} className="list" onClick={() => handleSuggestionClick(media.projectName)}>
                      {media.projectName}
                    </motion.div>
                  )
                ))}
              </>
            )}
          </motion.div>
        </div>
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
        {list.map(media => (
          <div className="card" key={media._id}>
            <Link to={`/editMedia/${media._id}`} className="action-link">
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <div className='projectflex'>
              <div className="project-info">
                {media.developerInfo ? (
                  <Link to={`/developer/${media.developerInfo.email}`} className="developerInfo">
                    {media.developerInfo.name}
                  </Link>
                ) : (
                  <span className="not-available">Developer Info Not Available</span>
                )}
              </div>
              <div className="videos-container">
                {media.videos.map((video, index) => (
                  <div className="video" key={index}>
                    <video className="image" preload='auto' controls>
                      <source src={`${backend_Uri}${video.replace(/\\/g, '/')}`} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
              <div className='card-info'>
                <span>{media.projectName}</span>
                <a href={media.deployedLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project
                </a>
                <div>
                  <h4 className="project-description">
                    Description: {showFullDescription ? media.projectDescription : `${media.projectDescription.substring(0, 7)}...`}
                    {media.projectDescription.length > 3 && (
                      <h4 onClick={toggleDescription} className="readmore">
                        {showFullDescription ? 'Read Less' : 'Read More'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </h4>
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.button
        onClick={() => {
          logout();
          localStorage.setItem('logedIn', false);
          localStorage.setItem('signedIn', false);
        }}
        className='logoutbtn'
        whileTap={{ scale: 0.85 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default UploadsList;
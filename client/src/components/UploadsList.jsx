import { useState, useEffect } from 'react';
import { backend_Uri } from '../config/constants';
import '../components/Components.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const UploadsList = () => {
  const [mediaWithDeveloperInfo, setMediaWithDeveloperInfo] = useState([]);

  useEffect(() => {
    getAllMediaWithDeveloperInfo();
  }, []);

  const getAllMediaWithDeveloperInfo = async () => {
    try {
      const response = await axios.get(`${backend_Uri}/media/allWithDeveloperInfo`);
      setMediaWithDeveloperInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching media with developer info:', error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      
      exit={{opacity:0}}
      className="uploads-list-container">
      <div className="project-cards-container">
        {mediaWithDeveloperInfo.map(media => (
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
      </div>
    </motion.div>
  );
};

export default UploadsList;


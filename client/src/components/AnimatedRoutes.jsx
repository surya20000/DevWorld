import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Users from '../components/Users';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { AnimatePresence } from 'framer-motion';
import UploadForm from '../components/UploadForm';
import Login from '../components/Login';
import PatentForm from '../components/PatentForm';
import UploadsList from '../components/UploadsList';
import EditCapstone from './EditCapstone';
import Developer from './Developer';
import PrivateRoute from './PrivateRoute'; // Corrected import path

const AnimatedRoutes = () => {
  const [medias, setMedias] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${backend_Uri}/media/all`)
      .then((res) => {
        setMedias(res.data);
        console.log(medias);
      })
      .catch((err) => {
        setMedias([]);
        console.log('Error', err);
      });
  };

  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/uploadMedias"
            element={<PrivateRoute Component={UploadForm} />}
          />
          <Route path="/displayMedias" element={<PrivateRoute Component={UploadsList}  />} />
          <Route path="/developer/:email" element={<Developer />} />
          <Route path="/patentForm" element={<PatentForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editMedia/:id" element={<EditCapstone />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedRoutes;

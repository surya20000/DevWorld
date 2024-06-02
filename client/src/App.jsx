import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';
import Motion from './components/Motion';
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const { isAuthenticated, logout } = useAuth0();

  const navigate = useNavigate();

  const handleClose = () => {
    setLoginMsg("");
  };

  const handleBrowseProjects = () => {
    if (isAuthenticated) {
      navigate('/displayMedias');
    } else {
      setLoginMsg("Please Login to continue");
    }
  };

  const LoginBtn=()=>{
    navigate('/login')
    // window.location.reload()
  }

  const handelUploadProjects = () =>{
    if (isAuthenticated){
      navigate('/uploadMedias')
    }else{
      setLoginMsg("Please Login to continue")
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">DevWorld</Link>
      <div className="navbar-links">
        <div className="navbar-link" onClick={LoginBtn}>Login</div>
        <Link to="/users" className="navbar-link">New User</Link>
        <Link to="/uploadMedias" className="navbar-link"> Upload Projects </Link>
        <Link to="/displayMedias" className='navbar-link' > Browse Projects </Link>
      </div>
      {loginMsg && <Motion text={loginMsg} handleClose={handleClose} />}
    </nav>
  );
};


const App = () => {
  const [motionOpen, setMotionOpen] = useState(false);

  const toggleMotion = () => {
    setMotionOpen(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setMotionOpen(false); 
  };

  const [loginMsg, setLoginMsg] = useState("");
  const { isAuthenticated } = useAuth0();

  const handleLogin = () => {
    setLoginMsg("Logged In Successfully");
  };

  return (
    <>
      <Navbar onLogin={handleLogin} />
      <AnimatedRoutes />
      <div>
      </div>
    </>
  );
};

export default App;

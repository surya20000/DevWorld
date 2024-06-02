import { motion } from "framer-motion";
import TextAnimation from "./TextAnimation";
import { useNavigate } from "react-router-dom";
import LandingMini from "../assets/LandingMini.png";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const defaultAnimations = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const text = "Welcome to DevWorld!!";

  return (
    <>
      <div className="landingImage">
        <img
          src={LandingMini}
          alt="Landing Page"
          className="landing-page-image"
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          exit={{ opacity: 0 }}
          className="landing-text-container"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.02 }}
            aria-hidden
          >
            {text.split(" ").map((word) => (
              <span key={word} className="Welcome">
                {word.split("").map((char, index) => (
                  <motion.span
                    className="ib"
                    variants={defaultAnimations}
                    key={index}
                  >
                    <div className="welcome">
                      <h1> {char} </h1>
                    </div>
                  </motion.span>
                ))}
                &nbsp;
              </span>
            ))}
          </motion.span>
          <TextAnimation />
        </motion.div>

        <button onClick={() => navigate("/login")} className="get-started-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arr-2"
            viewBox="0 0 24 24"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arr-1"
            viewBox="0 0 24 24"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default LandingPage;

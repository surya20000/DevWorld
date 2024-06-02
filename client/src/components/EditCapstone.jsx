import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backend_Uri } from "../config/constants";
import styles from "./UploadForm.module.css";
import Motion from "./Motion";
import "./Uploadlist.css";

const EditCapstone = () => {
  const { id } = useParams();
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [deployedLink, setDeployedLink] = useState();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [errmsg, setErrMsg] = useState("");

  useEffect(() => {
    console.log(`${backend_Uri}/media/getMedia/${id}`);
    axios
      .get(`${backend_Uri}/media/getMedia/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((result) => {
        console.log(result);
        setProjectName(result.data.projectName);
        setProjectDescription(result.data.projectDescription);
        setDeployedLink(result.data.deployedLink);
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        setTimeout(() => {
          navigate("/displayMedias");
        }, 1500);
      });
  }, [id, navigate]);

  const update = (e) => {
    e.preventDefault();
    axios
      .put(
        `${backend_Uri}/media/updateMedia/${id}`,
        { projectName, projectDescription, deployedLink },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        console.log("Data Changed", res.message, res);
        setMsg("Data Updated Successfully!!");
        setTimeout(() => {
          navigate("/displayMedias");
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
      });
  };

  const handleClose = () => {
    setErrMsg("");
    setMsg("");
  };

  return (
    <div className={styles.container}>
      <h2>Update Project</h2>
      <form className={styles.formcontainer} onSubmit={update}>
        <label htmlFor="projectName" className={styles.formInput.label}>
          Project Name:
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className={styles.formInput}
        />
        <label htmlFor="projectDescription" className={styles.formInput.label}>
          Project Description:
        </label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className={styles.formInput}
        ></textarea>
        <label htmlFor="deployedLink" className={styles.formInput.label}>
          Deployed Link:
        </label>
        <input
          type="text"
          id="deployedLink"
          value={deployedLink}
          onChange={(e) => setDeployedLink(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
        {msg && <Motion text={msg} handleClose={handleClose} />}
        {errmsg === "Request failed with status code 401" && (
          <Motion
            text={"Session expired, please login Again"}
            handleClose={handleClose}
          />
        )}
        {errmsg === "You are not the owner of the project!!" && (
          <Motion
            text={"You are not the owner of the project!!"}
            handleClose={handleClose}
          />
        )}
      </form>
    </div>
  );
};

export default EditCapstone;

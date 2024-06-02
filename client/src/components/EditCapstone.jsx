import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { backend_Uri } from '../config/constants'
import styles from './EditCap.module.css'
import Motion from './Motion'

const EditCapstone = () => {
    const { id } = useParams()
    const [projectName, setProjectName] = useState()
    const [projectDescription, setProjectDescription] = useState()
    const [deployedLink, setDeployedLink] = useState()
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")
    const [errmsg, setErrMsg] = useState("")


    useEffect(() => {
        console.log(`${backend_Uri}/media/getMedia/${id}`);
        axios.get(`${backend_Uri}/media/getMedia/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`

            }
        })
            .then(result => {
                console.log(result)
                setProjectName(result.data.projectName)
                setProjectDescription(result.data.projectDescription)
                setDeployedLink(result.data.deployedLink)
            })
            .catch(error => {
                setErrMsg(error.response.data.message)
                console.log("redirecting")
                setTimeout(() => { navigate('/displayMedias'), console.log("redirecting") }, 1500)
            })
    }, [])

    const update = (e) => {
        e.preventDefault();
        axios.put(
            `${backend_Uri}/media/updateMedia/${id}`,
            { projectName, projectDescription, deployedLink },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
            .then(res => {
                console.log("Data Changed", res.message, res);
                setMsg("Data Updated Successfully!!");
                setTimeout(() => {
                    navigate('/displayMedias');
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message)
            });
    };

    const handleClose = () => {
        setErrMsg("")
        setMsg("")
    };

    return (
        <div className={styles.formcontainer}>
            <h2>Update Project</h2>
            <form className="update-form" onSubmit={update}>
                <label htmlFor="projectName">Project Name:</label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="form-control"
                />
                <label htmlFor="projectDescription">Project Description:</label>
                <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="form-control"
                ></textarea>
                <label htmlFor="deployedLink">Deployed Link:</label>
                <input
                    type="text"
                    id="deployedLink"
                    value={deployedLink}
                    onChange={(e) => setDeployedLink(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
                {msg && <Motion text={msg} handleClose={handleClose} />}
                {errmsg === "Request failed with status code 401" && <Motion text={"Session expired, please login Again"} handleClose={handleClose} />}
                {errmsg === "You are not the owner of the project!!" && <Motion text={"You are not the owner of the project!!"} handleClose={handleClose} />}
            </form>
        </div>
    )
}

export default EditCapstone

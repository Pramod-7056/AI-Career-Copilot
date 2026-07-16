import { useEffect,useState } from "react";
import "./Projects.css"

function Project(){
    const [projects,setProjects]=useState([])
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [githubLink,setGithubLink]=useState("")
    const [demoLink,setDemoLink]=useState("")
    const [techStack,setTechStack]=useState("")

    const fetchProjects=async()=>{
        try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);

        setProjects(data.project);

    } catch (error) {
        console.log(error);
    } 
    }

    useEffect(()=>{
        
   fetchProjects();
    },[])

    
       return (
  <div className="projects-page">

    <h1 className="projects-title">🚀 My Projects</h1>

    <div className="project-form">

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="text"
        placeholder="GitHub Link"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
      />

      <input
        type="text"
        placeholder="Live Demo Link"
        value={demoLink}
        onChange={(e) => setDemoLink(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tech Stack (React, Node.js...)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <button>Add Project</button>

    </div>
    <h1>Projects List</h1>
    <br></br>

    <div className="projects-grid">

      {projects.map((project) => (
        <div className="project-card" key={project._id}>

          <h2>{project.title}</h2>

          <p>{project.description}</p>

          <p><strong>Tech:</strong> {project.tech_stack}</p>

          <p><strong>GitHub:</strong> {project.github_link}</p>

          <p><strong>Demo:</strong> {project.demo_link}</p>

        </div>
      ))}

    </div>

  </div>
);
         
            
}
export default Project;
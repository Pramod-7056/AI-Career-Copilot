import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home(){

  const navigate=useNavigate();


  const features = [
  {
    title: "Resume Builder",
    description: "Create an ATS-friendly professional resume.",
    color: "#3B82F6",
    path: "/resume-builder",
  },
  {
    title: "Resume Analyzer",
    description: "Analyze your resume and improve ATS score.",
    color: "#8B5CF6",
    path: "/resume-analyzer",
  },
  {
    title: "Goals & Tasks",
    description: "Manage your daily goals and progress.",
    color: "#22C55E",
    path: "/goals",
  },
  {
    title: "Job Tracker",
    description: "Track all your job applications.",
    color: "#F97316",
    path: "/job-tracker",
  },
  {
    title: "AI Interview",
    description: "Practice HR and technical interviews.",
    color: "#06B6D4",
    path: "/interview",
  },
  {
    title: "Learning Roadmap",
    description: "Get your personalized learning path.",
    color: "#EAB308",
    path: "/roadmap",
  },
  {
    title: "Cover Letter",
    description: "Generate professional cover letters.",
    color: "#EC4899",
    path: "/cover-letter",
  },
  {
    title: "Skill Gap Analyzer",
    description: "Find missing skills for your dream job.",
    color: "#10B981",
    path: "/skills",
  },
];
  return(
    <div className="home-page">
    <div className="home-container">
      <h1 className="home-title">AI Career Copilot</h1>
      <p className="home-subtitle">Your AI-powered placement preparation companion</p>

      <div className="feature-grid">
  {features.map((feature, index) => (
    <div
      key={index}
      className="feature-card"
      style={{ borderTop: `5px solid ${feature.color}` }}
    >
      <h2>{feature.title}</h2>

      <p>{feature.description}</p>

      <button
        onClick={() => {
          if (feature.path === "/goals") {
            navigate("/goals");
          } else {
            alert("Coming Soon 🚀");
          }
        }}
      >
        Open →
      </button>
    </div>
  ))}
</div>
    </div>
    </div>

    
  )
}

export default Home;
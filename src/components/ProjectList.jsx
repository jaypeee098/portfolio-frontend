import { useEffect, useState } from 'react';
import { getProjects } from '../api';
import ProjectCard from './ProjectCard';
 
function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Could not load projects. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
 
    fetchProjects();
  }, []);
 
  if (loading) return <p className="status-message">Loading projects...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (projects.length === 0) return <p className="status-message">No projects yet.</p>;
 
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
 
export default ProjectList;

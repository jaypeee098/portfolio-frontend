import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../api';
import ProjectCard from './ProjectCard';

const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (!cancelled) setProjects(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Could not load projects. Is the backend running?');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="status-message">-- loading projects</p>;
  if (error) return <p className="status-message error">-- {error}</p>;
  if (projects.length === 0) return <p className="status-message">-- no rows returned</p>;

  return (
    <>
      <div className="project-row project-row-header" aria-hidden="true">
        <span>project</span>
        <span>stack</span>
        <span>status</span>
        <span>links</span>
      </div>
      <motion.div
        className="project-rows"
        variants={container}
        initial="initial"
        animate="animate"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default ProjectList;

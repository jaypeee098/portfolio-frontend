function ProjectCard({ project }) {
  return (
    <div className="project-card">
      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          className="project-image"
        />
      )}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
 
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="tech-stack">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}
 
        <div className="project-links">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default ProjectCard;

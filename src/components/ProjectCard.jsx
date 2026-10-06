function ProjectCard({ project }) {
  const status = project.live_link ? 'live' : 'planned';

  return (
    <div className="project-row">
      <div className="project-row-main">
        <h3>
          {project.featured && <span className="featured-marker" aria-hidden="true" />}
          {project.title}
        </h3>
        <p>{project.description}</p>
      </div>

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="tech-stack">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className={`project-status status-${status}`}>{status}</div>

      <div className="project-links">
        {project.github_link && (
          <a href={project.github_link} target="_blank" rel="noopener noreferrer">
            source
          </a>
        )}
        {project.live_link && (
          <a href={project.live_link} target="_blank" rel="noopener noreferrer">
            live
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;

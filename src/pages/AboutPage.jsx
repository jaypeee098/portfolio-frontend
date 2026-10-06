function AboutPage() {
  return (
    <section className="page-section about-section">
      <h2>About</h2>
      <p>
        I'm a self-taught full-stack developer building projects end to
        end — designing the database, writing the API, and building the
        interface that connects to it. This portfolio is itself one of
        those projects: a PostgreSQL database behind an Express API,
        with a React frontend that reads from it live.
      </p>
      <p>
        I'm early in my journey and learning by shipping real, working
        things rather than tutorials — setting up a secure database
        user, writing endpoints, and deploying all of it to the
        internet myself.
      </p>

      <pre className="sql-block">
        <code>
          <span className="sql-kw">create table</span> developer ({'\n'}
          {'  '}role{'        '}text{'    '}<span className="sql-kw">default</span> 'Full-stack developer',{'\n'}
          {'  '}frontend{'    '}text[]{'  '}<span className="sql-kw">default</span> array['React', 'Vite'],{'\n'}
          {'  '}backend{'     '}text[]{'  '}<span className="sql-kw">default</span> array['Node.js', 'Express'],{'\n'}
          {'  '}database{'    '}text{'    '}<span className="sql-kw">default</span> 'PostgreSQL',{'\n'}
          {'  '}environment text{'    '}<span className="sql-kw">default</span> 'Linux (Kali)'{'\n'}
          );
        </code>
      </pre>
    </section>
  );
}

export default AboutPage;

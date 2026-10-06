function ContactPage() {
  return (
    <section className="page-section contact-section">
      <h2>Contact</h2>

      <pre className="sql-block">
        <code>
          <span className="sql-kw">select</span> * <span className="sql-kw">from</span> contact{'\n'}
          <span className="sql-kw">where</span> response_time = 'usually same day';
        </code>
      </pre>

      <div className="contact-links">
        <a href="mailto:johnpauljuma209@gmail.com">
          johnpauljuma209@gmail.com
        </a>
        <a href="https://github.com/jaypeee098" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
}

export default ContactPage;

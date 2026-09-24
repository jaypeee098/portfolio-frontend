import ProjectList from './components/ProjectList';
import profilePhoto from './assets/john.jpg';
import './App.css';
 
function App() {
  return (
    <div className="app">
      <header className="hero">
        <img src={profilePhoto} alt="Johnpaul Juma" className="profile-photo" />
        <h1>Johnpaul Juma</h1>
        <p>
          Full-stack developer based in Kenya, focused on building complete
          web applications from the database up — React on the frontend,
          Node.js and Express on the backend, and PostgreSQL for data.
          I enjoy the whole process: designing schemas, building secure
          APIs, and connecting them to clean, usable interfaces.
        </p>
      </header>
 
      <main>
        <section>
          <h2>Projects</h2>
          <ProjectList />
        </section>
      </main>
 
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Name. Built with React &amp; Express.</p>
      </footer>
    </div>
  );
}
 
export default App;

        

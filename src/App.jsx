import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  // Navbar lives here, outside AnimatePresence, so it never remounts
  // when the route changes — only the page content below it animates.
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
            <Route
              path="about"
              element={
                <PageWrapper>
                  <AboutPage />
                </PageWrapper>
              }
            />
            <Route
              path="projects"
              element={
                <PageWrapper>
                  <ProjectsPage />
                </PageWrapper>
              }
            />
            <Route
              path="contact"
              element={
                <PageWrapper>
                  <ContactPage />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <footer>
        <p>-- built with React, Express and PostgreSQL, {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import profilePhoto from '../assets/john.jpg';

const container = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function HomePage() {
  return (
    <motion.header
      className="hero"
      variants={container}
      initial="initial"
      animate="animate"
    >
      <div>
        <motion.p className="hero-eyebrow" variants={item}>
          -- full-stack developer based in Kenya
        </motion.p>
        <motion.h1 variants={item}>Johnpaul Juma</motion.h1>
        <motion.p variants={item}>
          I build complete web applications from the database up —
          PostgreSQL schemas, Express APIs, and React interfaces that
          talk to them. This site is one of those builds: everything
          you see is served from a live database I can update myself.
        </motion.p>
        <motion.div variants={item}>
          <Link to="/projects" className="hero-cta">
            View projects
          </Link>
        </motion.div>
      </div>
      <motion.img
        src={profilePhoto}
        alt="Johnpaul Juma"
        className="profile-photo"
        variants={item}
      />
    </motion.header>
  );
}

export default HomePage;

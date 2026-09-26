import { useEffect, useState } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api';

const emptyForm = {
  title: '',
  description: '',
  image_url: '',
  tech_stack: '',
  github_link: '',
  live_link: '',
  featured: false,
};

function AdminLogin({ onLogin }) {
  const [keyInput, setKeyInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_api_key', keyInput.trim());
    onLogin();
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter admin API key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('admin_api_key')
  );
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Could not load projects.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('admin_api_key');
    setLoggedIn(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      ...form,
      tech_stack: form.tech_stack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image_url: form.image_url || null,
      github_link: form.github_link || null,
      live_link: form.live_link || null,
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setMessage({ type: 'success', text: 'Project updated.' });
      } else {
        await createProject(payload);
        setMessage({ type: 'success', text: 'Project created.' });
      }
      resetForm();
      loadProjects();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setMessage({ type: 'error', text: 'Unauthorized — check your admin key.' });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong saving the project.' });
      }
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || '',
      tech_stack: (project.tech_stack || []).join(', '),
      github_link: project.github_link || '',
      live_link: project.live_link || '',
      featured: project.featured || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await deleteProject(id);
      setMessage({ type: 'success', text: 'Project deleted.' });
      loadProjects();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Manage Projects</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {message && (
        <p className={`status-message ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </p>
      )}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>

        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>

        <label>
          Image URL
          <input name="image_url" value={form.image_url} onChange={handleChange} />
        </label>

        <label>
          Tech Stack (comma-separated)
          <input
            name="tech_stack"
            placeholder="React, Node.js, PostgreSQL"
            value={form.tech_stack}
            onChange={handleChange}
          />
        </label>

        <label>
          GitHub Link
          <input name="github_link" value={form.github_link} onChange={handleChange} />
        </label>

        <label>
          Live Link
          <input name="live_link" value={form.live_link} onChange={handleChange} />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Save Changes' : 'Add Project'}</button>
          {editingId && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h3>Existing Projects</h3>
      {loading ? (
        <p className="status-message">Loading...</p>
      ) : (
        <div className="admin-project-list">
          {projects.map((project) => (
            <div key={project.id} className="admin-project-row">
              <div>
                <strong>{project.title}</strong>
                <p>{project.description}</p>
              </div>
              <div className="admin-project-actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;

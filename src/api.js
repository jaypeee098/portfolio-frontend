import axios from 'axios';
 
const API_URL = import.meta.env.VITE_API_URL;
 
const api = axios.create({
  baseURL: API_URL,
});
 
export const getProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};
 
export const getProject = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};
 
export const createProject = async (project) => {
  const res = await api.post('/projects', project);
  return res.data;
};
 
export const updateProject = async (id, project) => {
  const res = await api.put(`/projects/${id}`, project);
  return res.data;
};
 
export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
 
export default api;

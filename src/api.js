import axios from 'axios';
 
const API_URL = import.meta.env.VITE_API_URL;
 
const api = axios.create({
  baseURL: API_URL,
});

//Attach the admin key(if present)to every request.
//The backend only checks it on POST/PUT/DELETE, so this is harmless on GET.
api.interceptors.request.use((config)=>{
  const key=localStorage.getItem('admin_api_key');
  if (key){
     config.headers['x-api-key'] = key;
  }
  return config;
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

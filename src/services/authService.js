import axios from 'axios';

const API_URL = 'https://localhost:7227/api/UserCredentials/authentication'; 

export const login = (userName, password, role) =>
  axios.post(`${API_URL}`, { userName, password, role });

export const logout = () => localStorage.removeItem('token');

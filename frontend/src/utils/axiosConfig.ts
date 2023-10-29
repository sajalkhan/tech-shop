import axios from 'axios';

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1' : '';
const token = localStorage.getItem('token');
const headers: Record<string, string> = {};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: headers,
});

export default axiosInstance;

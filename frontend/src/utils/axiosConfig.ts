import axios from 'axios';

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1' : '';
const token = localStorage.getItem('token');
const headers: Record<string, string> = {};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
  headers['content-type'] = 'application/json';
  headers['Accept'] = 'application/json';
}

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: headers,
  withCredentials: true,
});

export default axiosInstance;

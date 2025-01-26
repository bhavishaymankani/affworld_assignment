import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Update with your backend URL if different

// Set auth token for requests
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login API
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Register API
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Request password reset link
export const resetPassword = async (email) => {
    const response = await axios.post(`${API_URL}/auth/forgot-password`,  email );
    console.log(JSON.stringify(response))
    return response.data;
  };
  
  // Set new password with token
  export const updatePassword = async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password: newPassword });
    return response.data;
  };

// Fetch tasks
export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`, { headers: getAuthHeader() });
  return response.data;
};

// Add a new task
export const addTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData, { headers: getAuthHeader() });
  return response.data;
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status }, { headers: getAuthHeader() });
  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`, { headers: getAuthHeader() });
};

// Upload post to Cloudinary and save to backend
export const uploadPost = async (postData) => {
  const response = await axios.post(`${API_URL}/feed`, postData, { headers: getAuthHeader() });
  return response.data;
};

// Fetch feed posts
export const fetchFeed = async () => {
  const response = await axios.get(`${API_URL}/feed`, { headers: getAuthHeader() });
  return response.data;
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

export const register = (user) => {
  return axios.post(`${API_URL}register`, user);
};

export const login = (user) => {
  return axios.post(`${API_URL}login`, user)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};


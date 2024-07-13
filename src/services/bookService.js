import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books/';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};

export const getAllBooks = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

export const getBook = (id) => {
  return axios.get(`${API_URL}${id}`, { headers: authHeader() });
};

export const createBook = (book) => {
  return axios.post(API_URL, book, { headers: authHeader() });
};

export const updateBook = (id, book) => {
  return axios.put(`${API_URL}${id}`, book, { headers: authHeader() });
};

export const deleteBook = (id) => {
  return axios.delete(`${API_URL}${id}`, { headers: authHeader() });
};


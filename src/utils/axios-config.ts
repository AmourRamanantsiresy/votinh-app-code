import axios from 'axios';
// const baseURL = process.env.BASE_URL || '';

export const axiosBase = axios.create({
  // baseURL: 'http://192.168.100.122:8080',
  baseURL: 'http://localhost:8080',
});

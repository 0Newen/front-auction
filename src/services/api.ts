import axios from 'axios';

const API_BASE_URL = 'https://localhost:7079/api/';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  withCredentials: false,
  headers: {
    'X-Custom-Header': 'foobar',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Observe',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export default instance;

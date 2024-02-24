import { getAllModels } from 'utils/index';
import axios from 'axios';
import Config from 'react-native-config';

const Axios = axios.create({
  baseURL: 'https://api.joincouch.co/',
  timeout: 60000,
});

console.log(Config.BASE_URL);

// Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios.defaults.headers.put['Content-Type'] = 'application/json';
// Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// Axios.defaults.headers.post.Accept = 'application/json';     
 

Axios.interceptors.request.use(async (config: any) => {
  const models = getAllModels();
  const { access_token } = models.Auth;

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers.timestamp = new Date().getTime().toString();
  }

  console.log(config);
  return config;
});

Axios.interceptors.response.use(
  async response => {
    // console.log(response.data, 'res');
    return response;
  },
  async error => {
    const statusCode = error.response ? error.response.status : null;
    const originalRequest = error.config;
    if (statusCode === 401 && !originalRequest._retry) {
      // console.log(error.response);
    }
    console.log(error, 'Error....');
    return Promise.reject(error.response);
  },
);

export default Axios;

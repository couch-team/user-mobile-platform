import { getAllModels } from 'utils/index';
import axios from 'axios';
import Config from 'react-native-config';

const Axios = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 60000,
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';
Axios.defaults.headers.post.Accept = 'application/json';

Axios.interceptors.request.use(async (config: any) => {
  const models = getAllModels();
  const { access_token } = models.Auth;

  const isAuthRoute = config.url.includes('/verify');
  if (access_token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers.timestamp = new Date().getTime().toString();
  }
  return config;
});

Axios.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const statusCode = error.response ? error.response.status : null;
    const originalRequest = error.config;
    if (statusCode === 401 && !originalRequest._retry) {
      console.log(error.response);
    }
    console.log(error.response);
    return Promise.reject(error.response);
  },
);

export default Axios;

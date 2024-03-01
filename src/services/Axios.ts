import { getAllModels } from 'utils/index';
import axios from 'axios';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';

const Axios = axios.create({
  baseURL: 'https://api.joincouch.co/',
  timeout: 60000,
});

console.log(Config.BASE_URL);

// Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios.defaults.headers.put['Content-Type'] = 'application/json';
// Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// Axios.defaults.headers.post.Accept = 'application/json';
// const dispatch = useDispatch();

Axios.interceptors.request.use(async (config: any) => {
  const models = getAllModels();
  const { access_token } = models.Auth;

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers.timestamp = new Date().getTime().toString();
  }

  return config;
});



export default Axios;

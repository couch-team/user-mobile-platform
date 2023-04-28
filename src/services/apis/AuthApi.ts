import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('user/signin', payload).then(({ data }) => data),
  registerAccount: (payload: any) =>
    Axios.post('user/register', payload).then(({ data }) => data),
};

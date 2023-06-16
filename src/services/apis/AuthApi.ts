import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('user/signin', payload).then(({ data }) => data),
  registerAccount: (payload: any) =>
    Axios.post('user/register', payload).then(({ data }) => data),
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('user/onboarding', payload).then(({ data }) => data),
};

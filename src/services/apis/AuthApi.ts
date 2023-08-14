import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('api/users/login/', payload).then(({ data }) => data),
  registerAccount: (payload: any) =>
    Axios.post('api/users/', payload).then(({ data }) => data),
  verifyAccount: (payload: any) =>
    Axios.post('api/users/verify_otp/', payload).then(({ data }) => data),
  resendVerification: (payload: any) =>
    Axios.post('api/users/resend_otp/', payload).then(({ data }) => data),
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('api/userprofiles/', payload).then(({ data }) => data),
  getRoles: () => Axios.get('api/roles').then(({ data }) => data),
};

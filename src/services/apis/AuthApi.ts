import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('users/login/', payload).then(({ data }) => data),
  registerAccount: (payload: any) =>
    Axios.post('users/', payload).then(({ data }) => data),
  verifyAccount: (payload: any) =>
    Axios.post('users/verify_otp/', payload).then(({ data }) => data),
  resendVerification: (payload: any) =>
    Axios.post('users/resend_otp/', payload).then(({ data }) => data),
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('userprofiles/', payload).then(({ data }) => data),
  getUserProfile: () => Axios.get('user').then(({ data }) => data),
  getRoles: () => Axios.get('roles').then(({ data }) => data),
};

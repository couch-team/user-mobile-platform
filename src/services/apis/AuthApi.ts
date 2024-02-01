import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('api/auth/login/', payload).then(({ data }) => data),
  registerAccount: (payload: any) =>
    Axios.post('api/auth/register/', payload).then(({ data }) => data),
  verifyAccount: (payload: any) =>
    Axios.post('api/auth/otp/verify/', payload).then(({ data }) => data),
  resendVerification: (payload: any) =>
    Axios.post('api/auth/otp/resend/', payload).then(({ data }) => data),
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('api/user/profile/', payload).then(({ data }) => data),
  getRoles: () => Axios.get('api/roles').then(({ data }) => data),
};

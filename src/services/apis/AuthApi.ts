import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  login: (payload: any) =>
    Axios.post('api/auth/login/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => { console.log(data); return data}),
  registerAccount: (payload: any) =>
    Axios.post('api/auth/register/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  verifyAccount: (payload: any) =>
    Axios.post('api/auth/otp/verify/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  resendVerification: (payload: any) =>
    Axios.post('api/auth/otp/resend/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  getRoles: () => Axios.get('api/roles').then(({ data }) => data),
  getGoals: () =>
    Axios.get('api/auth/onboarding/goal/').then(({ data }) => data),
  resetPasswordInputEmail: (payload: any) =>
    Axios.post('api/auth/password_reset/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  resetPasswordConfirm: (payload: any) =>
    Axios.post('api/auth/password_reset/confirm/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  resetPasswordToken: (payload: any) =>
    Axios.post('api/auth/password_reset/validate_token/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  getAuthenticated: () =>
    Axios.get('api/auth/authenticated').then(({ data }) => data),
};

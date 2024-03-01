import { AuthApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';
import { CompleteAccountRequest, ResendEmailTokenRequest } from 'redux/types';

const IsState = {
  isLoggedIn: false,
  isRegistered: false,
  access_token: null,
  onboardingStage: 0,
  userData: null,
  authProfile: null,
  refresh_token: null,
  goalists: null,
} as unknown as Auth;

interface Auth {
  isLoggedIn: boolean;
  isRegistered: boolean;
  access_token: string;
  userData: any;
  onboardingStage: number;
  refresh_token: string;
  authProfile: any;
  goalists: any;
}

export const Auth = {
  name: 'Auth',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async login(data: any) {
      dispatch.Auth.setError(false);
      // console.log(data, 'payload');
      try {
        const api: any = await AuthApi.login(data);
        if (api) {
          console.log(api);
          dispatch.Auth.setState({
            access_token: api?.access,
            refresh_token: api?.refresh,
            isLoggedIn: true,
          });
          return true;
        }
      } catch (e) {
        this.handleError(e);
      }
    },
    async register(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api: any = await AuthApi.registerAccount(data);
        if (api) {
          console.log(api, 'register');
          return true;
        }
      } catch (error) {
        console.log(error, 'register error');
        this.handleError(error);
      }
    },
    async verifyEmailAccount(data: CompleteAccountRequest) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.verifyAccount(data);
        if (api) {
          console.log(api, 'verify email');
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async initResendToken(data: ResendEmailTokenRequest) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.resendVerification(data);
        if (api) {
          console.log(api, 'resend token');
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async completeProfileStage(data: number) {
      dispatch.Auth.setState({
        onboardingStage: data,
      });
      return true;
    },

    async accessDashboard() {
      dispatch.Auth.setState({
        isLoggedIn: true,
      });
    },

    async getRoles() {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.getRoles();
        if (api) {
          console.log(api, 'roles');
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async getAuthenticate() {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.getAuthenticated();
        if (api) {
          dispatch.Auth.setState({
            authProfile: api,
          });
          // console.log(api.id,'...data..');
        }
      } catch (error) {
        console.log(error, 'auth error');
        this.handleError(error);
      }
    },

    async getGoalLists() {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.getGoals();
        if (api) {
          dispatch.Auth.setState({
            goalists: api,
          });
          // console.log(api,'...lists..');
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async resetPasswordInputEmail(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.resetPasswordInputEmail(data);
        if (api) {
          console.log(api, '..email...');
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async resetPasswordConfirm(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.resetPasswordConfirm(data);
        if (api) {
          console.log(api, '..password...');
        }
      } catch (error) {
        console.log(error, 'reset pass error');
        this.handleError(error);
      }
    },

    async resetPasswordToken(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.resetPasswordToken(data);
        if (api) {
          console.log(api, '..otp...');
        }
      } catch (error) {
        console.log(error, 'reset token error');
        this.handleError(error);
      }
    },

    async logout() {
      dispatch({ type: 'RESET_APP' });
    },

    async handleError(error: any) {
      dispatch.Auth.setError(true);
      if (error || error?.data?.errors || error?.data?.status === 'error') {
        var message =
          error?.message ||
          error?.data?.message ||
          'An error occured. Please try again.';

        return showMessage({
          message,
          type: 'danger',
          duration: 2500,
        });
      }
      if (
        error?.data?.status === '401' ||
        error?.data?.message === 'Token is invalid or expired'
      ) {
        var message: any = 'Token expired. Please login again';
        return showMessage({
          message,
          type: 'warning',
          duration: 2500,
        });
      }
    },
  }),
};

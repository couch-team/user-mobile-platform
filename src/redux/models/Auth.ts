import { AuthApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';
import {
  CompleteAccountRequest,
  CompleteProfile,
  ResendEmailTokenRequest,
} from 'redux/types';

const IsState = {
  isLoggedIn: false,
  isRegistered: false,
  access_token: null,
  userProfile: null,
  onboardingStage: 0,
  userData: null,
} as unknown as Auth;

interface Auth {
  userProfile: CompleteProfile;
  isLoggedIn: boolean;
  isRegistered: boolean;
  access_token: string;
  userData: any;
  onboardingStage: number;
}

export const Auth = {
  name: 'Auth',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async login(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api: any = await AuthApi.login(data);
        if (api) {
          console.log(api);
          dispatch.Auth.setState({
            access_token: api?.access,
            refresh_token: api?.refresh,
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
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async verifyEmailAccount(data: CompleteAccountRequest) {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.verifyAccount(data);
        if (api) {
          console.log(api);
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
          console.log(api);
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async pendingProfileCompletion(data: CompleteProfile) {
      dispatch.Auth.setError(false);
      try {
        dispatch.Auth.setState({
          userProfile: data,
        });
        return true;
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
    async completeProfileCreation(data: CompleteProfile) {
      dispatch.Auth.setError(false);
      try {
        const res = await AuthApi.completeProfile(data);
        if (res) {
          console.log(res);
          dispatch.Auth.getUserProfileData();
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async getUserProfileData() {
      dispatch.Auth.setError(false);
      try {
        const api = await AuthApi.getUserProfile();
        if (api) {
          // dispatch.Auth.setState({
          //   userProf
          // })
          console.log(api);
        }
      } catch (error) {
        this.handleError(error);
      }
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
    },
  }),
};

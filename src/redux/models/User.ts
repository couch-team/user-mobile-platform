import { UserApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';
import { CompleteProfile } from 'redux/types';

const IsState = {
  userProfile: null,
  avatars: [],
  moods: [],
} as unknown as User;

interface User {
  userProfile: CompleteProfile;
  avatars: any[];
  moods: any[];
}

export const User = {
  name: 'User',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async completeProfileCreation(data: CompleteProfile) {
      dispatch.User.setError(false);
      try {
        const res = await UserApi.completeProfile(data);
        if (res) {
          dispatch.User.getUserProfileData();
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async getUserProfileData() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getUserProfile();
        if (api) {
          const data = Array.isArray(api) ? api[0] : api;
          dispatch.User.setState({
            userProfile: data,
          });
          console.log(api);
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async onboardUser(data: any) {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.setOnboarding(data);
        if (api) {
          console.log(api);
          return true;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async getUserAvatars() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getAllAvatars();
        if (api) {
          console.log(api);
          dispatch.User.setState({
            avatars: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async getUserMoods() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getAllMoods();
        if (api) {
          console.log(api);
          dispatch.User.setState({
            moods: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async addUserMood(data: any) {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi?.setMood(data);
        if (api) {
          console.log(api);
          return api;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async accessDashboard() {
      dispatch.User.setState({
        isLoggedIn: true,
      });
    },

    async handleError(error: any) {
      dispatch.User.setError(true);
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

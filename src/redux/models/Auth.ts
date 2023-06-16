import { AuthApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';

const IsState = {
  isLoggedIn: false,
  isRegistered: false,
  access_token: null,
  userProfile: null,
};

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
            access_token: api?.data?.token,
            // isLoggedIn: true,
          });
        }
        // dispatch.Auth.setState({
        //   isLoggedIn: true,
        // });
      } catch (e) {
        this.handleError(e);
      }
    },
    async register(data: any) {
      dispatch.Auth.setError(false);
      try {
        const api: any = await AuthApi.registerAccount(data);
        if (api) {
          dispatch.Auth.setState({
            access_token: api?.data?.token,
            userProfile: api?.data?.user,
          });
          return true;
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

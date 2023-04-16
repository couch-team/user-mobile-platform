import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';

const IsState = {
  isLoggedIn: false,
  isRegistered: false,
};

export const Auth = {
  name: 'Auth',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async login() {
      dispatch.Auth.setError(false);
      try {
        dispatch.Auth.setState({
          isLoggedIn: true,
        });
      } catch (e) {
        this.handleError(e);
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

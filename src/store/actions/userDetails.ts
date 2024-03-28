import { $api } from 'services';
import { AppThunk } from 'store';
import {
  setFirstName,
  setLastName,
  setPreference,
  setProfile,
  setUserActive,
  setUserDataLoading,
  setUserId,
  setUserVerified,
} from 'store/slice/userSlice';

export const fetchUserDetails =
  (token?: string): AppThunk =>
  async dispatch => {
    try {
      const response = await $api.fetch('/api/auth/authenticated/', token);
      if ($api.isSuccessful(response)) {
        dispatch(setUserDataLoading(response?.data?.data));
        dispatch(setFirstName(response?.data?.first_name));
        dispatch(setLastName(response?.data?.last_name));
        dispatch(setProfile(response?.data?.profile));
        dispatch(setPreference(response?.data?.preference));
        dispatch(setUserId(response?.data?.id));
        dispatch(setUserActive(response?.data?.is_active));
        dispatch(setUserVerified(response?.data?.is_verified));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setUserDataLoading(false));
    }
  };

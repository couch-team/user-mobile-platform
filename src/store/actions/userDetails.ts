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
import * as Device from 'expo-device';
import { setPushNotificationsSetup } from 'store/slice/authSlice';

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

export const subscribeToPushNotifications = (token?: string):AppThunk => async dispatch => {
  try{
    const device_type = Device.deviceName
    const response = await $api.post('/api/notification/device/', {
      device_type,
      expo_token: token,
    })
    if($api.isSuccessful(response)){
      dispatch(setPushNotificationsSetup(true))
    }
  }
  catch(err){
    console.log(err)
  }
}
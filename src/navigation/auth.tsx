import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/auth/onboarding';
import { AuthParamList } from '../utils/types/navigation-types';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import VerifyOtp from '../screens/auth/verify-otp';
import BasicProfile from '../screens/auth/basic-profile';
import Nationality from '../screens/auth/basic-profile/Nationality';
import UploadProfile from '../screens/auth/basic-profile/UploadProfile';
import UserOnboarding from '../screens/auth/user-onboarding';
import UserOnboarding1 from '../screens/auth/user-onboarding/UserOnboarding1';

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Onboarding} name="Onboarding" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={VerifyOtp} name="VerifyOtp" />
      <Stack.Screen component={BasicProfile} name="BasicProfile" />
      <Stack.Screen component={Nationality} name="Nationality" />
      <Stack.Screen component={UploadProfile} name="UploadProfile" />
      <Stack.Screen component={UserOnboarding} name="UserOnboarding" />
      <Stack.Screen component={UserOnboarding1} name="UserOnboarding1" />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

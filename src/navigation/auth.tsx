import React from 'react';
import { AuthParamList } from '../utils/types/navigation-types';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import VerifyOtp from '../screens/auth/verify-otp';
import ForgetPassword from 'screens/auth/forget-password';
import VerifyEmailAccount from 'screens/auth/verify-email';
import ResetPassword from 'screens/auth/change-password';
import BasicProfile from 'screens/auth/basic-profile';
import Nationality from 'screens/auth/basic-profile/Nationality';
import UploadProfile from 'screens/auth/basic-profile/UploadProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={VerifyOtp} name="VerifyOtp" />
      <Stack.Screen component={ForgetPassword} name="ForgetPassword" />
      <Stack.Screen component={VerifyEmailAccount} name="VerifyEmailAccount" />
      <Stack.Screen component={ResetPassword} name="ResetPassword" />
      <Stack.Screen component={BasicProfile} name="BasicProfile" />
      <Stack.Screen component={Nationality} name="Nationality" />
      <Stack.Screen component={UploadProfile} name="UploadProfile" />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '../utils/types/navigation-types';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import VerifyOtp from '../screens/auth/verify-otp';
import ForgetPassword from 'screens/auth/forget-password';
import VerifyEmailAccount from 'screens/auth/verify-email';
import ResetPassword from 'screens/auth/change-password';

const Stack = createStackNavigator<AuthParamList>();

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
    </Stack.Navigator>
  );
};

export default AuthNavigation;

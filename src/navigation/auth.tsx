import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import UserOnboarding from 'screens/auth/user-onboarding';
import UserOnboarding1 from 'screens/auth/user-onboarding/UserOnboarding1';
import UserOnboarding2 from 'screens/auth/user-onboarding/UserOnboarding2';
import UserOnboarding3 from 'screens/auth/user-onboarding/UserOnboarding3';
import CompleteOnboarding1 from 'screens/auth/user-onboarding/CompleteOnboarding1';
import UserOnboarding4 from 'screens/auth/user-onboarding/UserOnboarding4';

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
      <Stack.Screen component={UserOnboarding} name="UserOnboarding" />
      <Stack.Screen component={UserOnboarding1} name="UserOnboarding1" />
      <Stack.Screen component={UserOnboarding2} name="UserOnboarding2" />
      <Stack.Screen component={UserOnboarding3} name="UserOnboarding3" />
      <Stack.Screen component={UserOnboarding4} name="UserOnboarding4" />
      <Stack.Screen
        component={CompleteOnboarding1}
        name="CompleteOnboarding1"
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

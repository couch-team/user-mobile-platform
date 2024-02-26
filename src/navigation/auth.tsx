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
import UserOnboarding2 from '../screens/auth/user-onboarding/UserOnboarding2';
import UserOnboarding3 from '../screens/auth/user-onboarding/UserOnboarding3';
import UserOnboarding4 from '../screens/auth/user-onboarding/UserOnboarding4';
import CompleteOnboarding1 from '../screens/auth/user-onboarding/CompleteOnboarding1';
import UserOnboarding5 from 'screens/auth/user-onboarding/UserOnboarding5';
import UserOnboarding6 from 'screens/auth/user-onboarding/UserOnboarding6';
import UserOnboarding7 from 'screens/auth/user-onboarding/UserOnboarding7';
import UserOnboarding8 from 'screens/auth/user-onboarding/UserOnboarding8';
import UserOnboarding9 from 'screens/auth/user-onboarding/UserOnboarding9';
import UserOnboarding10 from 'screens/auth/user-onboarding/UserOnboarding10';
import ForgetPassword from 'screens/auth/forget-password';
import VerifyEmailAccount from 'screens/auth/verify-email';
import ResetPassword from 'screens/auth/change-password';
// import { useSelector } from 'react-redux';
// import { RootState } from 'redux/store';

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen component={Onboarding} name="Onboarding" /> */}
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

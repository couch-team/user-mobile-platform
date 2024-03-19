import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasicProfile from '../screens/auth/basic-profile';
import Nationality from '../screens/auth/basic-profile/Nationality';
import UploadProfile from '../screens/auth/basic-profile/UploadProfile';
import BottomTabBar from './bottom-tab';
import { AuthParamList } from 'utils/types/navigation-types';

const Stack = createNativeStackNavigator<AuthParamList>();

const ProfileOnboardingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BasicProfile'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BasicProfile} name="BasicProfile" />
      <Stack.Screen component={Nationality} name="Nationality" />
      <Stack.Screen component={UploadProfile} name="UploadProfile" />
      <Stack.Screen component={BottomTabBar} name="UserDashboard" />
    </Stack.Navigator>
  );
};

export default ProfileOnboardingNavigation;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/auth/onboarding';
import { AuthParamList } from '../utils/types/navigation-types';

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Onboarding'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Onboarding} name="Onboarding" />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

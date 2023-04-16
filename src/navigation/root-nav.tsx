import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils';
import AuthNavigation from './auth';
import { RootNavigationRoutes } from '../utils/types/navigation-types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import DashboardNavigation from './dashboard';

const Stack = createStackNavigator<RootNavigationRoutes>();

const AppNavigation = () => {
  const isLoggedIn = useSelector((state: RootState) => state.Auth.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Dashboard' : 'Auth'}
        screenOptions={{ headerShown: false }}>
        {/* {isLoggedIn ? (
          <Stack.Screen component={DashboardNavigation} name="Dashboard" />
        ) : ( */}
        <Stack.Screen component={AuthNavigation} name="Auth" />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const RootNavigation = AppNavigation;

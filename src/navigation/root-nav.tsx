/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import AuthNavigation from './auth';
import { RootNavigationRoutes } from '../utils/types/navigation-types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DashboardNavigation from './dashboard';
import TakeTour from 'screens/dashboard/home/modals/TakeTour';
import { Colors } from 'theme/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileOnboardingNavigation from './profile-onboarding';
import { NavigationContainer } from '@react-navigation/native';

import { Animated } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const av = new Animated.Value(0);
av.addListener(() => {return});

const Stack = createNativeStackNavigator<RootNavigationRoutes>();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const AppNavigation = () => {
  const { access_token, is_loading } = useSelector(
    (state: RootState) => state.Auth,
  );
  const user_data = useSelector((state: RootState) => state.User);
  const isLoggedIn = !!access_token;

  const [initialState, setInitialState] = React.useState();

  return (
    <NavigationContainer
      // ref={navigationRef}
      initialState={__DEV__ ? initialState : undefined}
      onStateChange={state => {
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? user_data?.profile !== null
              ? 'Dashboard'
              : 'ProfileOnboarding'
            : 'Auth'
        }
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.PRIMARY },
          presentation: 'transparentModal',
        }}>
        {isLoggedIn ? (
          user_data?.profile !== null || is_loading ? (
            <>
              <Stack.Screen component={DashboardNavigation} name="Dashboard" />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                  name="TakeTour"
                  component={TakeTour}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            </>
          ) : (
            <Stack.Screen
              component={ProfileOnboardingNavigation}
              name="ProfileOnboarding"
            />
          )
        ) : (
          <Stack.Screen component={AuthNavigation} name="Auth" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const RootNavigation = AppNavigation;

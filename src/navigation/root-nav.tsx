import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils';
import AuthNavigation from './auth';
import { RootNavigationRoutes } from '../utils/types/navigation-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DashboardNavigation from './dashboard';
import TakeTour from 'screens/dashboard/home/modals/TakeTour';
import { Colors } from 'theme/config';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'services/Axios';
import ProfileOnboardingNavigation from './profile-onboarding';

const Stack = createStackNavigator<RootNavigationRoutes>();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const AppNavigation = () => {
  const isLoggedIn = useSelector((state: RootState) => state.Auth.isLoggedIn);

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const dispatch = useDispatch();

  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile?.profile,
  );

  const authPreference = useSelector(
    (state: RootState) => state.Auth.authProfile?.preference,
  );

  React.useEffect(() => {
    Axios.interceptors.response.use(
      async response => {
        // console.log(response.data, 'res');
        return response;
      },
      async error => {
        const statusCode = error.response ? error.response.status : null;
        const originalRequest = error.config;
        if (statusCode === 401 && !originalRequest._retry) {
          // console.log(error.response);
          dispatch({ type: 'RESET_APP' });
        }
        console.log(error, 'Error....');
        return Promise.reject(error.response);
      },
    );
    return () => {};
  }, []);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        // console.log(initialUrl, 'initialUrl');

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={__DEV__ ? initialState : undefined}
      onStateChange={state => {
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? authProfileDetails !== null && authPreference !== null
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
          authProfileDetails !== null && authPreference !== null ? (
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
            <Stack.Screen component={ProfileOnboardingNavigation} name="ProfileOnboarding" />
          )
        ) : (
          <Stack.Screen component={AuthNavigation} name="Auth" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const RootNavigation = AppNavigation;

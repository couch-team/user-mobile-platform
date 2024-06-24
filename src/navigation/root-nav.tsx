/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import AuthNavigation from './auth';
import { RootNavigationRoutes } from '../utils/types/navigation-types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DashboardNavigation from './dashboard';
import TakeTour from 'screens/dashboard/home/modals/TakeTour';
import { Colors } from 'theme/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileOnboardingNavigation from './profile-onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { showMessage } from 'react-native-flash-message';
import { Linking, Platform } from 'react-native';
import useAppDispatch from 'hooks/useAppDispatch';
import { subscribeToPushNotifications } from 'store/actions/userDetails';

const Stack = createNativeStackNavigator<RootNavigationRoutes>();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  showMessage({
    message: errorMessage,
    type: 'danger',
    duration: 3000,
  })
  throw new Error(errorMessage)
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      const openSettings = async () => {
        await Linking.openSettings();
      };
      openSettings();
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
    const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

const AppNavigation = () => {
  console.log("device",Device.deviceName);
  const { access_token, is_loading, push_notifications_setup } = useSelector(
    (state: RootState) => state.Auth,
  );
  const user_data = useSelector((state: RootState) => state.User);
  const isLoggedIn = !!access_token;

  const [initialState, setInitialState] = React.useState();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#060C23',
      primary: '#060C23',
    },
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(isLoggedIn && !push_notifications_setup)
    registerForPushNotificationsAsync()
      .then((token) => dispatch(subscribeToPushNotifications(token)))
      .catch((error: Error) => {
        showMessage({
          message: error?.message,
          type: 'danger',
          duration: 3000,
        })
        console.log(error?.message)
      });

  }, []);

  return (
    <NavigationContainer
      // ref={navigationRef}
      initialState={__DEV__ ? initialState : undefined}
      onStateChange={state => {
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}
      theme={MyTheme}>
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
          presentation: 'modal',
        }}>
        {isLoggedIn ? (
          user_data?.profile !== null || is_loading ? (
            <>
              <Stack.Screen
                options={{ presentation: 'modal' }}
                component={DashboardNavigation}
                name="Dashboard"
              />
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

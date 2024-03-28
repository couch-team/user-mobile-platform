/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { showMessage } from 'react-native-flash-message';

SplashScreen.preventAutoHideAsync();

const useFonts = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          SoraThin: require('../assets/fonts/Sora-Thin.ttf'),
          'Sora-Light': require('../assets/fonts/Sora-Light.ttf'),
          'Sora-ExtraLight': require('../assets/fonts/Sora-ExtraLight.ttf'),
          'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
          SoraMedium: require('../assets/fonts/Sora-Medium.ttf'),
          'Sora-SemiBold': require('../assets/fonts/Sora-SemiBold.ttf'),
          'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
          'Sora-ExtraBold': require('../assets/fonts/Sora-ExtraBold.ttf'),
        });
        // const token = await retrieveToken();
        // if (token) {
        //   return store.dispatch(login());
        // }
        await new Promise(resolve => setTimeout(resolve, 2000));
        // showMessage({
        //   message: 'Fonts loaded successfully',
        //   type: 'danger',
        //   duration: 2500,
        // });
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }

    prepare();
  }, [appIsReady]);

  return appIsReady;
};

export default useFonts;

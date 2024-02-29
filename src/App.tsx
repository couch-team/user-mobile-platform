import React, { useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import { hasDynamicIsland } from 'react-native-device-info';
import { hp } from './constants/layout';
import { StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
// import SplashScreen from 'react-native-splash-screen';
import { RootNavigation } from './navigation';
import { Colors, Typography } from 'theme/config';
import { useFonts } from 'expo-font';


const App = () => {
  useEffect(() => { 
    setTimeout(() => SplashScreen.preventAutoHideAsync(), 2000);
  }, []);

  const [fontsLoaded,fontError] = useFonts({
    'Sora-Thin': require('./assets/fonts/Sora-Thin.ttf'),
    'Sora-Light':require('./assets/fonts/Sora-Light.ttf'),
    'Sora-ExtraLight':require('./assets/fonts/Sora-ExtraLight.ttf'),
    'Sora-Regular':require('./assets/fonts/Sora-Regular.ttf'),
    'Sora-Medium':require('./assets/fonts/Sora-Medium.ttf'),
    'Sora-SemiBold':require('./assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Bold':require('./assets/fonts/Sora-Bold.ttf'),
    'Sora-ExtraBold':require('./assets/fonts/Sora-ExtraBold.ttf'),
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
 

  return (
    <Provider store={store} >
      <SafeAreaProvider style={{ backgroundColor: Colors.PRIMARY }} onLayout={onLayoutRootView}>
        <StatusBar barStyle={'light-content'} />
        <FlashMessage
          position="top"
          duration={3000}
          style={[styles.paddingTop]}
          titleStyle={styles.titleStyle}
        />
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: hp(14),
    fontFamily: 'Sora-Thin',
  },
  paddingTop: {
    paddingTop: hp(10),
  },
});

export default App;

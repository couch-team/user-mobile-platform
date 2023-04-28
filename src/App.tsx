import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { hasDynamicIsland } from 'react-native-device-info';
import { hp } from './constants/layout';
import { StatusBar, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RootNavigation } from './navigation';
import { Colors, Typography } from 'theme/config';

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ backgroundColor: Colors.PRIMARY }}>
        <StatusBar barStyle={'light-content'} />
        <FlashMessage
          position="top"
          duration={3000}
          style={[hasDynamicIsland() && styles.paddingTop]}
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
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  paddingTop: {
    paddingTop: hp(10),
  },
});

export default App;

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { hasDynamicIsland } from 'react-native-device-info';
import { hp } from './constants/layout';
import { StatusBar, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RootNavigation } from 'navigation';

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
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
    color: '#fff',
    fontSize: 14,
  },
  paddingTop: {
    paddingTop: hp(30),
  },
});

export default App;

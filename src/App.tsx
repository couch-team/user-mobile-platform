import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
// import { hasDynamicIsland } from 'react-native-device-info';
import { hp } from './constants/layout';
import { StatusBar, StyleSheet, View } from 'react-native';
import { RootNavigation } from './navigation';
import { Colors } from 'theme/config';
import { PersistGate } from 'redux-persist/integration/react';
// import { NavigationContainer } from '@react-navigation/native';
import useFonts from 'hooks/useFont';



const App = () => {
  const appIsReady = useFonts();

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider
          style={{ backgroundColor: Colors.PRIMARY }}
          // onLayout={onLayoutRootView}
        >
          <StatusBar barStyle={'light-content'} />
          <FlashMessage
            position="top"
            duration={3000}
            style={[styles.paddingTop]}
            titleStyle={styles.titleStyle}
          />
          <RootNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: hp(14),
    fontFamily: 'SoraMedium',
  },
  paddingTop: {
    paddingTop: hp(10),
  },
});

export default App;

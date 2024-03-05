import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { hp } from './constants/layout';
import { StyleSheet } from 'react-native';
import { RootNavigation } from './navigation';
import { Colors } from 'theme/config';
import { NavigationContainer } from '@react-navigation/native';
import useFonts from 'hooks/useFont';

const App = () => {
  const appIsReady = useFonts();

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider style={{ backgroundColor: Colors.PRIMARY }}>
          <FlashMessage
            position="top"
            duration={3000}
            style={[styles.paddingTop]}
            titleStyle={styles.titleStyle}
          />
          <RootNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
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

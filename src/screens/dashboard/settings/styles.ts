import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'rgba(6, 12, 35, 1)',
    paddingHorizontal: 20,
    // position: 'relative',
    // zIndex: -1,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Dimensions.get('window').height / 3,
    flex: 1,
    backgroundColor: 'rgba(15, 17, 65, 1)',
    // position: 'relative',
    // zIndex: -1,
  },
  editBtn: {
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: 'rgba(138, 142, 227, 1)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    // top: '100%',
    // marginTop: 70,
  },
  btnText: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  editBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    paddingTop: 80,
    zIndex: 50000,
  },
});

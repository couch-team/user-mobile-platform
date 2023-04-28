import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  notificationButtonContainer: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(66),
    marginTop: hp(20),
  },
  contentContainerStyle: {
    paddingRight: wp(30),
    paddingLeft: wp(10),
  },
  notificationButtonText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_TEXT_COLOR,
  },
  activeButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_800,
    borderRadius: hp(48),
    height: hp(40),
    top: hp(13),
  },
  activeButtonBottomContainer: {
    borderBottomWidth: hp(5),
    borderBottomColor: Colors.COUCH_BLUE,
    top: hp(25),
  },
});

import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: wp(12),
    justifyContent: 'center',
    bottom: hp(20),
    marginTop: hp(10),
  },
  scrollContainer: {
    // backgroundColor: Colors.PEACHY_RED,
  },
  notificationButtonContainer: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(66),
    width: wp(115),
    marginTop: hp(20),
  },
  activeButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_800,
    borderRadius: hp(48),
    height: hp(40),
    top: hp(13),
  },
  notificationButtonText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(14),
    paddingLeft: wp(5),
  },
  activeButtonText: {
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.COUCH_BLUE,
  },
  activeButtonBottomContainer: {
    borderBottomWidth: hp(5),
    borderBottomColor: Colors.COUCH_BLUE,
    top: hp(25),
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.COUCH_BLUE,
  },
});

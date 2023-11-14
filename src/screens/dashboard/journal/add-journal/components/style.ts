import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  rightHeaderContainer: {
    flexDirection: 'row',
  },
  closeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2300,
    marginLeft: wp(16),
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.COUCH_BLUE,
  },
  checkColor: {
    backgroundColor: Colors.COUCH_BLUE,
  },
  tintColor: {
    tintColor: Colors.WHITE,
  },
  noteOptionContainer: {
    flexDirection: 'row',
    width: wp(304),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: hp(64),
    height: hp(72),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
  },
  noteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteIcon: {
    width: wp(20),
    height: hp(20),
  },
  infoContainer: {
    width: 40,
    height: 40,
  },
  inputStyle: {
    fontSize: hp(16),
    // lineHeight: hp(32),
    color: Colors.COUCH_TEXT_COLOR,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
});

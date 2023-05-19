import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerRightContainer: {
    flexDirection: 'row',
    width: 115,
    justifyContent: 'space-between',
  },
  headerRightIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2300,
    borderRadius: 100,
  },
  headerRightIcon: {
    width: wp(20),
    height: hp(20),
    tintColor: Colors.COUCH_BLUE,
  },
  journalFrameContainer: {
    width: deviceWidth - wp(48),
    height: hp(133),
    alignSelf: 'center',
    marginTop: hp(20),
  },
  plusIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(20),
    right: wp(20),
    zIndex: 100000,
    backgroundColor: Colors.COUCH_BLUE,
  },
  plusIcon: {
    width: wp(44),
    height: hp(44),
  },
  emptyMoodTrackerContainer: {
    marginTop: hp(20),
    height: hp(400),
    marginHorizontal: wp(24),
    borderRadius: hp(16),
    backgroundColor: Colors.WHITE_TRANSPARENT,
  },
  emptyMoodIconContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2200,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 69,
  },
  emptyMoodIcon: {
    width: 80,
    height: 80,
  },
  emptyTextContainer: {
    marginTop: hp(40),
    paddingHorizontal: wp(28),
  },
  emptyMainText: {
    color: Colors.COUCH_BLUE_1100,
    fontFamily: Typography.fontFamily.SoraMedium,
    textAlign: 'center',
    fontSize: hp(14),
    lineHeight: hp(19),
  },

  emptyBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    paddingTop: hp(16),
    textAlign: 'center',
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(13),
  },
});

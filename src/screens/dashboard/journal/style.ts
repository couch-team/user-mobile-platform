import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  journalFrameContainer: {
    width: deviceWidth - wp(48),
    height: hp(133),
    alignSelf: 'center',
    marginTop: hp(20),
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
  headerSectionContainer: {
    paddingHorizontal: wp(24),
    flexDirection: 'row',
    marginVertical: hp(18),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleStyle: {
    fontSize: hp(18),
    color: Colors.COUCH_BLUE_1100,
    fontFamily: Typography.fontFamily.SoraSemiBold,
  },
  journalMoodIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2400,
    borderRadius: 100,
  },
  moodIcon: {
    width: wp(26),
    height: hp(26),
  },
  bodyContainer: {
    marginTop: hp(0),
  },
  contentContainerStyle: {
    paddingBottom: hp(200),
  },
  itemMoodContainer: {
    backgroundColor: Colors.WHITE_TRANSPARENT,
    marginHorizontal: wp(24),
    marginBottom: hp(16),
    padding: hp(16),
    borderRadius: hp(16),
  },
  itemMoodBodyContainer: {
    marginTop: wp(24),
  },
  journalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  journalBodyHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceIconLengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_800,
    padding: hp(8),
    borderRadius: hp(10),
    justifyContent: 'space-between',
  },
  itemMoodMainText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(16),
    color: Colors.COUCH_BLUE_1100,
  },
  voiceIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_2500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceDurationText: {
    paddingLeft: wp(8),
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(12),
  },
  itemMoodBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    paddingTop: hp(8),
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(12),
  },
  itemMoodBodyDateText: {
    fontFamily: Typography.fontFamily.SoraBold,
    paddingTop: hp(20),
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(12),
  },
  voiceIcon: {
    width: 12,
    height: 12,
  },
});

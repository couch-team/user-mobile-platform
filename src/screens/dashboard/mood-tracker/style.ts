import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  bodyContainer: {
    marginTop: hp(20),
  },
  headerSectionContainer: {
    paddingHorizontal: wp(24),
    flexDirection: 'row',
    marginBottom: hp(5),
    height: hp(30),
    backgroundColor: Colors.PRIMARY,
  },
  headerTitleStyle: {
    fontFamily: Typography.fontFamily.SoraMedium,
    paddingLeft: wp(12),
    fontSize: hp(14),
    color: Colors.COUCH_BLUE_1100,
  },
  headerIcon: {
    width: wp(16),
    height: hp(26),
  },
  contentContainerStyle: {
    paddingBottom: hp(200),
  },
  moodIcon: {
    width: wp(53),
    height: hp(53),
  },
  itemMoodContainer: {
    backgroundColor: Colors.COUCH_GREEN_100,
    marginHorizontal: wp(24),
    marginBottom: hp(16),
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(14),
    borderRadius: hp(16),
  },
  itemMoodBodyContainer: {
    marginLeft: wp(13),
  },
  itemMoodMainText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14),
    color: Colors.COUCH_GREEN_200,
    lineHeight: hp(18),
  },
  itemMoodBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    paddingTop: hp(8),
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(12),
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
    height: hp(450),
    marginHorizontal: wp(24),
    borderRadius: hp(16),
    backgroundColor: Colors.WHITE_TRANSPARENT,
  },
  emptyMoodIconContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2200,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 69,
  },
  emptyMoodIcon: {
    width: 85,
    height: 85,
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
  dummyMoodEmoji: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: '#8A8EE333'
  },
  moodEmoji: {
    width: 56,
    height: 56,
    borderRadius: 56,
  },
  reachedEndContainer: {
  
  },
  reachedEnd: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
  }
});

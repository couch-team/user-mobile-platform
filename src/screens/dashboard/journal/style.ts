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
    padding: 10,
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
    fontFamily: 'Sora-Medium',
    textAlign: 'center',
    fontSize: hp(14),
    lineHeight: hp(19),
  },

  emptyBodyText: {
    fontFamily: 'Sora-Regular',
    paddingTop: hp(16),
    textAlign: 'center',
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(13),
  },
  headerSectionContainer: {
    paddingHorizontal: wp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(10),
    height: hp(30),
    backgroundColor: Colors.PRIMARY,
  },
  headerTitleStyle: {
    fontFamily: 'SoraMedium',
    paddingLeft: wp(12),
    fontSize: hp(14),
    color: Colors.COUCH_BLUE_1100,
  },
  headerTitleImage: {
    width: wp(16),
    marginRight: wp(12),
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
    marginTop: hp(20),
    // flexGrow:1
    // height:"100%"
  },
  contentContainerStyle: {
    paddingBottom: hp(200),
    // flexGrow: 1,
    // height:"100%"
  },
  itemMoodContainer: {
    backgroundColor: Colors.COUCH_GREEN_100,
    marginHorizontal: wp(24),
    marginBottom: hp(16),
    padding: hp(16),
    borderRadius: hp(16),
  },
  itemMoodContainerTwo: {
    backgroundColor: Colors.COUCH_BLUE_100,
    marginHorizontal: wp(24),
    marginBottom: hp(16),
    padding: hp(16),
    borderRadius: hp(16),
  },
  itemMoodBodyContainer: {
    marginTop: wp(24),
    gap: wp(10),
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
    fontFamily: 'Sora-Medium',
    fontSize: hp(16),
    color: Colors.WHITE,
    lineHeight: hp(18),
    fontWeight: 'bold',
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
    fontFamily: 'SoraMedium',
    color: Colors.WHITE,
    fontSize: hp(12),
  },
  itemMoodText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    paddingTop: hp(8),
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(14),
  },
  itemMoodBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    paddingTop: hp(8),
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(12),
    fontWeight: 'bold',
  },
  voiceIcon: {
    width: 12,
    height: 12,
  },
  ButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_200,
    marginLeft: wp(10),
    height: hp(38),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(14),
    borderRadius: hp(64),
  },
  ButtonText: {
    color: Colors.COUCH_BLUE,
    fontFamily: 'Sora-Medium',
    fontSize: hp(12),
  },
  paginationButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_200,
    marginVertical: wp(10),
    height: hp(38),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(24),
    borderRadius: hp(64),
  },
  paginationButtonText: {
    color: Colors.COUCH_BLUE,
    fontFamily: 'Sora-Medium',
    fontSize: hp(16),
    fontWeight: '900',
  },
});

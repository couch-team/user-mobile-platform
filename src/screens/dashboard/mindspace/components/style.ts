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
  recommendedSectionItemContainer: {
    marginHorizontal: wp(24),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    paddingVertical: hp(20),
    paddingHorizontal: wp(16),
    borderRadius: hp(14),
  },
  recommendedSectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedOptionContainer: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(8),
    backgroundColor: Colors.OFF_WHITE_300,
    marginRight: wp(12),
    borderRadius: hp(64),
  },
  recommendedOptionText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(12),
    color: Colors.WHITE,
    lineHeight: hp(16),
    textTransform: 'uppercase',
  },
  podcastTitleContainer: {
    marginTop: hp(24),
  },
  headerTextStyle: {
    marginHorizontal: 0,
  },
  textStyle: {
    fontFamily: Typography.fontFamily.SoraBold,
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
  podcastItemIcon: {
    width: wp(20),
    height: hp(20),
  },
  podcastText: {
    fontFamily: Typography.fontFamily.SoraBold,
    paddingLeft: wp(7),
    top: hp(2),
    fontSize: hp(12),
    color: Colors.COUCH_BLUE_1100,
  },
  podcastItemIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(24),
  },
  podcastRateContainer: {
    flexDirection: 'row',
  },
  podcastItemIconBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBorderContainer: {
    width: wp(74),
    justifyContent: 'flex-start',
    borderRightWidth: 0.7,
    marginRight: wp(20),
    borderRightColor: Colors.WHITE,
  },
  voiceNoteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE,
  },
  voiceNoteIcon: {
    width: wp(24),
    height: hp(24),
    tintColor: Colors.WHITE,
  },
});

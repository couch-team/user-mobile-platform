import { deviceWidth, hp, wp } from 'constants/layout';
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
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    borderRadius: hp(14),
    width: deviceWidth - 40,
    padding: 20,
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
    width: wp(172.5),
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
  recentlyWatchedItemContainer: {
    marginBottom: hp(20),
  },
  topVideoItemContainer: {
    marginRight: wp(20),
    marginTop: hp(20),
  },
  topVideoStyle: {
    height: '100%',
    width: '100%',
    borderRadius: hp(16),
    position: 'absolute',
    zIndex: -100,
  },
  recommendedVideoStyle: {
    height: '100%',
    width: '100%',
    borderRadius: hp(16),
    position: 'absolute',
    zIndex: -100,
  },
  topVideoStyleGradient: {
    height: hp(284),
    width: wp(235),
    paddingHorizontal: wp(12),
    paddingVertical: hp(20),
    borderRadius: hp(16),
    justifyContent: 'space-between'
  },
  recommendedVideoStyleGradient: {
    height: '100%',
    width: '100%',
    paddingHorizontal: wp(12),
    paddingVertical: hp(20),
    borderRadius: hp(16),
    justifyContent: 'space-between'
  },
  recentlyWatchedImage: {
    width: wp(333),
    height: hp(214),
    borderRadius: hp(16),
    position: 'absolute',
    zIndex: -100,
  },
  recentlyWatchItemContainer: {
    width: wp(333),
    borderRadius: hp(16),
    paddingVertical: hp(20),
    paddingHorizontal: wp(16),
    height: hp(214),
  },
  recentlyWatchedHashTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hasTagContainer: {
    borderRadius: 64,
    backgroundColor: '#FFFFFF1F',
    marginRight: wp(10),
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  hasTagBlurContainer: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: hp(12),
  },
  blurContainer: {
    backgroundColor: Colors.OFF_WHITE_300,
    borderRadius: hp(64),
  },
  hasTagText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontWeight: "700",
    fontSize: hp(10),
    color: Colors.WHITE,
    textTransform: 'uppercase',
  },
  recentlyPlayedTitleContainer: {
    flexDirection: 'row',
    marginTop: hp(20),
    alignItems: 'center',
  },
  playIconContainer: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE,
  },
  recentlyPlayedTextContainer: {
    marginLeft: wp(16),
    width: deviceWidth - 140,
  },
  recentlyHeaderTextStyle: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontSize: hp(16),
    color: Colors.WHITE,
    lineHeight: hp(22),
  },
  recentlyPlayedSubHeaderTextStyle: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.COUCH_BLUE_2600,
    lineHeight: hp(20),
  },
  hasMarginTop: {
    flexDirection: 'row',
    marginTop: hp(30),
  },
  playIcon: {
    width: wp(26),
    tintColor: Colors.WHITE,
    height: hp(26),
    left: 2,
  },
  topVideoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationContainer: {
    backgroundColor: Colors.OFF_WHITE_300,
    paddingHorizontal: wp(12),
    paddingVertical: hp(8),
    borderRadius: hp(64),
  },
  durationText: {
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.WHITE,
  },
  progressBarContainer: {
    marginTop: hp(28),
  },
  topVideoTitleText: {
    fontFamily: Typography.fontFamily.SoraBold,
    paddingTop: hp(28),
    fontSize: hp(16),
    lineHeight: hp(23),
    color: Colors.WHITE,
  },
  topVideoTagContainer: {
    backgroundColor: Colors.COUCH_BLUE_1600,
    marginTop: hp(28),
    padding: hp(8),
    borderRadius: hp(64),
  },
  recentlyPlayedItemContainer: {
    paddingVertical: hp(20),
    backgroundColor: Colors.COUCH_BLUE_2100,
    paddingHorizontal: wp(16),
    borderRadius: hp(16),
    marginBottom: hp(20),
  },
});

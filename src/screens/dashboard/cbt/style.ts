import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerContainerImage: {
    width: deviceWidth,
    height: hp(350),
    marginBottom: hp(30),
  },
  headerContainerGradientImage: {
    width: deviceWidth,
    height: hp(350),
    position: 'absolute',
  },
  headerContainerItemContainer: {
    marginTop: hp(140),
    paddingHorizontal: wp(24),
  },
  headerContainer: {
    zIndex: 10000,
  },
  cbtItemContainer: {
    marginHorizontal: wp(24),
    marginTop: hp(20),
  },
  cbtImageStyle: {
    height: hp(202),
    width: wp(330),
    borderRadius: hp(16),
    position: 'absolute',
    zIndex: -100,
  },
  cbtImageGradientStyle: {
    height: hp(202),
    width: wp(330),
    paddingHorizontal: wp(14),
    paddingVertical: hp(26),
    borderRadius: hp(16),
  },
  cbtHeaderTitleText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    color: Colors.WHITE,
    fontSize: hp(16),
    lineHeight: hp(23),
  },
  cbtSubHeaderText: {
    paddingTop: hp(20),
    width: wp(248),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.OFF_WHITE_400,
  },
  cbtItemFeaturesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
  },
  cbtItemBodyContainer: {
    padding: hp(8),
    backgroundColor: Colors.OFF_WHITE_300,
    marginRight: wp(10),
    borderRadius: hp(64),
  },
  cbtItemText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(12),
    color: Colors.WHITE,
  },
  contentContainerStyle: {
    paddingBottom: hp(100),
  },
  cbtItemIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE,
  },
  cbtItemDataBodyContainer: {
    width: wp(320),
    padding: hp(16),
    backgroundColor: Colors.OFF_WHITE_500,
    marginBottom: hp(20),
    flexDirection: 'row',
    borderRadius: hp(16),
  },
  cbtItemIcon: {
    width: wp(32),
    height: hp(32),
    tintColor: Colors.WHITE,
  },
  singleCbtTitleText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.WHITE,
    width: wp(230),
    paddingLeft: wp(16),
    lineHeight: hp(20),
  },
  singleCbtOptionItem: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2000,
    marginRight: wp(8),
    borderRadius: 64,
  },
  singleCbtOptionText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontSize: hp(10),
    lineHeight: hp(14),
    color: Colors.COUCH_BLUE,
  },
  headerSectionContainer: {
    padding: hp(9),
    borderRadius: hp(64),
    backgroundColor: Colors.COUCH_GREEN_500,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    zIndex: 1000,
  },
  lockIcon: {
    width: wp(14),
    height: hp(14),
    marginRight: wp(5),
  },
  headerTitleStyle: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(12),
    color: Colors.WHITE,
    lineHeight: hp(16),
  },
  checkIcon: {
    width: wp(24),
    height: hp(24),
  },
  cardLine: {
    alignItems: 'center',
    marginRight: 9
  },
  cbtDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  headerSectionWrapper: {
    marginHorizontal: 10,
  },
  cbtLine: {
    borderLeftWidth: 0.6,
    borderLeftColor: Colors.COUCH_BLUE_400,
    height: 53,
    borderColor: Colors.WHITE,
  },
  reachedEndContainer: {
    height: 100,
    paddingTop: 20,
  },
  reachedEnd: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
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
});

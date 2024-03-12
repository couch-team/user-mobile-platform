import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { deviceWidth, hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 24,
  },
  onboardingContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
  },
  logoContainer: {
    marginTop: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionTextContainer: {
    marginTop: hp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 28,
    marginHorizontal: wp(24),
  },
  instructionBodyText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(20),
    width: wp(200),
    textAlign: 'center',
    color: Colors.WHITE,
  },
  mainBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: 18,
    lineHeight: 28.8,
    letterSpacing: -0.64,
    color: Colors.WHITE,
  },
  helpListContainer: {
    marginTop: hp(32),
    marginBottom: hp(20),
  },
  contentContainerStyle: {
    paddingBottom: hp(100),
    width: '100%',
  },
  formLabelTextStyle: {
    color: Colors.WHITE,
  },
  radioIconContainerStyle: {
    bottom: hp(150),
    alignSelf: 'center',
    backgroundColor: Colors.COUCH_BLUE_1000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(17),
    paddingHorizontal: wp(12),
    position: 'absolute',
    borderRadius: hp(16),
  },
  radioIcon: {
    width: 22,
    height: 22,
  },
  radioIconText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(10),
    paddingLeft: wp(10),
    color: Colors.WHITE,
  },
  buttonContainer: {
    height: hp(100),
    position: 'absolute',
    bottom: hp(0),
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    justifyContent: 'center',
  },
  logo: {
    width: wp(94),
    height: hp(20),
  },
  profileImageContainer: {
    marginTop: 72,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileName: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontWeight: '800',
    fontSize: 26,
    lineHeight: 36,
    marginTop: 24,
    color: Colors.COUCH_BLUE,
  },
  instructionHeaderText: {
    marginTop: 28,
    color: Colors.COUCH_BLUE_1100,
    lineHeight: 28,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraRegular,
  },
  instructionText: {
    marginTop: 20,
    color: Colors.COUCH_BLUE_500,
    lineHeight: 25,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraRegular,
    letterSpacing: -0.48,
  },
  topPadding: {
    paddingTop: hp(20),
  },
  moodIconContainer: {
    flexDirection: 'row',
    marginTop: 48,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  moodContainer: {
    flex:1,
    height: 72,
    width: 72,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 228, 248, 0.08)',
  },
  moodIcon: {
    width: wp(40),
    height: hp(40),
  },
  buttonStyle: {
    marginTop: 98,
  },
  longArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(40),
    alignItems: 'center',
  },
  longArrowText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(16),
    lineHeight: hp(20),
    color: Colors.COUCH_BLUE,
  },
  longArrow: {
    width: wp(53),
    height: hp(20),
    marginLeft: wp(16),
    tintColor: Colors.COUCH_BLUE,
  },
  checkboxStyle: {
    width: wp(160),
    marginRight: wp(5),
  },
  checkboxTextStyle: {
    fontSize: hp(12),
    right: wp(5),
  },
  boxesIcon: {
    width: deviceWidth,
    height: hp(400),
    marginTop: hp(50),
  },
  nextStageButtonStyle: {
    marginBottom: hp(75),
  },
  gradientImage: {
    bottom: hp(60),
    width: deviceWidth,
  },
  saveProgressButtonStyle: {
    backgroundColor: Colors.COUCH_BLUE_400,
  },
});

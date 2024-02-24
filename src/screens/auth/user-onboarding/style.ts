import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { deviceWidth, hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: hp(20),
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
    fontSize: hp(18),
    color: Colors.WHITE,
  },
  helpListContainer: {
    marginTop: hp(32),
    marginBottom: hp(20),
  },
  contentContainerStyle: {
    paddingBottom: hp(100),
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
    marginTop: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  profileName: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(26),
    lineHeight: hp(40),
    paddingTop: hp(18),
    color: Colors.COUCH_BLUE,
  },
  instructionText: {
    paddingTop: hp(50),
    color: Colors.COUCH_BLUE_500,
    lineHeight: hp(25),
    fontSize: hp(13),
    paddingHorizontal: wp(20),
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraRegular,
  },
  topPadding: {
    paddingTop: hp(20),
  },
  moodIconContainer: {
    flexDirection: 'row',
    marginTop: hp(48),
    width: wp(336),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodContainer: {
    width: 72,
    height: 72,
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
    marginTop: hp(80),
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

import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { deviceHeight, deviceWidth, hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  imageBg: {
    width: deviceWidth,
    height: deviceHeight,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(80),
  },
  logo: {
    width: wp(95),
    height: hp(24),
  },
  bodyContainer: {
    backgroundColor: Colors.PRIMARY_MODAL_200,
    paddingVertical: hp(42),
    height: deviceWidth * 1.6,
    paddingHorizontal: wp(24),
  },
  welcomeText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.COUCH_BLUE,
    fontSize: hp(14),
    lineHeight: hp(18),
  },
  getStartedText: {
    color: Colors.WHITE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(20),
    paddingTop: hp(10),
    lineHeight: hp(24),
  },
  formContainer: {
    marginTop: hp(40),
  },
  checkBox: {
    width: wp(22),
    height: hp(22),
  },
  termsTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: hp(10),
  },
  termsText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(12),
    color: Colors.WHITE,
    paddingLeft: wp(10),
  },
  buttonStyle: {
    marginTop: hp(40),
  },
  signInText: {
    alignSelf: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(14),
  },
  signInLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(20),
    alignSelf: 'center',
  },
  signInLink: {
    color: Colors.COUCH_BLUE,
    fontSize: hp(14),
    paddingLeft: wp(10),
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  termsLink: {
    color: Colors.COUCH_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  forgetPassText: {
    alignSelf: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(14),
  },
  forgetPassLink: {
    color: Colors.COUCH_BLUE,
    fontSize: 14,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight:"900",
  },
  forgetPassContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems:"center",
    justifyContent: 'flex-end',
  },
  forgetPassBtn:{
    paddingTop: 10,
    paddingBottom: 13.49,
    paddingLeft: 17,
    paddingRight: 14,
    backgroundColor: Colors.COUCH_BLUE_1200,
    borderRadius: wp(100)
  }
});

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
    backgroundColor: Colors.PRIMARY_DARKBLUE,
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
    marginTop: hp(28),
  },
  buttonStyle: {
    marginTop: hp(40),
  },
  verifyAccountText: {
    alignSelf: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(14),
    fontWeight: '900',
  },
  verifyAccountLink: {
    color: Colors.COUCH_BLUE,
    fontSize: hp(14),
    marginTop: wp(9),
    marginHorizontal: wp(10),
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight: '900',
  },
  verifyAccountTextColor: {
    color: Colors.COUCH_BLUE_50,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 14,
  },
  iconContainer: {
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(20),
    gap:10
  },
  contactIcon: {
    width: 32,
    height: 32,
  },
  emailTextContainer: {
    marginTop: hp(24),
    marginBottom: hp(16),
    backgroundColor: Colors.COUCH_BLUE_100,
    paddingHorizontal: wp(15),
    height: hp(38),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: hp(64),
  },
  emailText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(13),
    color: Colors.YELLOW_300,
    lineHeight: hp(17),
  },
  resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resendCodeText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.WHITE,
    fontSize: hp(12),
  },
  resendCodeButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_200,
    marginLeft: wp(10),
    height: hp(38),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(14),
    borderRadius: hp(64),
  },
  resendCodeButtonText: {
    color: Colors.COUCH_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(12),
  },
  infoContainer:{
    flexDirection:"row",
    marginVertical: hp(20),
    gap:hp(2),
    alignItems: "center"
  },
  infoIcon: {
    height: 24,
    width: 24,
  },
  infoText:{
    color: "#1E90FF",
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14)
  },
  changeEmail: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: Colors.WHITE,
  }
});

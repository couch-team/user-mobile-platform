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
    marginTop: hp(40),
  },
  buttonStyle: {
    marginTop: hp(30),
  },

  forgetPassText: {
    alignSelf: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(14),
    fontWeight:"900"
  },
  forgetPassLink: {
    color: Colors.COUCH_BLUE,
    fontSize: hp(14),
    marginTop:wp(9),
    marginHorizontal:wp(10),
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight:"900"
  },
  forgetPassContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems:"center",
    justifyContent: 'flex-end',
  },
  iconContainer: {
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(40),
    gap:10
  },
  contactIcon: {
    width: 32,
    height: 32,
  },
  forgetPassTextColor:{
    color: Colors.COUCH_BLUE_50,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight:"400",
    fontSize: 14,
    marginVertical:14
  }
});
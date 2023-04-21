import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { hp, wp } from '../../../constants/layout';

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
});

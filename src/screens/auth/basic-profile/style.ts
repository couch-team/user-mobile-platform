import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  logoContainer: {
    marginTop: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(140),
  },
  bodyContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(24),
  },
  bodyTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  bodyMainText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.PLACEHOLDER_COLOR,
  },
  bodySubText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(16),
    paddingTop: hp(10),
    color: Colors.WHITE,
  },
  logo: {
    width: wp(86),
    height: hp(22),
  },
  textBodyContainer: {
    marginTop: hp(40),
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
  profileStepContainer: {
    flexDirection: 'row',
    marginTop: hp(40),
  },
  profileItemStepContainer: {
    width: wp(66),
    height: hp(7),
    marginRight: wp(8),
    borderRadius: hp(72),
    backgroundColor: Colors.COUCH_BLUE,
  },
  notActiveStep: {
    backgroundColor: Colors.COUCH_BLUE_300,
  },
  inputFormContainer: {
    marginTop: hp(30),
  },
  genderListContainer: {
    marginTop: hp(24),
    marginBottom: hp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderLabelText: {
    color: Colors.WHITE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(16),
    lineHeight: hp(18),
  },
  flatListContainer: {
    marginTop: hp(24),
  },
  genderItemContainer: {
    width: wp(150),
    height: hp(55),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    flexDirection: 'row',
    marginRight: wp(20),
    alignItems: 'center',
    marginBottom: hp(20),
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
    borderRadius: hp(64),
  },
  genderItemWidth: {
    width: wp(323),
  },
  selectedGender: {
    borderWidth: hp(1.5),
    borderColor: Colors.COUCH_BLUE,
  },
  genderItemText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14),
    lineHeight: hp(18),
    color: Colors.COUCH_BLUE,
  },
  radioIcon: {
    width: wp(20),
    height: hp(20),
  },
  profileSectionContainer: {
    height: hp(550),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
  },
  profileImageContainer: {
    position: 'absolute',
    top: -hp(100),
    alignSelf: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
  },
  selectedProfileImage: {
    borderRadius: 100,
  },
  instructionText: {
    marginTop: hp(10),
    paddingHorizontal: wp(38),
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.PLACEHOLDER_COLOR,
    textAlign: 'center',
    lineHeight: hp(26),
    fontSize: hp(13),
  },
  buttonStyle: {
    marginTop: hp(100),
  },
  uriProfile: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  imageIconContainer: {
    marginRight: wp(20),
  },
  longArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(20),
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
  imageListContainer: {
    zIndex: 1000000,
    alignSelf: 'center',
    marginTop: hp(120),
  },
});

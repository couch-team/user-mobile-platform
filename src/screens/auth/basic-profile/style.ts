import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  bodyContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(24),
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
});

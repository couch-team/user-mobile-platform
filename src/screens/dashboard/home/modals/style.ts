import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  infoDataIcon: {
    width: 140,
    height: 140,
    marginTop: hp(20),
    alignSelf: 'center',
  },
  singleTourContainer: {
    width: deviceWidth,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  buttonStyle: {
    marginTop: hp(20),
    marginRight: wp(20),
  },
  backgroundImage: {
    width: deviceWidth,
    marginTop: hp(40),
    height: hp(100),
  },
  bodySectionContainer: {
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    height: deviceWidth * 1.2,
    alignItems: 'center',
    borderWidth: 1,
  },
  tourTitleStyle: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(24),
    paddingTop: hp(10),
    color: Colors.WHITE,
  },
  tourSubTitleStyle: {
    paddingTop: hp(28),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    textAlign: 'center',
  },
  descriptionBodyText: {
    paddingTop: hp(25),
    color: Colors.COUCH_TEXT_COLOR,
    paddingHorizontal: wp(30),
    fontFamily: Typography.fontFamily.SoraRegular,
    lineHeight: hp(24),
    textAlign: 'center',
  },
  longArrowStyle: {
    tintColor: Colors.BLACK,
    right: wp(7),
  },
  paginationWrapper: {
    position: 'absolute',
    zIndex: 10000,
    bottom: deviceWidth * 1.25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  longButtonStyle: {
    marginTop: hp(70),
    width: wp(112),
  },
  titleStyle: {
    color: Colors.BLACK,
  },
  paginationDots: {
    width: wp(21),
    height: hp(8),
    backgroundColor: Colors.LIGHT_GREEN_400,
    borderRadius: 100,
    marginLeft: wp(12),
  },
});

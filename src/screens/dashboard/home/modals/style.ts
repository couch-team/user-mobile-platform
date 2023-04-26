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
  buttonStyle: {
    marginTop: hp(20),
    marginRight: wp(20),
  },
  backgroundImage: {
    width: deviceWidth,
    marginTop: hp(50),
    height: hp(100),
  },
  bodySectionContainer: {
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    height: deviceWidth * 1.2,
    alignItems: 'center',
  },
  tourTitleStyle: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(20),
    color: Colors.WHITE,
    // top:
  },
  tourSubTitleStyle: {
    paddingTop: hp(10),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    textAlign: 'center',
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
  paginationDots: {
    width: wp(21),
    height: hp(8),
    backgroundColor: Colors.LIGHT_GREEN_400,
    borderRadius: 100,
    marginLeft: wp(12),
  },
});

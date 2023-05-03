import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  bodyContainer: {
    marginTop: hp(10),
  },
  profileUserContainer: {
    marginTop: hp(12),
  },
  profileUserText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(20),
  },
  profileSubText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.PLACEHOLDER_COLOR,
    paddingTop: hp(5),
    fontSize: hp(14),
  },
  exploreIcon: {
    width: wp(28),
    height: hp(28),
  },
  contentContainerStyle: {
    marginTop: hp(32),
    marginLeft: wp(24),
  },
  exploreItemContainerStyle: {
    marginBottom: hp(24),
    marginRight: wp(20),
    height: hp(203),
    width: wp(150),
    padding: hp(16),
    borderRadius: hp(12),
    backgroundColor: Colors.COUCH_BLUE_2100,
  },
  exploreInfoContainer: {
    // width: wp(129),
    marginTop: hp(60),
    justifyContent: 'flex-end',
  },
  exploreMainText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontSize: hp(12),
  },
  exploreBodyText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(10.5),
    color: Colors.WHITE,
    lineHeight: hp(18),
  },
  exploreIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: Colors.COUCH_BLUE_2000,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

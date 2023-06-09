import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  cbtItemContainer: {
    marginHorizontal: wp(24),
    marginTop: hp(20),
  },
  cbtImageStyle: {
    height: hp(202),
    width: wp(330),
    borderRadius: hp(16),
    position: 'absolute',
    zIndex: -100,
  },
  cbtImageGradientStyle: {
    height: hp(202),
    width: wp(330),
    paddingHorizontal: wp(14),
    paddingVertical: hp(26),
    borderRadius: hp(16),
  },
  cbtHeaderTitleText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    color: Colors.WHITE,
    fontSize: hp(16),
    lineHeight: hp(23),
    width: wp(211),
  },
  cbtSubHeaderText: {
    paddingTop: hp(20),
    width: wp(248),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.OFF_WHITE_400,
  },
  cbtItemFeaturesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
  },
  cbtItemBodyContainer: {
    padding: hp(8),
    backgroundColor: Colors.OFF_WHITE_300,
    marginRight: wp(10),
    borderRadius: hp(64),
  },
  cbtItemText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(12),
    color: Colors.WHITE,
  },
});

import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  podcastSectionContainer: {
    marginTop: hp(30),
  },
  podcastSectionHeaderText: {
    color: Colors.COUCH_BLUE_1100,
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(20),
    lineHeight: hp(25),
  },
  podcastContentContainer: {
    paddingLeft: wp(24),
  },
  recommendedSectionContainer: {
    marginHorizontal: wp(23),
  },
  videoImage: {
    marginTop: hp(14),
    width: wp(333),
    height: hp(212),
  },
});

import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerContainer: {
    height: hp(110),
    borderWidth: 1,
    alignSelf: 'center',
  },
  sectionContainer: {
    marginTop: hp(30),
    backgroundColor: Colors.WARNING_AMBER,
  },
  sectionListStyle: {},
  hasSubTextStyle: {
    fontSize: hp(12),
  },
  contentContainerStyle: {
    marginHorizontal: wp(24),
    marginTop: hp(20),
  },
  singleReadItemContainer: {
    marginBottom: hp(32),
  },
  readImage: {
    height: hp(149),
    width: wp(333),
  },
  readTextTitle: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(16),
    lineHeight: hp(25),
    color: Colors.WHITE,
  },
});

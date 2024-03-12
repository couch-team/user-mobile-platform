import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../../constants/layout';
import { Colors, Typography } from '../../../../theme/config';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(32),
    marginHorizontal: wp(24),
  },
  headerTitleContainer: {
    height: hp(40),
    borderRadius: hp(64),
    paddingHorizontal: wp(12),
    backgroundColor: Colors.COUCH_BLUE_800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: hp(15),
    textTransform: 'uppercase',
    letterSpacing: 1.92,
    color: Colors.COUCH_BLUE,
  },
  headerCountContainer: {
    width: wp(45),
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_800,
    borderRadius: hp(64),
  },
});

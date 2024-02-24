import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  previewContainer: {
    marginHorizontal: wp(10),
    marginTop: hp(30),
  },
  previewTitle: {
    fontWeight: '700',
    textAlign: 'left',
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(24),
    lineHeight: hp(30),
    paddingVertical: hp(18),
    color: Colors.COUCH_BLUE_900,
  },
  previewDocument: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(16),
    fontWeight: '400',
    lineHeight: hp(32),
    paddingVertical: hp(8),
    color: Colors.COUCH_BLUE_900,
  },
  previewButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_200,
    // marginLeft: wp(10),
    height: hp(38),
    width:wp(220),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(14),
    borderRadius: hp(64),
  },
  previewButtonText: {
    color: Colors.COUCH_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(12),
    fontWeight:"900"
  },
  headerRightContainer: {
    flexDirection: 'row',
    width: 115,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerRightIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2300,
    borderRadius: 100,
  },
  headerRightMood: {
    width: wp(40),
    height: hp(40),
  },
  headerRightIcon: {
    width: wp(20),
    height: hp(20),
    tintColor: Colors.COUCH_BLUE,
  },
  noteBodyContainer: {
    // marginTop: hp(32),
    marginVertical: hp(18),
  },
});

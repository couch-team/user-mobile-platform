import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  previewContainer: {
    // marginVertical: hp(10),
    paddingHorizontal: 20,
    flex: 1,
  },
  previewTitle: {
    fontWeight: '700',
    textAlign: 'left',
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(24),
    lineHeight: hp(30),
    paddingVertical: hp(10),
    // marginHorizontal: wp(8),
    color: Colors.COUCH_BLUE_900,
  },
  previewDocument: {
    paddingTop: hp(10),
    // paddingHorizontal: 5,
    flex: 1,
  },
  previewButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_200,
    height: hp(34),
    // width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: wp(12),
    borderRadius: hp(64),
  },
  previewButtonText: {
    color: Colors.COUCH_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14),
    fontWeight: '900',
    // width: 'auto',
  },
  mood: {
    width: 33,
    height: 33,
  },
  moodView: {
    padding: 7.5,
    borderRadius: 50,
    backgroundColor: Colors.COUCH_BLUE_2300,
  },
  headerRightContainer: {
    flexDirection: 'row',
    width: 115,
    justifyContent: 'space-between',
    alignItems: 'center',
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

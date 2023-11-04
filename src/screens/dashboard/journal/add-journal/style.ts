import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  noteOptionBodyContainer: {
    marginHorizontal: wp(24),
    marginTop: hp(32),
  },
  titleTextStyle: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(24),
    lineHeight: hp(30),
    color: Colors.COUCH_BLUE_900,
  },
  image: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COUCH_BLUE_800,
  },
  noteBodyItem: {
    marginTop: hp(28),
  },
  textInput: {
    width: 200,
    height: 100,
    borderColor: 'blue',
    margin: 10,
    borderWidth: 1,
  },
  closeIconContainer: {
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COUCH_BLUE_2300,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.COUCH_BLUE,
  },
  changeImageBtn: {
    borderWidth: 5,
    borderRadius: hp(50),
    paddingVertical: hp(12),
    paddingHorizontal: wp(20),
    backgroundColor: Colors.COUCH_BLUE,
    borderColor: Colors.WHITE_TRANSPARENT_12,
  },
  changeImageText: {
    fontSize: hp(16),
    color: Colors.WHITE,
    fontFamily: Typography.fontFamily.SoraSemiBold,
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
});

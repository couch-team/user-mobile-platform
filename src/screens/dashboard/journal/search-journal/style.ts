import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  emptyMoodTrackerContainer: {
    marginTop: hp(20),
    height: hp(400),
    marginHorizontal: wp(24),
    borderRadius: hp(16),
    backgroundColor: Colors.WHITE_TRANSPARENT,
  },
  emptyMoodIconContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_2200,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 69,
  },
  emptyMoodIcon: {
    width: 80,
    height: 80,
  },
  emptyTextContainer: {
    marginTop: hp(40),
    paddingHorizontal: wp(28),
  },
  emptyMainText: {
    color: Colors.COUCH_BLUE_1100,
    fontFamily: 'Sora-Medium',
    textAlign: 'center',
    fontSize: hp(14),
    lineHeight: hp(19),
  },

  emptyBodyText: {
    fontFamily: 'Sora-Regular',
    paddingTop: hp(16),
    textAlign: 'center',
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(13),
  },
  searchContainer:{
    flexDirection: "column",
    alignItems:"center"
  }
});

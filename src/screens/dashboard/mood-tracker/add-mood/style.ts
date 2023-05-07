import { deviceWidth, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerTextStyle: {
    marginTop: hp(40),
  },
  moodItemContainer: {
    paddingHorizontal: wp(14),
    borderRadius: 64,
    paddingVertical: hp(12),
    borderWidth: 0.7,
    marginRight: wp(10),
    marginBottom: hp(18),
  },
  moodItemText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_TEXT_COLOR,
    fontSize: hp(13),
  },
  selectedMoodTextStyle: {
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(17),
    marginHorizontal: wp(15),
  },
  buttonContainer: {
    height: hp(100),
    position: 'absolute',
    bottom: hp(0),
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    justifyContent: 'center',
  },
});

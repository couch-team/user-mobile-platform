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
  unitInputContainer: {
    marginTop: hp(32),
    marginHorizontal: wp(24),
  },
  formInputLabel: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    lineHeight: hp(17),
    color: Colors.WHITE,
  },
  inputLabelContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputLabel: {
    color: Colors.WHITE,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.48,
  },
  textInputBoxContainer: {
    height: hp(172),
    marginTop: hp(12),
    borderRadius: hp(16),
    padding: hp(16),
    borderWidth: 1,
    paddingTop: hp(16),
    fontFamily: Typography.fontFamily.SoraMedium,
    borderColor: Colors.COUCH_BLUE_1800,
    color: Colors.WHITE,
  },
  textCount: {
    color: Colors.WHITE,
    fontFamily: Typography.fontFamily.SoraMedium,
    paddingTop: hp(10),
    alignSelf: 'flex-end',
  },
  moodIcon: {
    width: 172,
    height: 172,
    alignSelf: 'center',
    marginTop: hp(30),
  },
  moodBodyContainer: {
    marginTop: hp(50),
  },
  ellipseImage: {
    width: deviceWidth,
    height: hp(50),
  },
  moodDataContainer: {
    backgroundColor: Colors.PRIMARY,
    height: hp(400),
  },
  moodIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  moodLogTimeContainer: {
    backgroundColor: Colors.COUCH_GREEN_300,
    alignSelf: 'center',
    paddingVertical: hp(12),
    paddingHorizontal: wp(14),
    borderRadius: hp(256),
  },
  moodLogTimeText: {
    color: Colors.GREEN_100,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(12),
    lineHeight: hp(16),
  },
  todaysMoodText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(20),
    color: Colors.GREEN_100,
    paddingTop: hp(28),
    textAlign: 'center',
  },
  loggedThoughtsText: {
    paddingTop: hp(28),
    width: wp(327),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(16),
    lineHeight: hp(20),
    color: Colors.COUCH_BLUE_1100,
  },
  buttonStyle: {
    backgroundColor: Colors.GREEN_100,
  },
  titleStyle: {
    color: Colors.PRIMARY_DARKBLUE,
  },
});

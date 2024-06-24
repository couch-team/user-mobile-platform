import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    position: 'relative',
    paddingTop: Constants.statusBarHeight,
  },
  noteOptionBodyContainer: {
    flex: 1,
  },
  titleTextStyle: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(24),
    // lineHeight: hp(30),
    paddingVertical: hp(5),
    color: Colors.COUCH_BLUE_900,
    marginHorizontal: wp(20),
  },
  promptTextStyle: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(14),
    color: Colors.COUCH_BLUE_900,
  },
  noteBodyContainer: {
    marginTop: hp(12),
  },
  textInput: {
    width: 200,
    height: 100,
    borderColor: 'blue',
    margin: 10,
    borderWidth: 1,
  },
  noteOptionContainer: {
    width: wp(350),
    borderRadius: hp(64),
    height: hp(68),
    marginVertical: 10,
    backgroundColor: Colors.PRIMARY_DARKBLUE,
  },
  noteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
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

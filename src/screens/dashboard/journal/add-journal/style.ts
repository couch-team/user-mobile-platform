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
  noteBodyContainer: {
    marginTop: hp(32),
  },
  textInput: {
    width: 200,
    height: 100,
    borderColor: 'blue',
    margin: 10,
    borderWidth: 1,
  },
});

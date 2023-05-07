import { hp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerTextStyle: {
    marginTop: hp(40),
  },
});

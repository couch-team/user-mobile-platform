import { hp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerContainer: {
    height: hp(110),
    borderWidth: 1,
    alignSelf: 'center',
  },
  sectionContainer: {
    marginTop: hp(30),
    backgroundColor: Colors.WARNING_AMBER,
  },
  sectionListStyle: {},
});

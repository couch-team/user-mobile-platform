import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme/config';
import { deviceHeight, deviceWidth, hp, wp } from '../../../constants/layout';

export const styles = StyleSheet.create({
  progressHeaderContainer: {
    flexDirection: 'row',
    // marginHorizontal: wp(10),
    marginTop: hp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ellipseIcon: {
    width: 10,
    height: 10,
  },
})
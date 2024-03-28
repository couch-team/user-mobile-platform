import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../theme/config';
import { deviceWidth, hp, wp } from '../../../../constants/layout';

export const styles = StyleSheet.create({
  containerStyles: {
    height: hp(300),
  },
  container: {
    backgroundColor: Colors.PRIMARY_MODAL_100,
    paddingVertical: hp(16),
    paddingHorizontal: 24,
    width: deviceWidth,
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
    paddingBottom: hp(50),
    height: hp(600),
  },
  searchInputContainer: {
    marginTop: hp(10),
    width: '100%',
    height: hp(50),
    borderRadius: hp(64),
    paddingHorizontal: wp(19),
    borderWidth: 1,
    borderColor: Colors.COUCH_BLUE_400,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contentContainerStyle: {
    paddingBottom: hp(200),
    marginTop: 20,
  },
  searchInput: {
    width: wp(250),
    height: hp(50),
    color: Colors.WHITE,
    fontSize: hp(14),
    fontFamily: Typography.fontFamily.SoraRegular,
  },
  singleCountryContainer: {
    height: 56,
  },
  emptyContainer: {
    paddingVertical: hp(130),
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryName: {
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14),
    color: Colors.WHITE,
  },
  searchIcon: {
    width: wp(20),
    height: hp(20),
  },
});

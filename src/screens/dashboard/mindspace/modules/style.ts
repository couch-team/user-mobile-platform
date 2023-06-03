import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  podcastSectionContainer: {},
  recommendedSectionItemContainer: {
    marginHorizontal: wp(24),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
    paddingVertical: hp(20),
    paddingHorizontal: wp(16),
    borderRadius: hp(14),
  },
  podcastSectionHeaderText: {
    color: Colors.COUCH_BLUE_1100,
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(20),
    lineHeight: hp(25),
  },
  podcastContentContainer: {
    paddingLeft: wp(24),
  },
  recommendedSectionContainer: {
    marginHorizontal: wp(24),
  },
  videoImage: {
    marginTop: hp(14),
    width: wp(333),
    height: hp(212),
    marginHorizontal: wp(24),
  },
  categoriesHeaderText: {
    paddingHorizontal: wp(24),
    paddingTop: hp(31),
    fontSize: hp(16),
    fontFamily: Typography.fontFamily.SoraSemiBold,
    color: Colors.COUCH_BLUE_1100,
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0,
  },
  categoriesListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(20),
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    paddingVertical: hp(10),
    borderTopColor: Colors.COUCH_BLUE_400,
    borderBottomColor: Colors.COUCH_BLUE_400,
  },
  categoryListItemContainer: {
    width: wp(80),
    marginBottom: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryListText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(10),
    paddingTop: hp(12),
    color: Colors.COUCH_BLUE_900,
  },
  voiceNoteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceNoteIcon: {
    width: wp(24),
    height: hp(24),
  },
  headerTextStyle: {
    marginHorizontal: 0,
  },
  hasSubTextStyle: {
    fontSize: hp(12),
  },
  textStyle: {
    fontSize: hp(16),
  },
  recentlyReadContainer: {
    marginTop: hp(34),
  },
  recentlyReadHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: wp(23),
    height: hp(23),
  },
  readItemListContainer: {
    marginTop: hp(20),
  },
  singleReadItemContainer: {
    marginBottom: hp(32),
  },
  readImage: {
    height: hp(149),
    width: wp(333),
  },
  readTextTitle: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(16),
    lineHeight: hp(25),
    color: Colors.WHITE,
  },
});

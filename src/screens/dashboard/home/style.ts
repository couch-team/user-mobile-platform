import { hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  bodyContainer: {
    marginTop: hp(10),
    marginHorizontal: wp(24),
  },
  headerContainer: {
    flexDirection: 'row-reverse',
  },
  notificationIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COUCH_BLUE_600,
  },
  notificationIcon: {
    width: wp(20),
    height: hp(20),
  },
  profileUserContainer: {
    marginTop: hp(12),
  },
  profileUserText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(20),
  },
  profileSubText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.PLACEHOLDER_COLOR,
    paddingTop: hp(5),
    fontSize: hp(14),
  },
  moodTrackerBodyContainer: {
    marginTop: hp(30),
  },
  moodTrackerHeaderText: {
    paddingBottom: 10,
    color: Colors.COUCH_BLUE_1100,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(16),
  },
  moodTrackerContainer: {
    flexDirection: 'row',
  },
  singleMoodTrackerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(8),
    borderRadius: 100,
    marginRight: wp(10),
  },
  trackerText: {
    paddingLeft: 1,
    fontSize: hp(12),
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  tourInfoContainer: {
    height: hp(380),
    marginTop: hp(30),
    borderRadius: hp(18),
    padding: hp(16),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
  },
  xIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_1200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  xIcon: {
    width: wp(20),
    height: hp(20),
  },
  tourBodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  tourBodyInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  tourBodyMainText: {
    color: Colors.YELLOW_200,
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(20),
    lineHeight: hp(30),
  },
  tourBodySubText: {
    color: Colors.COUCH_BLUE_500,
    paddingTop: hp(5),
    fontFamily: Typography.fontFamily.SoraRegular,
    width: 290,
    textAlign: 'center',
    fontSize: hp(15),
    lineHeight: hp(23),
  },
  buttonStyle: {
    width: wp(223),
    marginTop: hp(30),
  },
});
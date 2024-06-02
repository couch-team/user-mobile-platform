import { deviceHeight, hp, wp } from 'constants/layout';
import { StyleSheet } from 'react-native';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';
import { Colors, Typography } from 'theme/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  notificationButtonContainer: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(66),
    marginTop: hp(20),
  },
  contentContainerStyle: {
    paddingRight: wp(30),
    paddingLeft: wp(10),
  },
  notificationButtonText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_TEXT_COLOR,
  },
  activeButtonContainer: {
    backgroundColor: Colors.COUCH_BLUE_800,
    borderRadius: hp(48),
    height: hp(40),
    top: hp(13),
  },
  sectionListContainer: {
    marginTop: hp(10),
    paddingBottom: hp(100),
  },
  sectionListStyle: {
    height:
      // hasDynamicIsland() || hasNotch()
         deviceHeight * 0.62 ||
        deviceHeight * 0.66,
  },
  activeButtonBottomContainer: {
    borderBottomWidth: hp(5),
    borderBottomColor: Colors.COUCH_BLUE,
    top: hp(25),
  },
  notificationListBodyContainer: {
    marginHorizontal: wp(24),
  },
  newNotificationListContainer: {
    marginTop: hp(10),
  },
  notificationHeaderText: {
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    paddingBottom: hp(16),
  },
  notificationBodyContainer: {
    marginBottom: hp(16),
    backgroundColor: Colors.COUCH_BLUE_200,
    padding: hp(12),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(16),
  },
  newNotificationContainer: {
    borderWidth: hp(1.2),
    borderColor: Colors.COUCH_BLUE,
  },
  notificationIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: Colors.COUCH_BLUE_1300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  notificationIcon: {
    width: wp(25),
    height: hp(25),
  },
  notificationBodyTextContainer: {
    marginLeft: wp(10),
  },
  notificationBodyMainTitle: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(12),
    width: wp(230),
    color: Colors.WHITE,
  },
  notificationBodyMainText: {
    fontFamily: Typography.fontFamily.SoraLight,
    fontSize: hp(10),
    color: Colors.WHITE,
    marginTop: 6,
  },
  notificationTimeText: {
    paddingTop: hp(4),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(10),
    color: Colors.COUCH_TEXT_COLOR,
  },
  reachedEndContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  reachedEnd: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
  }
});

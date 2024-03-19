import { hp, wp } from "constants/layout";
import { Dimensions, StyleSheet } from "react-native";
import { Colors, Typography } from "theme/config";

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0E36',
    },
    plusParent: {
      position: "absolute",
      flex: 1,
      zIndex: 1,
      height: windowHeight,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingHorizontal: 24,
      paddingBottom: 24,
      pointerEvents: 'box-none'
    },
    plusIconContainer: {
      width: 70,
      height: 70,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.COUCH_BLUE,
      zIndex: 1000,
    },
    plusIcon: {
      width: wp(44),
      height: hp(44),
    },
    topSection: {
      paddingBottom: 47,
    },
    body: {
      paddingHorizontal: 24,
      width: '100%',
      backgroundColor: Colors.PRIMARY,
      marginTop: -44,
    },
    curve: {
      width: '100%',
      height: 76,
    },
    headerText: {
      fontFamily: Typography.fontFamily.SoraBold,
      fontSize: 18,
      lineHeight: 22.68,
      letterSpacing: -0.48,
      color: Colors.COUCH_BLUE_1100,
      fontWeight: '700',
    },
    affirmationImage: {
      width: '100%',
      height: 135,
      marginTop: 26,
    },
    emptyMoodTrackerContainer: {
      marginTop: hp(20),
      height: hp(400),
      borderRadius: hp(16),
      backgroundColor: Colors.WHITE_TRANSPARENT,
    },
    emptyMoodIconContainer: {
      width: 140,
      height: 140,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.COUCH_BLUE_2200,
      alignSelf: 'center',
      borderRadius: 100,
      marginTop: 69,
    },
    emptyMoodIcon: {
      width: 80,
      height: 80,
    },
    emptyTextContainer: {
      marginTop: hp(40),
      paddingHorizontal: wp(28),
    },
    emptyMainText: {
      color: Colors.COUCH_BLUE_1100,
      fontFamily: 'Sora-Medium',
      textAlign: 'center',
      fontSize: hp(14),
      lineHeight: hp(19),
    },
    emptyBodyText: {
      fontFamily: 'Sora-Regular',
      paddingTop: hp(16),
      textAlign: 'center',
      color: Colors.COUCH_TEXT_COLOR,
      fontSize: hp(13),
    },
    headerSectionWrapper: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 10,
    },
    headerSectionContainer: {
      backgroundColor: '#F3F3FC1F',
      borderRadius: 64,
      paddingVertical: 6,
      paddingHorizontal: 14,
      width: 'auto'
    },
    headerTitleStyle: {
      fontFamily: Typography.fontFamily.SoraMedium,
      fontSize: hp(14),
      lineHeight: 20,
      color: Colors.COUCH_BLUE_1100,
    },
    headerIcon: {
      width: wp(16),
      height: hp(26),
    },
    contentContainerStyle: {
      paddingBottom: hp(200),
    },
    moodIcon: {
      width: wp(53),
      height: hp(53),
    },
    reachedEndContainer: {
      paddingTop: 20,
      height: 100,
    },
    reachedEnd: {
      color: Colors.WHITE,
      textAlign: 'center',
      fontFamily: Typography.fontFamily.SoraMedium,
    },
    cardParent: {
      flexDirection: 'row',
      gap: 9,
      height: 90,
      width: '100%',
    },
    cardStatus: {
      alignItems: 'center',
    },
    cardContainer: {
      height: '100%',
      borderRadius: 16,
      backgroundColor: '#FEFBF50A',
      flexDirection: 'row',
      alignItems: 'center',
    },
    completeCircle: {
      width: 24,
      height: 24,
      borderRadius: 24,
      backgroundColor: '#242740',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%'
    },
    itemMoodBodyContainer: {
      marginLeft: wp(14),
      width: '76%'
    },
    cardLabel: {
      width: '10%',
      height: '100%',
      borderBottomLeftRadius: 16,
      borderTopLeftRadius: 16,
    },
    cardHeader: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.64,
      color: Colors.COUCH_BLUE_1100,
      fontFamily: Typography.fontFamily.SoraRegular
    },
    cardTimeContainer: {
      backgroundColor: '#A2A5E914',
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 64,
    },
    cardTimeText: {
      color: Colors.COUCH_BLUE,
      fontSize: 10,
      lineHeight: 15,
      letterSpacing: -0.48,
      fontFamily: Typography.fontFamily.SoraSemiBold,
      fontWeight: '600',
    },
    timeWrapper: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 15
    },
    horizontalLine: {
      width: 1.2,
      backgroundColor: '#E3E4F83D',
    }
})
export default styles;
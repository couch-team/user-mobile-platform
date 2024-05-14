import { hp, wp } from 'constants/layout';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';

interface PlannerHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const PlannerHeader = ({
  activeIndex,
  setActiveIndex,
}: PlannerHeaderProps) => {
  const buttons = ["Today", "View All"];

  return (
    <ScrollView
      horizontal
      style={styles.scrollContainer}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      {buttons.map((button, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.notificationButtonContainer,
                activeIndex === index && styles.activeButtonContainer,
              ]}>
              <Text
                style={[
                  styles.notificationButtonText,
                  activeIndex === index && styles.activeButtonText,
                ]}>
                {button}
              </Text>
            </TouchableOpacity>
            <View
              style={
                activeIndex === index && styles.activeButtonBottomContainer
              }
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingLeft: wp(12),
        justifyContent: 'center',
        bottom: hp(20),
        marginTop: hp(10),
    },
    scrollContainer: {

    },
    notificationButtonContainer: {
        paddingHorizontal: wp(16),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(66),
        width: wp(155.5),
        marginTop: hp(20),
    },
    activeButtonContainer: {
        backgroundColor: Colors.COUCH_BLUE_800,
        borderRadius: hp(48),
        height: hp(40),
        top: hp(13),
    },
    notificationButtonText: {
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.COUCH_TEXT_COLOR,
        fontSize: hp(14),
        paddingLeft: wp(5),
    },
    activeButtonText: {
        fontFamily: Typography.fontFamily.SoraBold,
        color: Colors.COUCH_BLUE,
    },
    activeButtonBottomContainer: {
        borderBottomWidth: hp(5),
        borderBottomColor: Colors.COUCH_BLUE,
        top: hp(25),
    },
})
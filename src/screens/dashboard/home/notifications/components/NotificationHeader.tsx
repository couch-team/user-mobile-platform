import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../style';

interface NotificationHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const NotificationHeader = ({
  activeIndex,
  setActiveIndex,
}: NotificationHeaderProps) => {
  const buttons = [
    'All',
    'Mood',
    'Journal',
    'Planner',
  ];
  return (
    <ScrollView
      horizontal
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
              <Text style={styles.notificationButtonText}>{button}</Text>
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

export default NotificationHeader;

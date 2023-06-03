import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';

interface MindSpaceHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const MindSpaceHeader = ({
  activeIndex,
  setActiveIndex,
}: MindSpaceHeaderProps) => {
  const buttons = [
    {
      title: 'Listen',
      icon: Images.voice,
    },
    {
      title: 'Watch',
      icon: Images['note-video'],
    },
    {
      title: 'Read',
      icon: Images.paper,
    },
  ];
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
              <Image
                source={button.icon}
                resizeMode="contain"
                style={styles.headerIcon}
              />
              <Text
                style={[
                  styles.notificationButtonText,
                  activeIndex === index && styles.activeButtonText,
                ]}>
                {button.title}
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

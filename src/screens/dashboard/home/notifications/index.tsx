import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import HeaderText from 'components/base/header-text';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Notifications = ({ navigation: { goBack } }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = [
    'Mood trackers',
    'Therapy',
    'Community',
    'Productivity',
    'Store',
  ];
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Notifications"
        hasSubText="it's a beautiful morning Today..."
      />
      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainerStyle}>
        {buttons.map((button, index) => {
          return (
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setActiveIndex(index)}
                style={[
                  styles.notificationButtonContainer,
                  activeIndex === index && styles.activeButtonContainer,
                ]}
                key={button}>
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
      <View />
    </SafeAreaView>
  );
};

export default Notifications;

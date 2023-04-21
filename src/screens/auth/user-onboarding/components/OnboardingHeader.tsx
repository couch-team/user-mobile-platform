import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

interface OnboardingHeaderProps {
  headerTitle: string;
  totalCount: number;
  currentCount: number;
}

const OnboardingHeader = ({
  headerTitle,
  currentCount,
  totalCount,
}: OnboardingHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      <View style={styles.headerCountContainer}>
        <Text style={styles.headerTitle}>
          {currentCount}/{totalCount}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingHeader;

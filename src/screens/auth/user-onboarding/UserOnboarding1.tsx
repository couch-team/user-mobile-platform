import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';

const UserOnboarding1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={0.35} />
      <OnboardingHeader
        headerTitle="Health Related Info"
        currentCount={1}
        totalCount={3}
      />
      <View style={styles.bodyContainer}>
        <Text style={styles.mainBodyText}>
          Hello Daniella, What could we help you with on Couch?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding1;

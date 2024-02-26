import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'theme/config';

const Onboarding = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PRIMARY }} >
      <View>
        <Text>Onboarding</Text>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

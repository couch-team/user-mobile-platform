import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';

const Explore = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View>
        <Text>Explore</Text>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

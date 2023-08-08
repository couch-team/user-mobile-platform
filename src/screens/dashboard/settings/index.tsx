import { LongButton } from 'components';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const Settings = () => {
  const {
    Auth: { logout },
  } = useDispatch();
  return (
    <SafeAreaView>
      <View>
        <LongButton isNotBottom title="Logout" onPress={() => logout()} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

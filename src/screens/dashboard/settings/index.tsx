import { LongButton } from 'components';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from 'store/actions/logout';

const Settings = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View>
        <LongButton isNotBottom title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

import { LongButton } from 'components';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logout } from 'store/slice/authSlice';

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

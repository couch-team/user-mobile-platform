import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardParamList } from '../utils/types/navigation-types';
import BottomTabBar from './bottom-tab';

const Stack = createStackNavigator<DashboardParamList>();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabBar} name="Dashboard" />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;

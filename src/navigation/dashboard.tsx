import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { DashboardParamList } from '../utils/types/navigation-types';
import BottomTabBar from './bottom-tab';
import Notifications from 'screens/dashboard/home/notifications';
import Therapy from 'screens/dashboard/therapy';
import MoodTracker from 'screens/dashboard/mood-tracker';
import AddMood from 'screens/dashboard/mood-tracker/add-mood';
import AddMood2 from 'screens/dashboard/mood-tracker/add-mood/AddMood2';
import CompleteAddMood from 'screens/dashboard/mood-tracker/add-mood/CompleteAddMood';
import Journal from 'screens/dashboard/journal';
const Stack = createStackNavigator<DashboardParamList>();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashboardHome'}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen component={BottomTabBar} name="DashboardHome" />
      <Stack.Screen component={Notifications} name="Notifications" />
      <Stack.Screen component={Therapy} name="Therapy" />
      <Stack.Screen component={MoodTracker} name="MoodTracker" />
      <Stack.Screen component={AddMood} name="AddMood" />
      <Stack.Screen component={AddMood2} name="AddMood2" />
      <Stack.Screen component={CompleteAddMood} name="CompleteAddMood" />
      <Stack.Screen component={Journal} name="Journal" />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;

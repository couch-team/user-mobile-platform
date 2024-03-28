import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardParamList } from '../utils/types/navigation-types';
import BottomTabBar from './bottom-tab';
import Notifications from 'screens/dashboard/home/notifications';
import Therapy from 'screens/dashboard/therapy';
import MoodTracker from 'screens/dashboard/mood-tracker';
import AddMood from 'screens/dashboard/mood-tracker/add-mood';
import AddMood2 from 'screens/dashboard/mood-tracker/add-mood/AddMood2';
import CompleteAddMood from 'screens/dashboard/mood-tracker/add-mood/CompleteAddMood';
import Journal from 'screens/dashboard/journal';
import AddJournal from 'screens/dashboard/journal/add-journal';
import MindSpace from 'screens/dashboard/mindspace';
import RecentlyPlayedAudio from 'screens/dashboard/mindspace/RecentlyPlayedAudio';
import RecentlyPlayedVideo from 'screens/dashboard/mindspace/RecentlyPlayedVideo';
import RecentlyPlayedText from 'screens/dashboard/mindspace/RecentlyPlayedText';
import Cbt from 'screens/dashboard/cbt';
import SingleCbt from 'screens/dashboard/cbt/SingleCbt';
import PreviewJournal from 'screens/dashboard/journal/preview-journal';
import EditJournal from 'screens/dashboard/journal/edit-journal';
import TakeTour from 'screens/dashboard/home/modals/TakeTour';
import UserOnboarding from 'screens/auth/user-onboarding';
import UserOnboarding1 from 'screens/auth/user-onboarding/UserOnboarding1';
import UserOnboarding2 from 'screens/auth/user-onboarding/UserOnboarding2';
import UserOnboarding3 from 'screens/auth/user-onboarding/UserOnboarding3';
import UserOnboarding4 from 'screens/auth/user-onboarding/UserOnboarding4';
import CompleteOnboarding1 from 'screens/auth/user-onboarding/CompleteOnboarding1';
import Planner from 'screens/dashboard/planner';
import EditProfile from 'screens/dashboard/profile/menus/EditProfile';
import Account from 'screens/dashboard/profile/menus/Account';
import More from 'screens/dashboard/profile/menus/More';
import NotificationPref from 'screens/dashboard/profile/menus/NotificationPref';
import Subscription from 'screens/dashboard/profile/menus/Subscription';

const Stack = createNativeStackNavigator<DashboardParamList>();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashboardHome'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={BottomTabBar} name="DashboardHome" />
      <Stack.Screen component={Notifications} name="Notifications" />
      <Stack.Screen component={Therapy} name="Therapy" />
      <Stack.Screen component={MoodTracker} name="MoodTracker" />
      <Stack.Screen component={AddMood} name="AddMood" />
      <Stack.Screen component={AddMood2} name="AddMood2" />
      <Stack.Screen component={CompleteAddMood} name="CompleteAddMood" />
      <Stack.Screen component={TakeTour} name="TakeTour" />
      <Stack.Screen component={Journal} name="Journal" />
      <Stack.Screen component={AddJournal} name="AddJournal" />
      <Stack.Screen component={PreviewJournal} name="PreviewJournal" />
      <Stack.Screen component={EditJournal} name="EditJournal" />
      <Stack.Screen component={MindSpace} name="MindSpace" />
      <Stack.Screen component={Planner} name="Planner" />
      <Stack.Screen
        component={RecentlyPlayedAudio}
        name="RecentlyPlayedAudio"
      />
      <Stack.Screen
        component={RecentlyPlayedVideo}
        name="RecentlyPlayedVideo"
      />
      <Stack.Screen component={RecentlyPlayedText} name="RecentlyPlayedText" />
      <Stack.Screen component={Cbt} name="Cbt" />
      <Stack.Screen component={SingleCbt} name="SingleCbt" />
      <Stack.Screen component={UserOnboarding} name="UserOnboarding" />
      <Stack.Screen component={UserOnboarding1} name="UserOnboarding1" />
      <Stack.Screen component={UserOnboarding2} name="UserOnboarding2" />
      <Stack.Screen component={UserOnboarding3} name="UserOnboarding3" />
      <Stack.Screen component={UserOnboarding4} name="UserOnboarding4" />
      <Stack.Screen
        component={CompleteOnboarding1}
        name="CompleteOnboarding1"
      />
      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Screen component={Account} name="Account" />
      <Stack.Screen component={More} name="More" />
      <Stack.Screen
        component={NotificationPref}
        name="NotificationPreference"
      />
      <Stack.Screen component={Subscription} name="Subscription" />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;

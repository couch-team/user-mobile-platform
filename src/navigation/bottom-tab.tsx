import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ACTIVITY, EXPLORE, HOME, PROFILE, SETTINGS } from 'assets/svg';
import { hp, wp } from 'constants/layout';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Activities from 'screens/dashboard/activities';
import Explore from 'screens/dashboard/explore';
import Home from 'screens/dashboard/home';
import Planner from 'screens/dashboard/planner';
import Profile from 'screens/dashboard/profile';
import Settings from 'screens/dashboard/settings';
import { Colors, Images, Typography } from 'theme/config';
import { BottomTabParamList } from 'utils/types/navigation-types';

interface TabBarIconProps {
  icon: JSX.Element;
  focused: boolean;
  label: string;
}

const DashboardBottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar = () => {
  function TabBarIcon({ icon, label, focused }: TabBarIconProps) {
    return (
      <View style={[styles.tabBarContainer, focused && { borderTopColor: Colors.COUCH_BLUE, }]}>
        {icon}
        <Text style={[styles.titleStyle, focused && { color: Colors.WHITE }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <DashboardBottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          height: 100,
          backgroundColor: '#0F152C',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.PRIMARY_DARKBLUE,
        tabBarLabelStyle: {
          fontSize: hp(12),
          fontFamily: Typography.fontFamily.SoraRegular,
        },
        tabBarShowLabel: false,
      }}>
      <DashboardBottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<HOME color={focused ? Colors.COUCH_BLUE : undefined}/>}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<EXPLORE color={focused ? Colors.COUCH_BLUE : undefined}/>}
              label="Explore"
              focused={focused}
            />
          ),
        }}
      />

      <DashboardBottomTabs.Screen
        name="Activities"
        component={Planner}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<ACTIVITY color={focused ? Colors.COUCH_BLUE : undefined}/>}
              label="Activities"
              focused={focused}
            />
          ),
        }}
      />

      <DashboardBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<PROFILE color={focused ? Colors.COUCH_BLUE : undefined}/>}
              label="My Profile"
              focused={focused}
            />
          ),
        }}
      />

      <DashboardBottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<SETTINGS color={focused ? Colors.COUCH_BLUE : undefined}/>}
              label="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </DashboardBottomTabs.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleStyle: {
    marginTop: 9,
    fontSize: 10,
    lineHeight: 12.6,
    color: Colors.COUCH_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraSemiBold,
    letterSpacing: -0.48,
  },
  tabBarContainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingTop: 14,
    borderTopWidth: 6,
    borderTopColor: '#0F152C'
  },
});

export default BottomTabBar;

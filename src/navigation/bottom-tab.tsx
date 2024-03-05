import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Profile from 'screens/dashboard/profile';
import Settings from 'screens/dashboard/settings';
import { Colors, Images, Typography } from 'theme/config';
import { BottomTabParamList } from 'utils/types/navigation-types';

interface TabBarIconProps {
  image: ImageSourcePropType;
  focused: boolean;
  label: string;
}

const DashboardBottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar = () => {
  function TabBarIcon({ image, label, focused }: TabBarIconProps) {
    return (
      <View style={styles.tabBarContainer}>
        <Image
          source={image}
          resizeMode="contain"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 28,
            width: 28,
          }}
        />
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
          height: hp(60),
          backgroundColor: Colors.PRIMARY_DARKBLUE,
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
              image={focused ? Images['home-active'] : Images.home}
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
              image={focused ? Images['category-active'] : Images.category}
              label="Explore"
              focused={focused}
            />
          ),
        }}
      />

      <DashboardBottomTabs.Screen
        name="Activities"
        component={Activities}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              image={Images.activity}
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
              image={Images.profile}
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
              image={Images.settings}
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
  payContainer: {
    width: 48,
    height: 48,
    borderWidth: 4,
    backgroundColor: Colors.BLACK,
    borderColor: '#EAEBEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  icon: {
    height: hp(25),
    width: wp(25),
  },
  titleStyle: {
    paddingTop: 9,
    fontSize: 10,
    color: Colors.COUCH_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraSemiBold,
    letterSpacing: -0.48,
  },
  tabBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp(5),
  },
});

export default BottomTabBar;

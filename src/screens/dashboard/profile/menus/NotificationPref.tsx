/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import { Colors, Images, Typography } from 'theme/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { hp, wp } from 'constants/layout';
import PreferenceItem from '../components/PreferenceItem';
import { PreferencesData } from 'constants/data';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'NotificationPreference'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const NotificationPref = ({ navigation }: Props) => {
  const PreferenceGroup = ({ group }: any) => {
    return (
      <View
        style={{
          marginVertical: 10,
          backgroundColor: '#FFFFFF0A',
          padding: 20,
          borderRadius: 16,
          borderColor: '#E3E4F81F',
          borderWidth: 1,
        }}>
        <View style={{ gap: 2, marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 14,
              color: '#E3E4F8',
              fontFamily: Typography.fontFamily.SoraMedium,
              // marginBottom: 10,
            }}>
            {group.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#9F98B2',
              fontFamily: Typography.fontFamily.SoraRegular,
              // marginBottom: 10,
            }}>
            Notify me on:
          </Text>
        </View>
        {group.preferences.map((preference: any) => (
          <PreferenceItem key={preference.id} preference={preference} />
        ))}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight,
      }}>
      <Pressable
        style={styles.headerLeftIconContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={Images['arrow-left-circle']}
          resizeMode="contain"
          style={[styles.backIcon]}
        />
      </Pressable>

      <View style={{ marginVertical: 20, gap: 8 }}>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 20,
            fontFamily: Typography.fontFamily.SoraBold,
          }}>
          Notification Preference
        </Text>
        <Text
          style={{
            color: 'rgba(159, 152, 178, 1)',
            fontSize: 14,
            fontFamily: Typography.fontFamily.SoraRegular,
          }}>
          Join Individuals of like minds and share.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {PreferencesData.map(group => (
          <PreferenceGroup key={group.name} group={group} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationPref;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  headerLeftIconContainer: {
    width: 30,
    padding: 20,
    height: 36,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

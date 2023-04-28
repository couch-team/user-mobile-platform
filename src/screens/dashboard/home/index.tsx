import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { moodTracker } from 'constants/data';
import LongButton from 'components/base/long-button';
import XButton from 'components/base/x-button';
import { navigation } from 'navigation/utils';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'DashboardHome'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Home = ({ navigation: { navigate } }: Props) => {
  const NotificationIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => navigate('Notifications')}
        activeOpacity={0.5}
        style={styles.notificationIconContainer}>
        <Image
          source={Images.notification}
          resizeMode="contain"
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar headerRight={<NotificationIcon />} />
      <View style={styles.bodyContainer}>
        <View style={styles.profileUserContainer}>
          <Text style={styles.profileUserText}>Hi Daniella</Text>
          <Text style={styles.profileSubText}>
            It's a beautiful morning today...
          </Text>
        </View>
        <View style={styles.moodTrackerBodyContainer}>
          <Text style={styles.moodTrackerHeaderText}>
            How do you feel today?...
          </Text>
          <View style={styles.moodTrackerContainer}>
            {moodTracker.map(tracker => {
              return (
                <TouchableOpacity
                  key={tracker.id}
                  style={[
                    styles.singleMoodTrackerContainer,
                    { backgroundColor: tracker.bgColor },
                  ]}>
                  <Image
                    source={tracker.icon}
                    resizeMode="contain"
                    style={styles.notificationIcon}
                  />
                  <Text
                    style={[styles.trackerText, { color: tracker.textColor }]}>
                    {tracker.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.tourInfoContainer}>
          <XButton />
          <View style={styles.tourBodyContainer}>
            <Image
              source={Images['profile-image']}
              resizeMode="contain"
              style={styles.profileImage}
            />
            <View style={styles.tourBodyInfoContainer}>
              <Text style={styles.tourBodyMainText}>Hi There!,</Text>
              <Text style={styles.tourBodySubText}>
                We've got some exciting features to help your mental wellbeing
              </Text>
              <LongButton
                isNotBottom
                onPress={() => navigation.navigate('TakeTour')}
                buttonStyle={styles.buttonStyle}
                title="Take a Short Tour"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

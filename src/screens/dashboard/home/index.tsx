import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import { moodTracker, podcasts4u } from 'constants/data';
import LongButton from 'components/base/long-button';
import XButton from 'components/base/x-button';
import { navigation } from 'navigation/utils';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';
import PodcastItem from './components/PodcastItem';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'DashboardHome'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Home = ({ navigation: { navigate } }: Props) => {
  const [hideTour, setHideTour] = useState(true);

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
                      style={[
                        styles.trackerText,
                        { color: tracker.textColor },
                      ]}>
                      {tracker.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {hideTour && (
            <View style={styles.tourInfoContainer}>
              <XButton onXButtonPress={() => setHideTour(!hideTour)} />
              <View style={styles.tourBodyContainer}>
                <Image
                  source={Images['profile-image']}
                  resizeMode="contain"
                  style={styles.profileImage}
                />
                <View style={styles.tourBodyInfoContainer}>
                  <Text style={styles.tourBodyMainText}>Hi There!,</Text>
                  <Text style={styles.tourBodySubText}>
                    We've got some exciting features to help your mental
                    wellbeing
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
          )}
        </View>
        <View style={styles.recommendedSectionContainer}>
          <Text style={styles.recommendedSectionHeaderText}>
            Recommended Video for you
          </Text>
          <Image
            source={Images.videos}
            resizeMode="contain"
            style={styles.videoImage}
          />
        </View>
        <View style={[styles.podcastSectionContainer]}>
          <Text style={styles.podcastSectionHeaderText}>
            Recommended Podcasts for you
          </Text>
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            decelerationRate={'fast'}
            contentContainerStyle={styles.podcastContentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {podcasts4u?.map(podcast => {
              return <PodcastItem key={podcast.id} item={podcast} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

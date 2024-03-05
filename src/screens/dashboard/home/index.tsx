import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import { heavyOptions, moodTracker, podcasts4u } from 'constants/data';
import { LongButton, HeaderBar, XButton } from 'components';
// import { navigation } from 'navigation/utils';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import PodcastItem from './components/PodcastItem';
import { wp } from 'constants/layout';
import NotificationIcon from './components/NotificationIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchUserDetails } from 'store/slice/userSlice';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'DashboardHome'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Home = ({ navigation: { navigate } }: Props) => {
  const [hideTour, setHideTour] = useState(true);
  const dispatch = useAppDispatch();

  const profileDetails = useSelector((state: RootState) => state.User);

  useEffect(() => {
    !profileDetails && dispatch(fetchUserDetails())
  },[ profileDetails ])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar headerRight={<NotificationIcon navigate={navigate} />} />
        <View style={styles.bodyContainer}>
          <View style={styles.profileUserContainer}>
            <Text style={styles.profileUserText}>
              Hi {profileDetails?.first_name}
            </Text>
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
                  <Pressable
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
                  </Pressable>
                );
              })}
            </View>
          </View>
          {hideTour && (
            <View style={styles.tourInfoContainer}>
              <XButton onXButtonPress={() => setHideTour(!hideTour)} />
              <View style={styles.tourBodyContainer}>
                <View style={styles.profileImageContainer}>
                  {profileDetails?.profile?.avatar_url ? (
                    <Image
                      source={{ uri: profileDetails?.profile?.avatar_url }}
                      resizeMode="cover"
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image
                      source={Images['profile-image']}
                      resizeMode="cover"
                      style={styles.profileImage}
                    />
                  )}
                </View>

                <View style={styles.tourBodyInfoContainer}>
                  <Text style={styles.tourBodyMainText}>Hi There!,</Text>
                  <Text style={styles.tourBodySubText}>
                    We've got some exciting features to help your mental
                    wellbeing
                  </Text>
                  <LongButton
                    isNotBottom
                    onPress={() => navigate('TakeTour')}
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
            decelerationRate={'fast'}
            contentContainerStyle={styles.podcastContentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {podcasts4u?.map(podcast => {
              return <PodcastItem key={podcast.id} item={podcast} />;
            })}
          </ScrollView>
        </View>
        <View style={styles.podcastSectionContainer}>
          <Text style={styles.podcastSectionHeaderText}>
            Feeling a bit heavy?
          </Text>
          <View style={styles.optionsListContainer}>
            {heavyOptions.map(options => {
              return (
                <Pressable
                  key={options.id}
                  style={styles.optionsItemContainer}
                  onPress={() => navigate('Journal')}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={options.icon}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                  </View>
                  <View>
                    <Text
                      style={[styles.optionMainText, { color: options.color }]}>
                      {options.title}
                    </Text>
                    <Text style={styles.optionSubText}>
                      {options.description}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.podcastSectionContainer}>
          <Text style={styles.podcastSectionHeaderText}>
            A little exercise for the brain
          </Text>
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            snapToInterval={wp(355)}
            contentContainerStyle={styles.podcastContentContainer}
            showsHorizontalScrollIndicator={false}>
            {Array.from(Array(3).keys()).map((key, index) => {
              return (
                <Image
                  key={index}
                  source={Images.cbt}
                  resizeMode="stretch"
                  style={[styles.videoImage, styles.imageSpacing]}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.podcastSectionContainer}>
          <Text style={styles.podcastSectionHeaderText}>
            Recommended Communities to Join
          </Text>
          <View style={styles.optionsListContainer}>
            {Array.from(Array(5).keys()).map((key, index) => {
              return (
                <View key={index} style={styles.communityBodyContainer}>
                  <Image
                    source={Images.ptsd}
                    resizeMode="contain"
                    style={styles.communityIcon}
                  />
                  <View>
                    <Text style={styles.communityMainText}>
                      Anxieties and PTSDS
                    </Text>
                    <Text numberOfLines={1} style={styles.communitySubText}>
                      Anxiety shouldn’t be a thing. This is your safe...
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

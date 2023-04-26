import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { moodTracker } from 'constants/data';
import LongButton from 'components/base/long-button';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.notificationIconContainer}>
            <Image
              source={Images.notification}
              resizeMode="contain"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity style={styles.xIconContainer} activeOpacity={0.5}>
            <Image
              source={Images.x}
              resizeMode="contain"
              style={styles.xIcon}
            />
          </TouchableOpacity>
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

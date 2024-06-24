import { wp } from 'constants/layout';
import { isIos } from 'constants/platform';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors, Images } from 'theme/config';
import { styles } from './style';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { convertDuration } from 'utils';
import { DashboardParamList } from 'utils/types/navigation-types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface RecentlyWatchedVideoProps {
  watched: any;
}

export const RecentlyWatchedVideo = ({ tags, color, title, duration, background_url, content_url, id, current_duration } : { tags: string[], color: string, title: string, duration: string, background_url: string, content_url: string, id: string, current_duration: string }) => {
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();

  const durationArray = duration?.split(":")
  const durationMilliseconds = durationArray?.length > 2 ? ( (Number(durationArray[0]) * 60 * 60) + (Number(durationArray[1]) * 60) + Number(durationArray[2])) * 1000 : ((Number(durationArray[0]) * 60) + Number(durationArray[1])) * 1000

  const currentDurationArray = current_duration?.split(":")
  const currentDurationMilliseconds = currentDurationArray?.length > 2 ? ( (Number(currentDurationArray[0]) * 60 * 60) + (Number(currentDurationArray[1]) * 60) + Number(currentDurationArray[2])) * 1000 : ((Number(currentDurationArray[0]) * 60) + Number(currentDurationArray[1])) * 1000

  return (
    <TouchableOpacity 
      style={styles.recentlyWatchedItemContainer}
      onPress={() => navigation.navigate('CbtVideo', { header: title, backgroundImageUri: background_url, video_uri: content_url, id: id, is_complete: true, duration: current_duration  }) }
    >
      <Image
        source={{ uri: background_url}}
        resizeMode="cover"
        style={styles.recentlyWatchedImage}
      />
      <LinearGradient
        colors={['rgba(38, 28, 64, 0.2)', '#261C40']}
        style={styles.recentlyWatchItemContainer}>
        <View style={styles.recentlyWatchedHashTagContainer}>
          {tags?.length > 0 && tags?.map((option: string, index: number) => {
            return (
              <View style={[styles.hasTagContainer]} key={index}>
                  <Text style={styles.hasTagText}>{option}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.recentlyPlayedTitleContainer}>
          <View style={styles.playIconContainer}>
            <Image
              source={Images.play}
              resizeMode="contain"
              style={styles.playIcon}
            />
          </View>
          <View style={styles.recentlyPlayedTextContainer}>
            <Text style={styles.recentlyHeaderTextStyle}>{title}</Text>
            <Text style={styles.recentlyPlayedSubHeaderTextStyle}>
            {convertDuration(duration)} — Playtime
            </Text>
          </View>
        </View>
        <View style={styles.hasMarginTop}>
          {/* <View
            style={[styles.podcastItemIconBody, styles.sideBorderContainer]}>
            <Image
              source={Images.play}
              resizeMode="contain"
              style={[styles.podcastItemIcon, { tintColor: Colors.WHITE }]}
            />
            <Text style={styles.podcastText}>1.5M</Text>
          </View>
          <View style={styles.podcastItemIconBody}>
            <Image
              source={Images.upload}
              resizeMode="contain"
              style={[styles.podcastItemIcon, { tintColor: Colors.WHITE }]}
            />
            <Text style={styles.podcastText}>400.56K</Text>
          </View> */}
        </View>
        <Progress.Bar
          style={styles.progressBarContainer}
          width={wp(290)}
          progress={currentDurationMilliseconds/durationMilliseconds}
          unfilledColor={Colors.COUCH_BLUE_200}
          borderWidth={0}
          color={Colors.COUCH_BLUE}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

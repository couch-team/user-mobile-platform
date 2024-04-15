/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { wp } from 'constants/layout';
import * as Progress from 'react-native-progress';
import { duration } from 'moment';
import { convertDuration } from 'utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';

export const RecentlyPlayed = ({ tags, color, title, duration, background_url, content_url, id, current_duration } : { tags: string[], color: string, title: string, duration: string, background_url: string, content_url: string, id: string, current_duration: string }) => {
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();

  const durationArray = duration?.split(":")
  const durationMilliseconds = durationArray?.length > 2 ? ( (Number(durationArray[0]) * 60 * 60) + (Number(durationArray[1]) * 60) + Number(durationArray[2])) * 1000 : ((Number(durationArray[0]) * 60) + Number(durationArray[1])) * 1000

  const currentDurationArray = current_duration?.split(":")
  const currentDurationMilliseconds = currentDurationArray?.length > 2 ? ( (Number(currentDurationArray[0]) * 60 * 60) + (Number(currentDurationArray[1]) * 60) + Number(currentDurationArray[2])) * 1000 : ((Number(currentDurationArray[0]) * 60) + Number(currentDurationArray[1])) * 1000

  return (
    <TouchableOpacity 
      style={styles.recentlyPlayedItemContainer}
      onPress={() => navigation.navigate('CbtAudio', { header: title, backgroundImageUri: background_url, audio_uri: content_url, id: id, is_complete: true, duration: current_duration })}
    >
      <View style={styles.recentlyWatchedHashTagContainer}>
        {tags?.map((option: string) => {
          return (
            <View key={option} style={[styles.hasTagContainer]}>
              <View style={[styles.topVideoTagContainer, { marginTop: 0 }]}>
                <Text style={[styles.hasTagText, { color: color }]}>
                  #{option}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={[styles.recentlyPlayedTitleContainer]}>
        <View
          style={[
            styles.voiceNoteIconContainer,
            { backgroundColor: Colors.COUCH_BLUE_2700 },
          ]}>
          <Image
            source={Images['voice-note']}
            resizeMode="contain"
            style={[styles.voiceNoteIcon, { tintColor: color }]}
          />
        </View>
        <View style={[styles.recentlyPlayedTextContainer, { marginLeft: 12 }]}>
          <Text style={styles.recentlyHeaderTextStyle}>{title}</Text>
          <Text
            style={[styles.recentlyPlayedSubHeaderTextStyle, { fontSize: 12 }]}>
            {convertDuration(duration)} — Playtime
          </Text>
        </View>
      </View>
      {/* <View style={styles.hasMarginTop}>
        <View style={[styles.podcastItemIconBody, styles.sideBorderContainer]}>
          <Image
            source={Images.play}
            resizeMode="contain"
            style={[styles.podcastItemIcon, { tintColor: color }]}
          />
          <Text style={styles.podcastText}>1.5M</Text>
        </View>
        <View style={styles.podcastItemIconBody}>
          <Image
            source={Images.upload}
            resizeMode="contain"
            style={[styles.podcastItemIcon, { tintColor: color }]}
          />
          <Text style={styles.podcastText}>400.56K</Text>
        </View>
      </View> */}
      <Progress.Bar
        style={styles.progressBarContainer}
        width={wp(290)}
        progress={currentDurationMilliseconds/durationMilliseconds}
        unfilledColor={Colors.COUCH_BLUE_200}
        borderWidth={0}
        color={color}
      />
    </TouchableOpacity>
  );
};

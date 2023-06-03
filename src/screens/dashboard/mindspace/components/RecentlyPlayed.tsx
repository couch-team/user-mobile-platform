/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { wp } from 'constants/layout';
import * as Progress from 'react-native-progress';

interface RecentlyPlayedProps {
  played: any;
}

export const RecentlyPlayed = ({ played }: RecentlyPlayedProps) => {
  return (
    <View style={styles.recentlyPlayedItemContainer}>
      <View style={styles.recentlyWatchedHashTagContainer}>
        {played.options?.map((option: string) => {
          return (
            <View key={option} style={[styles.hasTagContainer]}>
              <View style={[styles.topVideoTagContainer, { marginTop: 0 }]}>
                <Text style={[styles.hasTagText, { color: played.tintColor }]}>
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
            style={[styles.voiceNoteIcon, { tintColor: played.tintColor }]}
          />
        </View>
        <View style={[styles.recentlyPlayedTextContainer, { marginLeft: 12 }]}>
          <Text style={styles.recentlyHeaderTextStyle}>{played.title}</Text>
          <Text
            style={[styles.recentlyPlayedSubHeaderTextStyle, { fontSize: 12 }]}>
            12:48 — Playtime
          </Text>
        </View>
      </View>
      <View style={styles.hasMarginTop}>
        <View style={[styles.podcastItemIconBody, styles.sideBorderContainer]}>
          <Image
            source={Images.play}
            resizeMode="contain"
            style={[styles.podcastItemIcon, { tintColor: played?.tintColor }]}
          />
          <Text style={styles.podcastText}>1.5M</Text>
        </View>
        <View style={styles.podcastItemIconBody}>
          <Image
            source={Images.upload}
            resizeMode="contain"
            style={[styles.podcastItemIcon, { tintColor: played?.tintColor }]}
          />
          <Text style={styles.podcastText}>400.56K</Text>
        </View>
      </View>
      <Progress.Bar
        style={styles.progressBarContainer}
        width={wp(290)}
        progress={0.3}
        unfilledColor={Colors.OFF_BLACK_100}
        borderWidth={0}
        color={played?.tintColor}
      />
    </View>
  );
};

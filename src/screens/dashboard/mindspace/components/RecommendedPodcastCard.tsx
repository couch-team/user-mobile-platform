import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { recommendedOptions } from 'constants/data';
import { Colors, Images } from 'theme/config';
import HeaderText from 'components/base/header-text';

export const RecommendedPodcastCard = () => {
  return (
    <View style={styles.recommendedSectionItemContainer}>
      <View style={styles.recommendedSectionHeaderContainer}>
        {recommendedOptions.map(option => {
          return (
            <View style={styles.recommendedOptionContainer} key={option.id}>
              <Text style={styles.recommendedOptionText}>{option.title}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.podcastTitleContainer}>
        <HeaderText
          headerTextStyle={styles.headerTextStyle}
          text="Productivity 101"
          textStyle={styles.textStyle}
          hasSubText="12:48 — Playtime"
        />
      </View>

      <View style={styles.podcastItemIconContainer}>
        <View style={styles.podcastRateContainer}>
          <View
            style={[styles.podcastItemIconBody, styles.sideBorderContainer]}>
            <Image
              source={Images.play}
              resizeMode="contain"
              style={[
                styles.podcastItemIcon,
                { tintColor: Colors.COUCH_CREAME },
              ]}
            />
            <Text style={styles.podcastText}>1.5M</Text>
          </View>
          <View style={styles.podcastItemIconBody}>
            <Image
              source={Images.upload}
              resizeMode="contain"
              style={[
                styles.podcastItemIcon,
                { tintColor: Colors.COUCH_BLUE_900 },
              ]}
            />
            <Text style={styles.podcastText}>400.56K</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.voiceNoteIconContainer}>
          <Image
            source={Images['voice-note']}
            resizeMode="contain"
            style={styles.voiceNoteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

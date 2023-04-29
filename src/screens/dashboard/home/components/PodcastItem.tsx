import { hp, wp } from 'constants/layout';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';

interface PodcastItemProps {
  item: PodcastItemData;
}

interface PodcastItemData {
  time: string;
  iconColor: string;
  title: string;
  shared: string;
  played: string;
  hashTags: any[];
}

const PodcastItem = ({ item }: PodcastItemProps) => {
  return (
    <TouchableOpacity style={styles.podcastItemContainer}>
      <View style={styles.podcastHeaderContainer}>
        <View style={styles.voiceIconContainer}>
          <Image
            source={Images['voice-note']}
            resizeMode="contain"
            style={[styles.voiceIcon, { tintColor: item.iconColor }]}
          />
        </View>
        <View style={styles.timeItemContainer}>
          <Text style={[styles.timeText, { color: item.iconColor }]}>
            {item.time}
          </Text>
        </View>
      </View>
      <View style={styles.podcastBodyContainer}>
        <Text style={styles.podcastMainText}>{item.title}</Text>
        <View style={styles.podcastItemIconContainer}>
          <View style={styles.podcastItemIconBody}>
            <Image
              source={Images.play}
              resizeMode="contain"
              style={[styles.podcastItemIcon, { tintColor: item.iconColor }]}
            />
            <Text style={styles.podcastText}>{item.played}</Text>
          </View>
          <View style={styles.podcastItemIconBody}>
            <Image
              source={Images.upload}
              resizeMode="contain"
              style={[styles.podcastItemIcon, { tintColor: item.iconColor }]}
            />
            <Text style={styles.podcastText}>{item.shared}</Text>
          </View>
        </View>
      </View>
      <View style={styles.podcastHashTagContainer}>
        {item.hashTags.map((hashTag, index) => {
          return (
            <View style={styles.hashtagItemContainer} key={index}>
              <Text style={[styles.hashtagText, { color: item.iconColor }]}>
                {hashTag}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  podcastItemContainer: {
    width: wp(235),
    height: hp(280),
    backgroundColor: Colors.COUCH_BLUE_1400,
    marginRight: wp(20),
    marginTop: hp(18),
    borderRadius: hp(16),
    paddingVertical: hp(20),
    paddingHorizontal: wp(12),
  },
  podcastHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voiceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_1500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIcon: {
    width: wp(30),
    height: hp(30),
  },
  timeItemContainer: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(8),
    alignSelf: 'flex-start',
    backgroundColor: Colors.COUCH_BLUE_1600,
    borderRadius: hp(64),
  },
  timeText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(12),
    lineHeight: hp(17),
  },
  podcastBodyContainer: {
    marginTop: hp(28),
  },
  podcastMainText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(16),
    letterSpacing: hp(0.6),
    color: Colors.COUCH_BLUE_1100,
    lineHeight: hp(23),
  },
  podcastItemIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(24),
    width: wp(150),
  },
  podcastItemIconBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  podcastItemIcon: {
    width: wp(20),
    height: hp(20),
  },
  podcastText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    paddingLeft: wp(7),
    top: hp(2),
    fontSize: hp(12),
    color: Colors.COUCH_BLUE_1100,
  },
  podcastHashTagContainer: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagItemContainer: {
    padding: hp(8),
    backgroundColor: Colors.COUCH_BLUE_1600,
    marginRight: wp(10),
    borderRadius: hp(64),
  },
  hashtagText: {
    fontFamily: Typography.fontFamily.SoraBold,
    fontSize: hp(12),
    lineHeight: hp(17),
  },
});

export default PodcastItem;

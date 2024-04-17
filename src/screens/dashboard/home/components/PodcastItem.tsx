import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { hp, wp } from 'constants/layout';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { convertDuration } from 'utils';
import { DashboardParamList } from 'utils/types/navigation-types';

interface PodcastItemProps {
  item: PodcastItemData;
}

interface PodcastItemData {
  duration: string;
  iconColor: string;
  title: string;
  tags: any[];
  background_url: string;
  content_url: string;
  play_history: any;
  id: string
}


type ScreenProps = StackScreenProps<DashboardParamList, 'MindSpace'>;

const PodcastItem = ({ item }: PodcastItemProps) => {
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.podcastItemContainer} onPress={() => navigation.navigate('CbtAudio', { header: item.title, backgroundImageUri: item.background_url, audio_uri: item.content_url, id: item?.id, is_complete: true, duration: item?.play_history?.current_duration || '00:00' }) }>
      <View>
        <View style={styles.podcastHeaderContainer}>
          <View style={styles.voiceIconContainer}>
            <Image
              source={Images['voice-note']}
              resizeMode="contain"
              style={[styles.voiceIcon, { tintColor: Colors.LIGHT_PEACHY_RED_200 }]}
            />
          </View>
          <View style={styles.timeItemContainer}>
            <Text style={[styles.timeText, { color: Colors.LIGHT_PEACHY_RED_200 }]}>
              {convertDuration(item.duration)}
            </Text>
          </View>
        </View>
        <View style={styles.podcastBodyContainer}>
          <Text style={styles.podcastMainText}>{item.title}</Text>
          {/* <View style={styles.podcastItemIconContainer}>
            <View style={styles.podcastItemIconBody}>
              <Image
                source={Images.play}
                resizeMode="contain"
                style={[styles.podcastItemIcon, { tintColor: item.iconColor }]}
              />
              <Text style={styles.podcastText}>1.2m</Text>
            </View>
            <View style={styles.podcastItemIconBody}>
              <Image
                source={Images.upload}
                resizeMode="contain"
                style={[styles.podcastItemIcon, { tintColor: item.iconColor }]}
              />
              <Text style={styles.podcastText}>1.6m</Text>
            </View>
          </View> */}
        </View>
      </View>
      <View style={styles.podcastHashTagContainer}>
        {item.tags?.length > 0 && item?.tags?.map((hashTag, index) => {
          return (
            <View style={styles.hashtagItemContainer} key={index}>
              <Text style={[styles.hashtagText, { color: Colors.LIGHT_PEACHY_RED_200 }]}>
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
    justifyContent: 'space-between'
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
    fontWeight: "700",
    fontSize: hp(12),
    lineHeight: hp(17),
  },
});

export default PodcastItem;

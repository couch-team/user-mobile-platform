import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Images } from 'theme/config';
import { styles } from './style';

interface VideoItemProps {
  video: any;
}

export const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <View
      style={[
        styles.recentlyWatchedItemContainer,
        styles.topVideoItemContainer,
      ]}>
      <Image
        source={Images['top-video']}
        resizeMode="cover"
        style={styles.topVideoStyle}
      />
      <LinearGradient
        colors={['rgba(38, 28, 64, 0.2)', '#261C40']}
        style={styles.topVideoStyleGradient}>
        <View style={styles.topVideoHeaderContainer}>
          <View style={styles.playIconContainer}>
            <Image
              source={Images.play}
              resizeMode="contain"
              style={styles.playIcon}
            />
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>3:45</Text>
          </View>
        </View>
        <Text style={styles.topVideoTitleText}>{video.title}</Text>
        <View style={styles.hasMarginTop}>
          <View
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
          </View>
        </View>
        <View style={styles.recentlyWatchedHashTagContainer}>
          {video.options?.map((option: string) => {
            return (
              <View key={option} style={[styles.hasTagContainer]}>
                <View style={styles.topVideoTagContainer}>
                  <Text style={styles.hasTagText}>{option}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

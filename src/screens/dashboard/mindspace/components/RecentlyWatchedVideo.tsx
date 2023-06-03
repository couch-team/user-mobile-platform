import { wp } from 'constants/layout';
import { isIos } from 'constants/platform';
import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import { Colors, Images } from 'theme/config';
import { styles } from './style';
import { BlurView } from '@react-native-community/blur';

interface RecentlyWatchedVideoProps {
  watched: any;
}

export const RecentlyWatchedVideo = ({
  watched,
}: RecentlyWatchedVideoProps) => {
  return (
    <View style={styles.recentlyWatchedItemContainer}>
      <Image
        source={watched.bg}
        resizeMode="cover"
        style={styles.recentlyWatchedImage}
      />
      <LinearGradient
        colors={['rgba(38, 28, 64, 0.2)', '#261C40']}
        style={styles.recentlyWatchItemContainer}>
        <View style={styles.recentlyWatchedHashTagContainer}>
          {watched.options?.map((option: string) => {
            return (
              <View style={[styles.hasTagContainer]}>
                {isIos ? (
                  <BlurView blurType="light" style={styles.hasTagBlurContainer}>
                    <Text style={styles.hasTagText}>{option}</Text>
                  </BlurView>
                ) : (
                  <View
                    style={[styles.hasTagBlurContainer, styles.blurContainer]}>
                    <Text style={styles.hasTagText}>{option}</Text>
                  </View>
                )}
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
            <Text style={styles.recentlyHeaderTextStyle}>{watched.title}</Text>
            <Text style={styles.recentlyPlayedSubHeaderTextStyle}>
              {watched.description}
            </Text>
          </View>
        </View>
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
        <Progress.Bar
          style={styles.progressBarContainer}
          width={wp(290)}
          progress={0.3}
          unfilledColor={Colors.OFF_BLACK_100}
          borderWidth={0}
          color={Colors.COUCH_BLUE}
        />
      </LinearGradient>
    </View>
  );
};

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Images } from 'theme/config';
import { styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { convertDuration } from 'utils';
import { DashboardParamList } from 'utils/types/navigation-types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const VideoItem = ({ item } : { item: any }) => {
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();

  return (
    <TouchableOpacity
      style={[
        styles.recentlyWatchedItemContainer,
        styles.topVideoItemContainer,
      ]}
      onPress={() => navigation.navigate('CbtVideo', { header: item?.title, backgroundImageUri: item?.background_url, video_uri: item?.content_url, id: item?.id, is_complete: true, duration: item?.current_duration || '00:00'  }) }
    >
      <Image
        source={{ uri: item?.background_url }}
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
            <Text style={styles.durationText}>{convertDuration(item?.duration)}</Text>
          </View>
        </View>
        <Text style={styles.topVideoTitleText}>{item.title}</Text>
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
        <View style={styles.recentlyWatchedHashTagContainer}>
          {item?.tags?.length > 0 && item?.tags?.map((option: string) => {
            return (
              <View key={option} style={[styles.hasTagContainer]}>
                <Text style={styles.hasTagText}>{option}</Text>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

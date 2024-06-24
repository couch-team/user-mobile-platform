import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { recommendedOptions } from 'constants/data';
import { Colors, Images } from 'theme/config';
import { HeaderText } from 'components';
import { convertDuration } from 'utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';


export const RecommendedPodcastCard = ({ item } : { item: any }) => {
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();
  return (
    <TouchableOpacity style={styles.recommendedSectionItemContainer} onPress={() => navigation.navigate('CbtAudio', { header: item.title, backgroundImageUri: item.background_url, audio_uri: item.content_url, id: item?.id, is_complete: item?.play_history?.is_complete, duration: item?.play_history?.current_duration }) }>
      <View style={styles.recommendedSectionHeaderContainer}>
        {item?.tags?.length > 0 && item?.tags?.map((tag: string, index: number) => {
          return (
            <View style={styles.recommendedOptionContainer} key={index}>
              <Text style={styles.recommendedOptionText}>{tag}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.podcastTitleContainer}>
        <HeaderText
          headerTextStyle={styles.headerTextStyle}
          text={item?.title}
          textStyle={styles.textStyle}
          hasSubText={ convertDuration(item?.duration) + " — Playtime"}
        />
      </View>

      <View style={styles.podcastItemIconContainer}>
        <View style={styles.podcastRateContainer}>
          {/* <View
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
          </View> */}
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
    </TouchableOpacity>
  );
};

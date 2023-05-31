import { categories, podcasts4u } from 'constants/data';
import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import PodcastItem from 'screens/dashboard/home/components/PodcastItem';
import { styles } from './style';
import HeaderText from 'components/base/header-text';
import { RecommendedPodcastCard } from '../components';
import { Images } from 'theme/config';

export const Listen = () => {
  return (
    <View style={[styles.podcastSectionContainer]}>
      <RecommendedPodcastCard />
      <HeaderText
        text="Top podcasts"
        textStyle={styles.podcastSectionHeaderText}
        hasSubText="Track your mood and feel better"
      />
      <ScrollView
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        contentContainerStyle={styles.podcastContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {podcasts4u?.map(podcast => {
          return <PodcastItem key={podcast.id} item={podcast} />;
        })}
      </ScrollView>

      <Text style={styles.categoriesHeaderText}>Categories</Text>
      <View style={styles.categoriesListContainer}>
        {categories?.map(category => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.categoryListItemContainer}>
              <View style={styles.voiceNoteIconContainer}>
                <Image
                  source={Images['voice-note']}
                  resizeMode="contain"
                  style={[
                    styles.voiceNoteIcon,
                    { tintColor: category.tintColor },
                  ]}
                />
              </View>
              <Text style={styles.categoryListText}>{category.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

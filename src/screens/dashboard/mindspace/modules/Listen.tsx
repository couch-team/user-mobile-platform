import { podcasts4u } from 'constants/data';
import React from 'react';
import { View, ScrollView } from 'react-native';
import PodcastItem from 'screens/dashboard/home/components/PodcastItem';
import { styles } from './style';
import HeaderText from 'components/base/header-text';

export const Listen = () => {
  return (
    <View style={[styles.podcastSectionContainer]}>
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
    </View>
  );
};

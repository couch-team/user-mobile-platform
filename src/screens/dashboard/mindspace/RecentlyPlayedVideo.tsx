import { StackScreenProps } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import HeaderText from 'components/base/header-text';
import { recentlyWatched } from 'constants/data';
import { RecentlyWatchedVideo } from './components';

type ScreenProps = StackScreenProps<DashboardParamList, 'RecentlyPlayedVideo'>;

const RecentlyPlayedVideo = ({ navigation: { goBack } }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Your Watch History"
        hasSubText="Podcasts, Videos and other media to ease your mind"
        hasSubTextStyle={styles.hasSubTextStyle}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {recentlyWatched?.slice(0, 3).map((watched, index) => {
          return <RecentlyWatchedVideo key={index} watched={watched} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecentlyPlayedVideo;

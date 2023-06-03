import { StackScreenProps } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import HeaderText from 'components/base/header-text';
import { recentlyPlayed } from 'constants/data';
import { RecentlyPlayed } from './components';

type ScreenProps = StackScreenProps<DashboardParamList, 'RecentlyPlayedAudio'>;

const RecentlyPlayedAudio = ({ navigation: { goBack } }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Your Play History"
        hasSubText="Podcasts, Videos and other media to ease your mind"
        hasSubTextStyle={styles.hasSubTextStyle}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {recentlyPlayed?.slice(0, 3).map((played, index) => {
          return <RecentlyPlayed key={index} played={played} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecentlyPlayedAudio;

import { StackScreenProps } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import HeaderText from 'components/base/header-text';
import { recentlyRead } from 'constants/data';

type ScreenProps = StackScreenProps<DashboardParamList, 'RecentlyPlayedText'>;

const RecentlyPlayedText = ({ navigation: { goBack } }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Your Read History"
        hasSubText="Podcasts, Videos and other media to ease your mind"
        hasSubTextStyle={styles.hasSubTextStyle}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {recentlyRead.map(read => {
          return (
            <View key={read.id} style={styles.singleReadItemContainer}>
              <Image
                source={read.image}
                resizeMode="contain"
                style={styles.readImage}
              />
              <Text style={styles.readTextTitle}>{read.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecentlyPlayedText;

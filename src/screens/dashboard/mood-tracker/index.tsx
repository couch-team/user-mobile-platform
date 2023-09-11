import React, { useEffect } from 'react';
import { Image, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderBar, HeaderText } from 'components';
import { loggedMoods, stackData } from 'constants/data';
import { Images } from 'theme/config';
import { BarChart } from 'react-native-gifted-charts';
import { useDispatch } from 'react-redux';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'MoodTracker'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const MoodTracker = ({ navigation: { navigate, goBack } }: Props) => {
  const {
    User: { getUserMoods },
  } = useDispatch();

  useEffect(() => {
    getUserMoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Mood Tracker"
        hasSubText="A little Cognitive brain test wouldn’t hurt.."
      />
      <TouchableOpacity
        onPress={() => navigate('AddMood')}
        activeOpacity={0.8}
        style={styles.plusIconContainer}>
        <Image source={Images.plus} style={styles.plusIcon} />
      </TouchableOpacity>
      {(() => {
        if (loggedMoods.length === 0) {
          return (
            <View style={styles.emptyMoodTrackerContainer}>
              <View style={styles.emptyMoodIconContainer}>
                <Image
                  source={Images['empty-mood']}
                  resizeMode="contain"
                  style={styles.emptyMoodIcon}
                />
              </View>
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyMainText}>
                  No Mood logged in here yet
                </Text>
                <Text style={styles.emptyBodyText}>
                  Tap the '+' button below to log your mood on the mood tracker.
                </Text>
              </View>
            </View>
          );
        } else if (loggedMoods.length > 0) {
          return (
            <View>
              <BarChart width={340} stackData={stackData} />
            </View>
          );
        }
      })()}
      <View style={styles.bodyContainer}>
        <SectionList
          sections={loggedMoods}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemMoodContainer} key={index}>
                <Image
                  source={item.icon}
                  style={styles.moodIcon}
                  resizeMode="contain"
                />
                <View style={styles.itemMoodBodyContainer}>
                  <Text
                    style={[styles.itemMoodMainText, { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemMoodBodyText}>{item.date}</Text>
                </View>
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View style={styles.headerSectionContainer}>
                <Image
                  source={Images['header-icon']}
                  resizeMode="contain"
                  style={styles.headerIcon}
                />
                <Text style={styles.headerTitleStyle}>{title}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MoodTracker;

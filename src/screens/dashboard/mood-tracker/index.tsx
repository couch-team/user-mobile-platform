import React, { useEffect } from 'react';
import { Image, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderBar, HeaderText, Loader, SVGIcon } from 'components';
import { Colors, Images } from 'theme/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { groupTransactions } from 'utils';
import moment from 'moment';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchMoods } from 'store/slice/moodSlice';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'MoodTracker'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const MoodTracker = ({ navigation: { navigate, goBack } }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoods(1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { moods, isFetchingMoods } = useSelector((state: RootState) => state.Mood);
  console.log(moods,'mood list');

  const groupedMoods = groupTransactions(moods);

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
        if (moods.length === 0) {
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
        }
      })()}
      <View style={styles.bodyContainer}>
        <SectionList
          sections={groupedMoods}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemMoodContainer} key={index}>
                <SVGIcon name={item?.mood?.toLowerCase()} />
                <View style={styles.itemMoodBodyContainer}>
                  <Text style={[styles.itemMoodMainText]}>{item.mood}</Text>
                  <Text style={styles.itemMoodBodyText}>
                    {moment(item.created_at).fromNow()} -{' '}
                    {moment(item.created_at).format('LT')}
                  </Text>
                </View>
              </View>
            );
          }}
          renderSectionHeader={({ section: { title, isToday } }) => {
            return (
              <View style={styles.headerSectionContainer}>
                <Image
                  source={Images['header-icon']}
                  resizeMode="contain"
                  style={styles.headerIcon}
                />
                <Text style={styles.headerTitleStyle}>
                  {isToday === 'Today' ? 'TODAY' : title}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <Loader color={Colors.WHITE} loading={isFetchingMoods}/>
    </SafeAreaView>
  );
};

export default MoodTracker;

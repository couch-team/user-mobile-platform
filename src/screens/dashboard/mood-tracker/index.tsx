import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { DashboardParamList } from 'utils/types/navigation-types';
import { HeaderBar, HeaderText, Loader, SVGIcon } from 'components';
import { Colors, Images } from 'theme/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { groupTransactions } from 'utils';
import moment from 'moment';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchChartData, fetchMoods } from 'store/actions/mood';
import MoodChart from 'components/charts/moodChart';
import { $api } from 'services';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { clearMoodReducer, setHasFetchedMoods, setMoods, setReachedEnd } from 'store/slice/moodSlice';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'MoodTracker'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const MoodTracker = ({ navigation: { navigate, goBack } }: Props) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchChartData());
  }, []);

  useEffect(() => {
    dispatch(fetchMoods(currentPage));
  }, [currentPage]);

  const { moods, isFetchingMoods, hasFetchedMoods, reached_end } = useSelector(
    (state: RootState) => state.Mood,
  );
  const groupedMoods = groupTransactions(moods);

  const resetMoods = () => {
    dispatch(clearMoodReducer())
    dispatch(fetchChartData());
    currentPage === 1 ? dispatch(fetchMoods(1)) : setCurrentPage(1)
  }
  
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
      <View style={styles.bodyContainer}>
        <SectionList
          onEndReached={() =>
            !reached_end && !isFetchingMoods && setCurrentPage(currentPage + 1)
          }
          sections={groupedMoods}
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
                refreshing={isFetchingMoods && moods?.length === 0}
                onRefresh={() => resetMoods()}
                colors={['#ffffff']}
                progressBackgroundColor="#0D0E36"
            />
          }
          ListEmptyComponent={
            !isFetchingMoods
              ?
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
            :
            <View></View>
          }
          ListHeaderComponent={
            <View style={{ width: '100%', paddingHorizontal: 24 }}>
              <MoodChart />
            </View>
          }
          ListFooterComponent={
            reached_end ? (
              moods?.length > 0 ? (
                <View style={styles.reachedEndContainer}>
                  <Text style={styles.reachedEnd}>
                    You have reached the end! 🎉
                  </Text>
                </View>
              ) : (
                <View style={styles.reachedEndContainer}></View>
              )
            ) : hasFetchedMoods && isFetchingMoods ? (
              <View style={styles.reachedEndContainer}>
                <ActivityIndicator size={'small'} color={Colors.WHITE} />
              </View>
            ) : (
              <View style={styles.reachedEndContainer}></View>
            )
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => navigate('CompleteAddMood', item)}>
                <View style={styles.itemMoodContainer} key={index}>
                  {item?.emotion?.mood?.icon_url ? (
                    <Image
                      style={styles.moodEmoji}
                      source={{ uri: item?.emotion?.mood?.icon_url }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.dummyMoodEmoji}></View>
                  )}
                  <View style={styles.itemMoodBodyContainer}>
                    <Text style={[styles.itemMoodMainText]}>
                      {item?.emotion?.title}
                    </Text>
                    <Text style={styles.itemMoodBodyText}>
                      {moment(item.created_at).fromNow()} -{' '}
                      {moment(item.created_at).format('LT')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
      {moods.length === 0 && !isFetchingMoods && (
        <View style={styles.emptyMoodTrackerContainer}>
          <View style={styles.emptyMoodIconContainer}>
            <Image
              source={Images['empty-mood']}
              resizeMode="contain"
              style={styles.emptyMoodIcon}
            />
          </View>
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyMainText}>No Mood logged in here yet</Text>
            <Text style={styles.emptyBodyText}>
              Tap the '+' button below to log your mood on the mood tracker.
            </Text>
          </View>
        </View>
      )}
      <Loader
        color={Colors.WHITE}
        loading={!hasFetchedMoods && isFetchingMoods}
      />
    </SafeAreaView>
  );
};

export default MoodTracker;

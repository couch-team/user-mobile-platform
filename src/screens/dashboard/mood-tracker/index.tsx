import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SectionList, Text, TouchableOpacity, View } from 'react-native';
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
import { clearMoodReducer  } from 'store/slice/moodSlice';
import { showMessage } from 'react-native-flash-message';
import { fetchMoods } from 'store/actions/mood';
import MoodChart from 'components/charts/moodChart';
import { $api } from 'services';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'MoodTracker'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const MoodTracker = ({ navigation: { navigate, goBack } }: Props) => {
  const [ chart_loading, setChartLoading ] = useState(false);
  const [ chartData, setChartData ] = useState<{ date: string, count: number }[]>([])
  const dispatch = useAppDispatch();
  const [ currentPage, setCurrentPage ] = useState(1);

  const fetchChartData = async() => {
    try{
        setChartLoading(true)
        const response = await $api.fetch('/api/mood/dates')
        if($api.isSuccessful(response)){
            setChartData(response?.data)
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        setChartLoading(false)
    }
  }

  useEffect(() => {
      fetchChartData()
  },[])

  useEffect(() => {
    dispatch(fetchMoods(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // return(() => {
    //   dispatch(clearMoodReducer())
    // })
  }, [ currentPage ]);

  const { moods, isFetchingMoods, hasFetchedMoods, reached_end } = useSelector((state: RootState) => state.Mood);
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
        if (moods.length === 0 && !isFetchingMoods) {
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
          onEndReached={() => !reached_end && !isFetchingMoods && setCurrentPage(currentPage + 1)}
          sections={groupedMoods}
          contentContainerStyle={styles.contentContainerStyle}
          ListHeaderComponent={
            <View style={{ width: '100%', paddingHorizontal: 24, }}>
              <MoodChart data={chartData} is_loading={chart_loading}/>
            </View>
          }
          ListFooterComponent={
            reached_end 
              ?  
              moods?.length > 0
                ?           
                <View style={styles.reachedEndContainer}>
                  <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                </View>
                :
                <View style={styles.reachedEndContainer}></View>
              :
              (hasFetchedMoods && isFetchingMoods)
                ?
                <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                :
                <View style={styles.reachedEndContainer}></View>
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => navigate("CompleteAddMood",item)}>
                <View style={styles.itemMoodContainer} key={index}>
                  { item?.emotion?.mood?.icon_url 
                      ? 
                      <Image 
                        style={styles.moodEmoji}
                        source={{ uri: item?.emotion?.mood?.icon_url }}
                        resizeMode='cover'
                      /> 
                      : 
                      <View style={styles.dummyMoodEmoji}></View> 
                  }
                  <View style={styles.itemMoodBodyContainer}>
                    <Text style={[styles.itemMoodMainText]}>{item?.emotion?.title}</Text>
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
      <Loader color={Colors.WHITE} loading={!hasFetchedMoods && isFetchingMoods}/>
    </SafeAreaView>
  );
};

export default MoodTracker;

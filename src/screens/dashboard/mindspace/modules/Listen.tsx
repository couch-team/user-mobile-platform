import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import PodcastItem from 'screens/dashboard/home/components/PodcastItem';
import { styles } from './style';
import { RecentlyPlayed, RecommendedPodcastCard } from '../components';
import { Colors, Images, Typography } from 'theme/config';
import { deviceWidth, wp } from 'constants/layout';
import { HeaderText } from 'components';
import { $api } from 'services';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';
import debounce from 'helpers/debounce';

const SeparatorComponent = () => {
  return <View style={{ width: 10 }} />; // Adjust width as per your requirement
};
export const Listen = () => {
  const [ isFetchingAudio, setIsFetchingAudio ] = useState(false);
  const [ isFetchingCategories, setIsFetchingCategories ] = useState(false);
  const [ isFetchingTopPodcasts, setIsFetchingTopPodcasts ] = useState(false);
  const [ isFetchingRecommendedPodcasts, setIsFetchingRecommendedPodcasts ] = useState(false);
  const [ topPodcasts, setTopPodcasts ] = useState<any[]>([]);
  const [ recommendedPodcasts, setRecommendedPodcasts ] = useState<any[]>([]);
  const [ categories, setCategories ] = useState<any>('');
  const [ podcasts, setPodcasts ] = useState<any[]>([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ reached_end, setReachedEnd ] = useState(false);
  const [ hasFetchedAudio, setHasFetchedAudio ] = useState(false)
  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();

  const fetchAudioLibrary = async() => {
    setHasFetchedAudio(true)
    setIsFetchingAudio(true)
    debounceFecthAudioLibrary(currentPage)
  }

  const debounceFecthAudioLibrary = debounce(async(current_page) => {
    try{
      const response = await $api.fetch(`/api/therapy/library/audio/?page=${current_page}`)
      if($api.isSuccessful(response)){
        response?.data?.results?.length > 0 ? setPodcasts(response?.data?.results) : setReachedEnd(true);
        !reached_end && !isFetchingAudio && setCurrentPage(currentPage + 1)
      }
      else if(!response?.data){
        setReachedEnd(true)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingAudio(false)
    }
  }, 500)

  const fetchCategories = async() => {
    try{
      setIsFetchingCategories(true)
      const response = await $api.fetch('/api/therapy/category/')
      if($api.isSuccessful(response)){
        setCategories(response?.data)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingCategories(false)
    }
  }

  const fetchTopPodcasts = async() => {
    try{
      setIsFetchingTopPodcasts(true)
      const response = await $api.fetch('/api/therapy/library/audio/top/')
      if($api.isSuccessful(response)){
        setTopPodcasts(Array.isArray(response?.data) ? response?.data : [response?.data])
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingTopPodcasts(false)
    }
  }

  const fetchRecommendedPodcasts = async() => {
    try{
      setIsFetchingRecommendedPodcasts(true)
      const response = await $api.fetch('/api/therapy/library/audio/recommended/')
      if($api.isSuccessful(response)){
        console.log({response})
        setRecommendedPodcasts(Array.isArray(response?.data) ? response?.data : [response?.data])
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingRecommendedPodcasts(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAudioLibrary()
    }, [ currentPage ])
  );
  
  useEffect(() => {
    fetchRecommendedPodcasts()
    fetchTopPodcasts()
    fetchCategories()
  },[])

  return (
    <View style={[styles.podcastSectionContainer]}>
      <FlatList
        data={recommendedPodcasts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={( item: any ) => <RecommendedPodcastCard {...item} /> }
        ListEmptyComponent={
          isFetchingRecommendedPodcasts
            ?
            <View style={[styles.reachedEndContainer, {width: deviceWidth - 48 }]}>
              <ActivityIndicator size={'small'} color={Colors.WHITE}/>
            </View>
            :
            <View style={{ paddingVertical: 40, width: deviceWidth - 48 }}>
              <Text style={{ fontFamily: Typography.fontFamily.SoraRegular, textAlign: 'center', color: Colors.WHITE }}>No result</Text>
            </View>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.podcastContentContainer}
        pagingEnabled
        ItemSeparatorComponent={SeparatorComponent}
      />
      <HeaderText
        text="Top podcasts"
        textStyle={styles.podcastSectionHeaderText}
        hasSubText="Track your mood and feel better"
      />
      <FlatList
        data={topPodcasts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={( item: any ) => <PodcastItem {...item} /> }
        ListEmptyComponent={
          isFetchingTopPodcasts
            ?
            <View style={[styles.reachedEndContainer, {width: deviceWidth - 48 }]}>
              <ActivityIndicator size={'small'} color={Colors.WHITE}/>
            </View>
            :
            <View style={{ paddingVertical: 40, width: deviceWidth - 48 }}>
              <Text style={{ fontFamily: Typography.fontFamily.SoraRegular, textAlign: 'center', color: Colors.WHITE }}>No result</Text>
            </View>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.podcastContentContainer}
      />
      <Text style={styles.categoriesHeaderText}>Categories</Text>
      <View
        style={[styles.categoriesListContainer, { marginHorizontal: 24 }]}>
          {
            isFetchingCategories
              ?
              <View style={{ paddingVertical: 50, width: '100%' }}>
                <ActivityIndicator size="small" color={Colors.WHITE}/>
              </View>
              :
              categories?.length > 0
                ?
                categories?.map((categoryToRender: any, index: number) => {
                  return(
                    <TouchableOpacity
                      key={categoryToRender?.id}
                      style={styles.categoryListItemContainer}
                      onPress={() => navigation.navigate('MindSpaceAudioSection', { header: "Listen", sub_header: categoryToRender.title + " " + "category" })}
                    >
                      <View style={styles.voiceNoteIconContainer}>
                        <Image
                          source={Images['voice-note']}
                          resizeMode="contain"
                          style={[
                            styles.voiceNoteIcon,
                            { tintColor: categoryToRender.colour },
                          ]}
                        />
                      </View>
                      <Text style={styles.categoryListText}>{categoryToRender.title}</Text>
                    </TouchableOpacity>
                  )
                })
                :
                <View style={{ paddingVertical: 40, width: '100%' }}>
                  <Text style={{ fontFamily: Typography.fontFamily.SoraRegular, textAlign: 'center', color: Colors.WHITE }}>No result</Text>
                </View>
          }
      </View>
      <View
        style={[styles.recentlyReadContainer, { marginHorizontal: wp(24) }]}>
        <View style={styles.recentlyReadHeaderContainer}>
          <HeaderText
            text="Recently Played"
            textStyle={styles.textStyle}
            headerTextStyle={styles.headerTextStyle}
            hasSubText="Track your mood and feel better"
          />
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RecentlyPlayedAudio')}
            style={styles.arrowIconContainer}>
            <Image
              source={Images['arrow-right-circle']}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity> */}
        </View>
        <View style={{ marginTop: 24, gap: 20 }}>
          {
            podcasts?.length  > 0 
              ?
              podcasts?.map((podcast: any) => {
                return(
                  <RecentlyPlayed background_url={podcast?.background_url} content_url={podcast?.content_url} current_duration={podcast?.play_history?.current_duration || "00:00"} id={podcast?.id} duration={podcast?.duration} key={podcast?.id} color={podcast?.category[0]?.colour} tags={podcast?.tags} title={podcast?.title}/>
                )
              })
              :
              isFetchingAudio
                ?
                <View style={styles.reachedEndContainer}>
                  <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                </View>
                :
                <View style={styles.reachedEndContainer}>
                  <Text style={styles.reachedEnd}>No result</Text>
                </View>
          }
          {
            reached_end 
              ?  
              podcasts?.length > 0
                ?           
                <View style={styles.reachedEndContainer}>
                  <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                </View>
                :
                <View style={styles.reachedEndContainer}></View>
              :
              (podcasts?.length > 0 && isFetchingAudio)
                ?
                <View style={styles.reachedEndContainer}>
                  <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                </View>
                :
                <View style={styles.reachedEndContainer}></View>
          }
        </View>
      </View>
    </View>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { styles } from './style';
import { recentlyWatched, topVideos } from 'constants/data';
import { RecentlyWatchedVideo, RecommendedPodcastCard, VideoItem } from '../components';
import { deviceWidth, wp } from 'constants/layout';
import { navigation } from 'navigation/utils';
import { HeaderText } from 'components';
import { $api } from 'services';
import debounce from 'helpers/debounce';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';
import { RecommendedVideoCard } from '../components/recommendedVideoCard';

export const Watch = () => {
  const [ isFetchingCategories, setIsFetchingCategories ] = useState(false);
  const [ categories, setCategories ] = useState<any>('');
  const [ isFetchingVideo, setIsFetchingVideo ] = useState(false);
  const [ hasFetchedVideo, setHasFetchedVideo ] = useState(false);
  const [ isFetchingTopPodcasts, setIsFetchingTopPodcasts ] = useState(false);
  const [ isFetchingRecommendedPodcasts, setIsFetchingRecommendedPodcasts ] = useState(false);
  const [ topPodcasts, setTopPodcasts ] = useState<any[]>([]);
  const [ recommendedPodcasts, setRecommendedPodcasts ] = useState<any[]>([]);
  const [ videos, setVideos ] = useState<any[]>([]);
  const [ reached_end, setReachedEnd ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);

  const navigation = useNavigation<NavigationProp<DashboardParamList, 'MindSpace'>>();
  const fetchVideoLibrary = async() => {
    setHasFetchedVideo(true)
    setIsFetchingVideo(true)
    debounceFecthAudioLibrary(currentPage)
  }

  const debounceFecthAudioLibrary = debounce(async(current_page) => {
    try{
      const response = await $api.fetch(`/api/therapy/library/video/?page=${current_page}`)
      if($api.isSuccessful(response)){
        response?.data?.results?.length > 0 ? setVideos(response?.data?.results) : setReachedEnd(true);
        !reached_end && !isFetchingVideo && setCurrentPage(currentPage + 1)
      }
      else if(!response?.data){
        setReachedEnd(true)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingVideo(false)
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
      const response = await $api.fetch('/api/therapy/library/video/top/')
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
      const response = await $api.fetch('/api/therapy/library/video/recommended/')
      if($api.isSuccessful(response)){
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
      fetchVideoLibrary()
    }, [ currentPage ])
  );

  useEffect(() => {
    fetchCategories()
    fetchRecommendedPodcasts()
    fetchTopPodcasts()
  },[])

  return (
    <>
      <FlatList
        data={recommendedPodcasts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={( item: any ) => <RecommendedVideoCard {...item} /> }
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
      />
      <View>
        <HeaderText
          textStyle={styles.textStyle}
          text="Top videos"
          hasSubText="Podcasts, Videos and other media to ease your mind"
          hasSubTextStyle={styles.hasSubTextStyle}
        />
        <FlatList
          data={topPodcasts}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={( item: any ) => <VideoItem {...item} /> }
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
      </View>
      <View style={styles.recommendedSectionContainer}>
        <Text style={[styles.categoriesHeaderText, styles.noPaddingHorizontal]}>
          Categories
        </Text>
        <View
          style={[styles.categoriesListContainer]}>
            {
              isFetchingCategories
                ?
                <View style={{ paddingVertical: 50, width: '100%' }}>
                  <ActivityIndicator size="small" color={Colors.WHITE}/>
                </View>
                :
                categories?.length > 0
                  ?
                  categories?.map((categoryToRender: any) => {
                    return(
                      <TouchableOpacity
                        key={categoryToRender?.id}
                        style={styles.categoryListItemContainer}
                        onPress={() => navigation.navigate('MindSpaceVideoSection', { header: "Watch", sub_header: categoryToRender.title + " " + "category" })}
                      >
                        <View style={styles.voiceNoteIconContainer}>
                          <Image
                            source={Images.play}
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
        <View style={styles.recentlyReadContainer}>
          <View style={styles.recentlyReadHeaderContainer}>
            <HeaderText
              text="Recently Watched"
              textStyle={styles.textStyle}
              headerTextStyle={styles.headerTextStyle}
              hasSubText="Track your mood and feel better"
            />
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('RecentlyPlayedVideo')}
              style={styles.arrowIconContainer}>
              <Image
                source={Images['arrow-right-circle']}
                resizeMode="contain"
                style={styles.arrowIcon}
              />
            </TouchableOpacity> */}
          </View>
            {/* <View style={styles.recentlyReadContainer}>
              {recentlyWatched.map((watched, index) => {
                return <RecentlyWatchedVideo key={index} watched={watched} />;
              })}
            </View> */}
            <View style={{ marginTop: 24, gap: 20 }}>
            {
              videos?.length  > 0 
                ?
                videos?.map((podcast: any) => {
                  return(
                    <RecentlyWatchedVideo background_url={podcast?.background_url} content_url={podcast?.content_url} current_duration={podcast?.play_history?.current_duration || "00:00"} id={podcast?.id} duration={podcast?.duration} key={podcast?.id} color={podcast?.category[0]?.colour} tags={podcast?.tags} title={podcast?.title}/>
                  )
                })
                :
                isFetchingVideo
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
                videos?.length > 0
                  ?           
                  <View style={styles.reachedEndContainer}>
                    <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                  </View>
                  :
                  <View style={styles.reachedEndContainer}></View>
                :
                (videos?.length > 0 && isFetchingVideo)
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
    </>
  );
};

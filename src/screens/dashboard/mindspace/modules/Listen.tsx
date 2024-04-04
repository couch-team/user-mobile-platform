import { categories, podcasts4u, recentlyPlayed } from 'constants/data';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import PodcastItem from 'screens/dashboard/home/components/PodcastItem';
import { styles } from './style';
import { RecentlyPlayed, RecommendedPodcastCard } from '../components';
import { Colors, Images } from 'theme/config';
import { wp } from 'constants/layout';
import { navigation } from 'navigation/utils';
import { HeaderText } from 'components';
import { $api } from 'services';
import { debounce } from 'lodash';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';

export const Listen = () => {
  const [ isFetchingAudio, setIsFetchingAudio ] = useState(false);
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
        response?.data?.results?.length > 0 ? setPodcasts(response?.data?.results) : setReachedEnd(true)
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
  })

  useEffect(() => {
    fetchAudioLibrary()
  },[ currentPage ])

  return (
    <View style={[styles.podcastSectionContainer]}>
      <RecommendedPodcastCard />
      <HeaderText
        text="Top podcasts"
        textStyle={styles.podcastSectionHeaderText}
        hasSubText="Track your mood and feel better"
      />
      <FlatList
        data={podcasts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={( item: any ) => <PodcastItem {...item} />}
        onEndReached={() => !reached_end && !isFetchingAudio && setCurrentPage(currentPage + 1)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.podcastContentContainer}
        ListFooterComponent={
          reached_end 
            ?  
            podcasts?.length > 0
              ?           
              <View style={styles.reachedEndContainer}>
                <Text style={styles.reachedEnd}>🎉</Text>
              </View>
              :
              <View style={styles.reachedEndContainer}></View>
            :
            (hasFetchedAudio && isFetchingAudio)
              ?
              <View style={styles.reachedEndContainer}>
                <ActivityIndicator size={'small'} color={Colors.WHITE}/>
              </View>
              :
              <View style={styles.reachedEndContainer}></View>
        }
      />
      <Text style={styles.categoriesHeaderText}>Categories</Text>
      <View
        style={[styles.categoriesListContainer, { marginHorizontal: 24 }]}>
        {categories?.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.categoryListItemContainer}
              onPress={() => navigation.navigate('MindSpaceSection', { content: <View></View>, header: "Listen", sub_header: category.title + " " + "category" })}
            >
              <View style={styles.voiceNoteIconContainer}>
                <Image
                  source={Images['voice-note']}
                  resizeMode="contain"
                  style={[
                    styles.voiceNoteIcon,
                    { tintColor: category.tintColor },
                  ]}
                />
              </View>
              <Text style={styles.categoryListText}>{category.title}</Text>
            </TouchableOpacity>
          );
        })}
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RecentlyPlayedAudio')}
            style={styles.arrowIconContainer}>
            <Image
              source={Images['arrow-right-circle']}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recentlyReadContainer}>
          {recentlyPlayed?.slice(0, 3).map((played, index) => {
            return <RecentlyPlayed key={index} played={played} />;
          })}
        </View>
      </View>
    </View>
  );
};

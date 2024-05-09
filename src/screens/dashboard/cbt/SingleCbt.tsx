/* eslint-disable prettier/prettier */
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { cbtPlayData } from 'constants/data';
import { Image } from 'react-native';
import { wp } from 'constants/layout';
import { HeaderBar } from 'components';
import { LinearGradient } from 'expo-linear-gradient';
import { $api } from 'services';
import { convertDuration } from 'utils';

type ScreenProps = StackScreenProps<DashboardParamList, 'SingleCbt'>;

const SingleCbt = ({ navigation: { goBack, navigate } }: ScreenProps) => {
  const [ isFetchingCbt, setIsFetchingCbt ] = useState(false);
  const [ isFetchingContent, setIsFetchingContent ] = useState(false);
  const [ content, setContent ] = useState<any[]>([]);
  const [ data, setData ] = useState<any>('');
  const { params } = useRoute<RouteProp<DashboardParamList, 'SingleCbt'>>();
  const id = params?.id;

  const fetchCbt = async() => {
    try{
      setIsFetchingCbt(true)
      const response = await $api.fetch(`/api/therapy/cbt/${id}/`)
      if($api.isSuccessful(response)){
        setData(response?.data)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingCbt(false)
    }
  }

  const fetchContent = async() => {
    try{
      setIsFetchingContent(true)
      const response = await $api.fetch(`/api/therapy/cbt/${id}/content/`)
      if($api.isSuccessful(response)){
        setContent(response?.data)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsFetchingContent(false)
    }
  }

  useEffect(() => {
    fetchCbt()
  },[])

  useFocusEffect(
    useCallback(() => {
      fetchContent()
    }, [])
  );


  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <SectionList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ isFetchingContent ? <View style={{ paddingTop: 24 }}><ActivityIndicator size="small" color={Colors.WHITE}/></View> : <Text style={{ color: Colors.WHITE }}>No results</Text>}
        ListHeaderComponent={() => {
          return (
            <ImageBackground
              source={{ uri: data?.background_url }}
              style={[styles.headerContainerImage, { paddingTop: top }]}>
              <View style={styles.headerContainer}>
                <HeaderBar
                  hasBackButton
                  onPressLeftIcon={() => goBack()}
                  tintColor={Colors.WHITE}
                  backgroundColor="transparent"
                />
              </View>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.8)']}
                style={styles.headerContainerGradientImage}>
                <View style={styles.headerContainerItemContainer}>
                  <Text style={styles.cbtHeaderTitleText}>{data?.title}</Text>
                  <Text style={styles.cbtSubHeaderText}>
                    {data?.sub_title}
                  </Text>
                  <View style={styles.cbtItemFeaturesContainer}>
                    {data?.tags?.map((tag: any) => {
                      return (
                        <View style={styles.cbtItemBodyContainer} key={tag}>
                          <Text style={styles.cbtItemText}>{tag}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          );
        }}
        sections={content}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index, section }: any) => {
          const sectionIndex = content.findIndex((sec: any) => sec.group === section.group);

          const is_disabled = sectionIndex === 0 ? false : content[sectionIndex - 1]?.data?.every((item: any) => item.play_history && item.play_history.is_complete === true) ? false : true
          const type =
            item?.resourcetype === 'VideoContent'
              ? Images['video-player']
              : item?.resourcetype === 'AudioContent'
                ? Images?.['voice-note']
                : item?.resourcetype === 'ReadingContent'
                  ? Images?.document
                  : Images?.['help-circle'];

          const hasPlayed = item?.play_history?.is_complete ? Images['circle-check'] : Images['circle-check-box'];

          return (
            <View style={[styles.cbtDataContainer, is_disabled && { opacity: 0.6 }]}>
              <View style={styles.cardLine}>
                <View style={styles.cbtLine} />
                <Image source={hasPlayed} resizeMode="contain" style={styles.checkIcon} />
                <View style={styles.cbtLine} />
              </View>
              <TouchableOpacity
                key={index}
                style={styles.cbtItemDataBodyContainer}
                disabled={is_disabled}
                onPress={() => 
                  item?.resourcetype === 'ReadingContent'
                  ?
                  navigate('CbtText', { id: item?.id, content: item?.reading })
                  :
                  item.resourcetype === 'AudioContent' 
                  ? navigate('CbtAudio', { header: item.title, backgroundImageUri: item.background_url, audio_uri: item.content_url, id: item?.id, is_complete: item?.play_history?.is_complete, duration: item?.play_history?.current_duration }) 
                  : item.resourcetype === 'VideoContent'
                    ?  navigate('CbtVideo', { header: item.title, backgroundImageUri: item.background_url, video_uri: item.content_url, id: item?.id, is_complete: item?.play_history?.is_complete, duration: item?.play_history?.current_duration  }) 
                    :navigate('CbtExercise', { id: item?.id, content: item?.exercises }) }
              >
                <View style={styles.cbtItemIconContainer}>
                  <Image
                    source={type}
                    resizeMode="contain"
                    style={styles.cbtItemIcon}
                  />
                </View>
                <View>
                  <Text style={styles.singleCbtTitleText}>{item?.title}</Text>
                  <View style={[styles.cbtItemFeaturesContainer, { paddingLeft: wp(16) }]}>
                    <View style={styles.singleCbtOptionItem}>
                      <Text style={styles.singleCbtOptionText}>{convertDuration(item?.duration)}</Text>
                    </View>
                    {item?.tags?.map((tag: any) => {
                      return (
                        <View key={tag} style={styles.singleCbtOptionItem}>
                          <Text style={styles.singleCbtOptionText}>{tag}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        renderSectionHeader={({ section: { group } }) => {
          const hasStarted = false
          return (
            <View style={styles.headerSectionWrapper}>
              <View style={styles.headerSectionContainer}>
                {!hasStarted && <Image source={Images.lock} resizeMode="contain" style={styles.lockIcon} />}
                <Text style={styles.headerTitleStyle}>{group}</Text>
              </View>
              <View style={[styles.cbtLine, { marginLeft: 12.16, height: 16 }]} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SingleCbt;

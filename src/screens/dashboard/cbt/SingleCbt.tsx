/* eslint-disable prettier/prettier */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import { Colors, Images } from 'theme/config';
import { RouteProp, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { cbtPlayData } from 'constants/data';
import { Image } from 'react-native';
import { wp } from 'constants/layout';

type ScreenProps = StackScreenProps<DashboardParamList, 'SingleCbt'>;

const SingleCbt = ({ navigation: { goBack } }: ScreenProps) => {
  const { params } = useRoute<RouteProp<DashboardParamList, 'SingleCbt'>>();
  const data = params?.item;
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <ImageBackground
              source={data.image}
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
                    {data?.description}
                  </Text>
                  <View style={styles.cbtItemFeaturesContainer}>
                    {data?.options?.map(option => {
                      return (
                        <View style={styles.cbtItemBodyContainer} key={option}>
                          <Text style={styles.cbtItemText}>{option}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          );
        }}
        sections={cbtPlayData}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => {
          const type =
            item?.type === 'video'
              ? Images['video-player']
              : item?.type === 'audio'
                ? Images?.['voice-note']
                : item?.type === 'text'
                  ? Images?.document
                  : Images?.['help-circle'];

          const hasPlayed = item?.isPlayed ? Images['circle-check'] : Images['circle-check-box'];

          return (
            <View style={styles.cbtDataContainer}>
              <View>
                <View style={styles.cbtLine} />
                <Image source={hasPlayed} resizeMode="contain" style={styles.checkIcon} />
              </View>
              <TouchableOpacity
                key={index}
                style={styles.cbtItemDataBodyContainer}>
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
                    {item?.options?.map(option => {
                      return (
                        <View key={option} style={styles.singleCbtOptionItem}>
                          <Text style={styles.singleCbtOptionText}>{option}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        renderSectionHeader={({ section: { title, hasStarted } }) => {
          return (
            <View style={styles.headerSectionContainer}>
              {!hasStarted && <Image source={Images.lock} resizeMode="contain" style={styles.lockIcon} />}
              <Text style={styles.headerTitleStyle}>{title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SingleCbt;

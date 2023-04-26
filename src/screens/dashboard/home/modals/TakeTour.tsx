import React, { useRef, useState } from 'react';
import { View, Image, ImageBackground, ScrollView, Text } from 'react-native';
import { styles } from './style';
import XButton from 'components/base/x-button';
import { tourInfoData } from 'constants/data';
import { navigation } from 'navigation/utils';
import { Images } from 'theme/config';
import { deviceWidth } from 'constants/layout';
import LongButton from 'components/base/long-button';

const TakeTour = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / deviceWidth);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <View style={styles.container}>
      <View>
        <XButton
          xButtonStyle={styles.buttonStyle}
          onXButtonPress={() => navigation.goBack()}
        />
        <ScrollView
          ref={scrollRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          pagingEnabled={true}
          bounces={false}
          onScroll={event => {
            setSliderPage(event);
          }}>
          {tourInfoData?.map((tourInfo, index) => {
            console.log(index);
            console.log(tourInfoData?.length);
            return (
              <View key={index} style={styles.singleTourContainer}>
                <Image
                  source={tourInfo.icon}
                  style={styles.infoDataIcon}
                  resizeMode="contain"
                />
                <ImageBackground
                  source={Images.bottom_semi_circle}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
                <View style={styles.bodySectionContainer}>
                  <Text style={styles.tourTitleStyle}>{tourInfo.title}</Text>
                  <Text
                    style={[
                      styles.tourSubTitleStyle,
                      { color: tourInfo.color },
                    ]}>
                    {tourInfo.description}
                  </Text>
                  <Text style={styles.descriptionBodyText}>
                    Let's customize your account better you would help in
                    answering a few questions. Would you love to answer the
                    questions now?
                  </Text>
                  <LongButton
                    isNotBottom
                    hasLongArrow={
                      tourInfo.id === tourInfoData?.length ? false : true
                    }
                    title={
                      tourInfo.id === tourInfoData?.length ? 'End tour' : ''
                    }
                    longArrowStyle={styles.longArrowStyle}
                    titleStyle={styles.titleStyle}
                    //@ts-ignore
                    buttonStyle={[
                      styles.longButtonStyle,
                      { backgroundColor: tourInfo.color },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {tourInfoData.map((key, index) => {
            return (
              <View
                style={[
                  styles.paginationDots,
                  pageIndex === index && {
                    backgroundColor: key.color,
                  },
                ]}
                key={index}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TakeTour;

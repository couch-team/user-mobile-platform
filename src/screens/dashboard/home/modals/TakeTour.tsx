import React, { useRef, useState } from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import { styles } from './style';
import { XButton, LongButton, SVGIcon } from 'components';
import { tourInfoData } from 'constants/data';
import { Images } from 'theme/config';
import { deviceWidth } from 'constants/layout';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'TakeTour'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const TakeTour = ({ navigation: { goBack } }: Props) => {
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
    <SafeAreaView style={styles.container}>
      <View>
        <XButton
          xButtonStyle={styles.buttonStyle}
          onXButtonPress={() => goBack()}
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
            return (
              <View key={index} style={styles.singleTourContainer}>
                <View style={styles.iconContainer}>
                  <SVGIcon name={tourInfo.icon} />
                </View>
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
                    {tourInfo?.text}
                  </Text>
                  <LongButton
                    isNotBottom
                    hasLongArrow={
                      tourInfo.id === tourInfoData?.length ? false : true
                    }
                    title={
                      tourInfo.id === tourInfoData?.length ? 'End tour' : ''
                    }
                    onPress={() => {
                      tourInfo.id === tourInfoData?.length
                        ? goBack()
                        : scrollRef.current?.scrollTo({
                            x: deviceWidth * (index + 1),
                          });
                    }}
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
    </SafeAreaView>
  );
};

export default TakeTour;

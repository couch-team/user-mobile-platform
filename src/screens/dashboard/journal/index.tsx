import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { groupBy } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderBar, VirtualizedScrollView, SVGIcon } from 'components';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { Images } from 'theme/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import JournalItem from './journal-item';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Journal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Journal = ({ navigation: { goBack, navigate } }: Props) => {
  const {
    Journal: { getJournals },
  } = useDispatch();
  const journalsState = useSelector(
    (state: RootState) => state.Journal.journals,
  );
  console.log('journalsState', journalsState);

  const journals = useMemo(() => {
    if (!journalsState) {
      return [];
    }

    const grouped = groupBy(journalsState, item => {
      const dayObj = dayjs(item.timestamp);
      if (dayObj.isToday()) {
        return 'Today';
      }

      if (dayObj.isYesterday()) {
        return 'Yesterday';
      }

      return dayObj.format('DD-MM-YYYY');
    });

    return Object.keys(grouped).map(key => {
      return {
        title: key,
        data: grouped[key],
      };
    });
  }, [journalsState]);
  console.log('journals', journals);

  useEffect(() => {
    getJournals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={Images.search}
            style={styles.headerRightIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={Images.settings}
            resizeMode="contain"
            style={styles.headerRightIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('AddJournal')}
        activeOpacity={0.8}
        style={styles.plusIconContainer}>
        <Image source={Images.plus} style={styles.plusIcon} />
      </TouchableOpacity>
      <VirtualizedScrollView>
        <HeaderBar
          hasBackButton
          onPressLeftIcon={() => goBack()}
          headerRight={<HeaderRight />}
        />
        <View style={styles.bodyContainer}>
          <Image
            source={Images['journal-frame']}
            resizeMode="contain"
            style={styles.journalFrameContainer}
          />
          <SectionList
            sections={journals}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => {
              return <JournalItem key={item.id} item={item} />;
            }}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={styles.headerSectionContainer}>
                  <Text style={styles.headerTitleStyle}>{title}</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <SVGIcon name="filter" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {/* <SectionList
            sections={journalList}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.itemMoodContainer,
                    // { backgroundColor: item.bg },
                  ]}
                  key={index}>
                  <View style={styles.journalHeaderContainer}>
                    <View style={styles.journalBodyHeaderContainer}>
                      <View style={styles.voiceIconLengthContainer}>
                        <View style={styles.voiceIconContainer}>
                          <Image
                            source={Images.voice}
                            resizeMode="contain"
                            style={styles.voiceIcon}
                          />
                        </View>
                        <Text style={styles.voiceDurationText}>0:35</Text>
                      </View>
                      <View
                        style={[
                          styles.voiceIconLengthContainer,
                          { marginLeft: wp(12) },
                        ]}>
                        <View style={styles.voiceIconContainer}>
                          <Image
                            source={Images.frame}
                            resizeMode="contain"
                            style={styles.voiceIcon}
                          />
                        </View>
                        <Text style={styles.voiceDurationText}>4</Text>
                      </View>
                    </View>
                    <View style={styles.journalMoodIconContainer}>
                      <Image
                        source={item.icon}
                        style={styles.moodIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View style={styles.itemMoodBodyContainer}>
                    <Text style={styles.itemMoodMainText}>{item.title}</Text>
                    <Text style={styles.itemMoodBodyText}>
                      {item.description}
                    </Text>
                    <Text style={styles.itemMoodBodyDateText}>{item.date}</Text>
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={styles.headerSectionContainer}>
                  <Text style={styles.headerTitleStyle}>{title}</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <SVGIcon name="filter" />
                  </TouchableOpacity>
                </View>
              );
            }}
          /> */}
        </View>
      </VirtualizedScrollView>
    </SafeAreaView>
  );
};

export default Journal;

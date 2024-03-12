/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderText, HeaderBar, VirtualizedScrollView } from 'components';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { Colors, Images } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import moment from 'moment';
import { groupJournalTransactions } from 'utils';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchJournals } from 'store/slice/journalSlice';
import { $api } from 'services';
import { useFocusEffect } from '@react-navigation/native';
import { MoodColors, MoodColorsBackground } from 'theme/config/colors';
import { Calendar, LocaleConfig } from 'react-native-calendars';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Journal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January .',
    'February .',
    'March .',
    'April .',
    'May .',
    'June .',
    'July .',
    'August .',
    'September .',
    'October .',
    'November .',
    'December .',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

type Direction = 'left' | 'right';

const Journal = ({ navigation: { goBack, navigate } }: Props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const flatListRef: any = useRef(null);
  const dispatch = useAppDispatch();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [inputText, setInoutText] = useState('');
  const [showCalender, setShowCalender] = useState(false);

  const authProfileDetails = useSelector((state: RootState) => state.User);
  const { journals, isFetchingJournals, journals_current_page } = useSelector(
    (state: RootState) => state.Journal,
  );
  const [markedDates, setMarkedDates] = useState<any>({});

  const fetchJournalEntries = async () => {
    const journalData = journals.reduce((acc: any, journal: any) => {
      const createdDate = moment(journal.created_at).format('YYYY-MM-DD');

      acc[createdDate] = {
        marked: true,
        dotColor: 'transparent',
        activeOpacity: 0,
      };

      return acc;
    }, {});

    setMarkedDates(journalData);
  };

  const renderDay = (day: any, item: any) => {
    const isToday = moment().isSame(day.dateString, 'day');
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 18,
        }}>
        <View
          style={{
            backgroundColor: isToday
              ? 'rgba(234, 235, 250, 1)'
              : item
              ? 'rgba(133, 138, 240, 1)'
              : 'transparent',
            borderRadius: 100,
            // padding: 7,
            height: 40,
            width: 40,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: isToday ? 'rgba(15, 17, 65, 1)' : 'white',
              textAlign: 'center',
            }}>
            {day.day}
          </Text>
        </View>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchJournals(journals_current_page));
      fetchJournalEntries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const nextPage = () => journals_current_page + 1;
  const previousPage = () => journals_current_page - 1;

  const HeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}
          onPress={() => setIsSearchInputVisible(!isSearchInputVisible)}>
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

  const RenderBasedOnMood = (mood: any) => {
    const moodType = mood?.title || ''; // Get the mood title, or use an empty string if not available

    const color = React.useMemo(() => {
      switch (moodType) {
        case 'Calm':
          return MoodColors.CALM;
        case 'Anxious':
          return MoodColors.ANXIOUS;
        case 'Excited':
          return MoodColors.EXCITED;
        case 'Happy':
          return MoodColors.HAPPY;
        case 'Sad':
          return MoodColors.SAD;
        case 'Angry':
          return MoodColors.ANGRY;
        default:
          return MoodColors.CALM;
      }
    }, [moodType]);

    const bgcolor = React.useMemo(() => {
      switch (moodType) {
        case 'Calm':
          return MoodColorsBackground.CALM;
        case 'Anxious':
          return MoodColorsBackground.ANXIOUS;
        case 'Excited':
          return MoodColorsBackground.EXCITED;
        case 'Happy':
          return MoodColorsBackground.HAPPY;
        case 'Sad':
          return MoodColorsBackground.SAD;
        case 'Angry':
          return MoodColorsBackground.ANGRY;
        default:
          return MoodColorsBackground.CALM;
      }
    }, [moodType]);

    const audioImages = React.useMemo(() => {
      switch (moodType) {
        case 'Calm':
          return Images['play-mood-red'];
        case 'Anxious':
          return Images['play-mood-green'];
        case 'Excited':
          return Images['play-mood-blue'];
        case 'Happy':
          return Images['play-mood-blue'];
        case 'Sad':
          return Images['play-mood-yellow'];
        case 'Angry':
          return Images['play-mood-blue'];
        default:
          return null;
      }
    }, [moodType]);

    const images = React.useMemo(() => {
      switch (moodType) {
        case 'Calm':
          return Images['record-mood-red'];
        case 'Anxious':
          return Images['record-mood-green'];
        case 'Excited':
          return Images['record-mood-blue'];
        case 'Happy':
          return Images['record-mood-blue'];
        case 'Sad':
          return Images['record-mood-yellow'];
        case 'Angry':
          return Images['record-mood-blue'];
        default:
          return Images['note-voice'];
      }
    }, [moodType]);

    return { images, color, audioImages, bgcolor };

    // Use the color, audioImages, and images in your component as needed
  };

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(inputText.toLowerCase()),
  );

  const CustomArrow = ({ direction, onPress }: any) => {
    const arrowImage =
      direction === 'left'
        ? Images['calender-left-arrow']
        : Images['calender-right-arrow'];

    return (
      <Pressable onPress={onPress}>
        <Image
          source={arrowImage}
          style={{ width: 6, height: 12 }}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCalender}
        onRequestClose={() => setShowCalender(false)}>
        <Pressable
          onPress={() => setShowCalender(false)}
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          ]}>
          <Pressable
            onPress={() => {}}
            style={{
              width: '90%',
              height: 40,
              position: 'relative',
              borderRadius: 8,
              // flex: 1,
            }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Calendar
                onMonthChange={month => {
                  console.log(month);
                }}
                markedDates={markedDates}
                style={{ height: 400, borderRadius: 12 }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: 'rgba(10, 11, 43, 1)',
                  textSectionTitleColor: '#ffffff',
                  selectedDayBackgroundColor: '#fff',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: 'rgba(15, 17, 65, 1)',
                  dayTextColor: '#fff',
                  textDisabledColor: 'transparent',
                  todayBackgroundColor: 'rgba(234, 235, 250, 1)',
                  monthTextColor: 'rgba(234, 235, 250, 1)',
                  textMonthFontSize: 18,
                  textDayFontSize: 14,
                  textDayStyle: { fontSize: 12 },
                }}
                renderArrow={(direction: Direction, onPress: any) => (
                  <CustomArrow direction={direction} onPress={onPress} />
                )}
                dayComponent={({ date, state }: any) => {
                  const item = markedDates[date.dateString];
                  return renderDay(date, item);
                }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <TouchableOpacity
        onPress={() => navigate('AddJournal')}
        activeOpacity={0.8}
        style={styles.plusIconContainer}>
        <Image source={Images.plus} style={styles.plusIcon} />
      </TouchableOpacity>
      {/* <ScrollView> */}
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        headerRight={<HeaderRight />}
      />
      {isSearchInputVisible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
            width: '100%',
            position: 'absolute',
            zIndex: 100000,
            top: 70,
            left: 0,
          }}>
          <TextInput
            placeholder="Enter your text here"
            value={inputText}
            onChangeText={value => setInoutText(value)}
            style={{
              backgroundColor: Colors.COUCH_BLUE,
              padding: 10,
              borderRadius: 16,
              width: '90%',
              color: 'white',
              fontSize: 16,
            }}
          />
        </View>
      )}

      <View
        style={{
          paddingVertical: hp(28),
          marginVertical: hp(10),
          borderRadius: hp(10),
          position: 'relative',
          marginTop: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(25),
          }}>
          <View>
            <Text
              style={
                style.headerText
              }>{`Hi ${authProfileDetails?.first_name}`}</Text>
            <Text style={style.subHeaderText}>What’s on your Mind?</Text>
          </View>
          <Image
            source={Images['tree-icon']}
            style={{
              width: 120,
              height: 165,
              resizeMode: 'contain',
              position: 'absolute',
              right: 10,
            }}
          />
        </View>

        <View style={{ overflow: 'hidden', top: 20 }}>
          <Image
            source={Images['eclipse-image']}
            style={{
              width: '100%',
              height: 30,
              resizeMode: 'cover',
              borderRadius: 100, // Set a large value for a semi-circle effect
            }}
          />
          {/* Overlay to hide the bottom part of the image */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 50, // Adjust this value to control the height of the semi-circle
              // backgroundColor: 'white', // Change the color as needed
            }}
          />
        </View>
      </View>
      <VirtualizedScrollView
        style={styles.bodyContainer}
        refreshing={isFetchingJournals}
        onRefresh={() => dispatch(fetchJournals(journals_current_page))}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.paginationButtonContainer}
            onPress={() => nextPage()}>
            <Text style={styles.paginationButtonText}>Load Next Journals</Text>
          </TouchableOpacity>
        }>
        <SectionList
          sections={groupJournalTransactions(filteredJournals)}
          ref={flatListRef}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id}
          extraData={selectedId}
          renderItem={({ item }) => {
            const { color, images, audioImages, bgcolor } = RenderBasedOnMood(
              item?.mood,
            );
            return (
              <Pressable
                onPress={() => {
                  setSelectedId(item.id);
                  setIsSearchInputVisible(false);
                  navigate('PreviewJournal', {
                    id: item?.id,
                    color: color,
                  });
                }}
                style={
                  item.id === selectedId
                    ? styles.itemMoodContainerTwo
                    : styles.itemMoodContainer
                }
                key={item?.id}>
                <View style={styles.journalHeaderContainer}>
                  <View style={styles.journalBodyHeaderContainer}>
                    <View
                      style={[
                        styles.voiceIconLengthContainer,
                        { backgroundColor: bgcolor },
                      ]}>
                      <View style={styles.voiceIconContainer}>
                        <Image
                          source={Images.voice}
                          resizeMode="contain"
                          style={[styles.voiceIcon, { tintColor: color }]}
                        />
                      </View>
                      <Text
                        style={[styles.voiceDurationText, { color: color }]}>
                        0:35
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.voiceIconLengthContainer,
                        { marginLeft: wp(12), backgroundColor: bgcolor },
                      ]}>
                      <View style={styles.voiceIconContainer}>
                        <Image
                          source={Images.frame}
                          resizeMode="contain"
                          style={[styles.voiceIcon, { tintColor: color }]}
                        />
                      </View>
                      <Text
                        style={[styles.voiceDurationText, { color: color }]}>
                        4
                      </Text>
                    </View>
                  </View>
                  <View style={styles.journalMoodIconContainer}>
                    <Image
                      source={{ uri: item?.mood?.icon_url }}
                      style={styles.moodIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.itemMoodBodyContainer}>
                  <Text style={styles.itemMoodMainText} numberOfLines={1}>
                    {item?.title}
                  </Text>
                  <Text style={styles.itemMoodText} numberOfLines={1}>
                    {item?.document}
                  </Text>
                  <Text style={styles.itemMoodBodyText}>
                    {moment(item?.updated_at).calendar()}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          renderSectionHeader={({ section: { title, isToday } }) => {
            return (
              <View style={styles.headerSectionContainer}>
                <Text style={styles.headerTitleStyle}>
                  {isToday === 'Today' ? 'Today' : title}
                </Text>
                {isToday === 'Today' ? (
                  <Pressable onPress={() => setShowCalender(true)}>
                    <Image
                      source={Images.filter}
                      style={styles.headerTitleImage}
                      resizeMode="contain"
                    />
                  </Pressable>
                ) : (
                  ''
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyMoodTrackerContainer}>
              <View style={styles.emptyMoodIconContainer}>
                <Image
                  source={Images.journal}
                  resizeMode="contain"
                  style={styles.emptyMoodIcon}
                />
              </View>
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyMainText}>
                  Not Notes in your Journal as for now
                </Text>
                <Text style={styles.emptyBodyText}>
                  Tap the '+' button below to log your mood on the mood tracker.
                </Text>
              </View>
            </View>
          }

          // onScrollToTop={PrevJournal}
        />
      </VirtualizedScrollView>
    </SafeAreaView>
  );
};

export default Journal;

const style = StyleSheet.create({
  headerTextContainer: {
    marginTop: hp(15),
    marginHorizontal: wp(22),
  },
  headerText: {
    color: Colors.WHITE,
    fontFamily: 'Sora-Medium',
    fontWeight: '400',
    fontSize: hp(20),
    lineHeight: hp(25),
  },
  subHeaderText: {
    paddingTop: hp(4),
    color: Colors.COUCH_TEXT_COLOR,
    fontFamily: 'Sora-Regular',
    fontSize: hp(14),
    lineHeight: hp(18),
  },
  iconImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  iconImageStyle: {
    width: wp(20),
    height: hp(20),
  },
});

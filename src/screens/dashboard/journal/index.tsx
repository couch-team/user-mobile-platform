import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  StyleSheet,
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

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Journal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Journal = ({ navigation: { goBack, navigate } }: Props) => {
  const [ selectedId, setSelectedId ] = useState(null);
  const [page, setPage] = useState(1);
  const flatListRef: any = useRef(null);
  const dispatch = useAppDispatch();

  const authProfileDetails = useSelector((state: RootState) => state.User);
  const {journals, isFetchingJournals, journals_current_page} = useSelector((state: RootState) => state.Journal);

  const nextPage = journals_current_page + 1
  const previousPage = journals_current_page - 1


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
      {/* <ScrollView> */}
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        headerRight={<HeaderRight />}
      />
      <HeaderText
        text="My Journal"
        hasSubText="Put your feelings and thought in writing"
      />
      <View
        style={{
          backgroundColor: Colors.COUCH_BLUE_800,
          paddingVertical: hp(28),
          paddingHorizontal: wp(14),
          marginHorizontal: wp(18),
          marginVertical: hp(14),
          borderRadius: hp(10),
        }}>
        <View>
          <Text
            style={
              style.headerText
            }>{`Hi ${authProfileDetails?.first_name}`}</Text>
          <View style={style.iconImageContainer}>
            <Image
              source={Images.info}
              resizeMode="contain"
              style={style.iconImageStyle}
            />
            <Text style={style.subHeaderText}>What’s on your Mind?</Text>
          </View>
        </View>
      </View>
      <VirtualizedScrollView
        style={styles.bodyContainer}
        refreshing={isFetchingJournals}
        onRefresh={() => console.log('load prev')}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.paginationButtonContainer}
            onPress={() => console.log('load more')}>
            <Text style={styles.paginationButtonText}>Load Next Journals</Text>
          </TouchableOpacity>
        }>
        <SectionList
          sections={groupJournalTransactions(journals)}
          ref={flatListRef}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id}
          extraData={selectedId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id);
                  navigate('PreviewJournal', { id: item?.id });
                }}
                style={
                  item.id === selectedId
                    ? styles.itemMoodContainerTwo
                    : styles.itemMoodContainer
                }
                key={item?.id}>
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
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({ section: { title, isToday } }) => {
            return (
              <View style={styles.headerSectionContainer}>
                <Text style={styles.headerTitleStyle}>
                  {isToday === 'Today' ? 'Today' : title}
                </Text>
                {isToday === 'Today' ? (
                  <Image
                    source={Images.filter}
                    style={styles.headerTitleImage}
                    resizeMode="contain"
                  />
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

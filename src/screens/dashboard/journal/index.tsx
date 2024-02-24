import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderText, HeaderBar, VirtualizedScrollView } from 'components';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { Images } from 'theme/config';
import { wp } from 'constants/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import moment from 'moment';
import { groupJournalTransactions } from 'utils';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Journal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Journal = ({ navigation: { goBack, navigate } }: Props) => {
  const [selectedId, setSelectedId] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const flatListRef: any = React.useRef(null);

  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile,
  );

  const {
    User: { getJournal, getJournalById },
  } = useDispatch();

  const journalLists = useSelector(
    (state: RootState) => state.User?.userJournal,
  );
  const totalPages = useSelector((state: RootState) => state.User.totalPages);
  // const isFetching = useSelector((state: RootState) => state.User.isFetching);
  const loading = useSelector(
    (state: RootState) => state.loading.effects.User.getJournal,
  );

  React.useEffect(() => {
    getJournal(page);
    if (selectedId !== null) {
      getJournalById(selectedId);
    }
    return () => {};
  }, [selectedId]);

  const NextJournal = () => {
    if (!loading && page <= totalPages) {
      const newPageNumber = page + 1;
      setPage(newPageNumber);
    }
  };

  const PrevJournal = () => {
    if (!loading) {
      const newPageNumber = page - 1;
      setPage(newPageNumber);
    }
  };

  const groupedJournals = groupJournalTransactions(journalLists);

  // const handleScrollToTop = () => {
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToIndex({ animated: true, index: 0 });
  //   }
  // };

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
      <HeaderText
        iconImage={Images.info}
        // bannerImage={Images.tree}
        text={`Hi ${authProfileDetails?.first_name}`}
        hasSubText="What’s on your Mind?"
      />
      {/* <Image
          source={Images['journal-frame']}
          resizeMode="contain"
          style={styles.journalFrameContainer}
        /> */}
      {/* {(() => {
          if (journalLists?.length === 0) {
            return (
             
            );
          }
        })()} */}
      <VirtualizedScrollView  refreshing={loading}
            onEndReachedThreshold={0.5}
            onRefresh={PrevJournal}
            onEndReached={NextJournal}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" color="white" /> : null
            }>
        <View style={styles.bodyContainer}>
          <SectionList
            sections={groupedJournals}
            ref={flatListRef}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={item => item.id}
            extraData={selectedId}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(item.id);
                    navigate('PreviewJournal', { selectedItem: item });
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
            // pagingEnabled

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
                    Tap the '+' button below to log your mood on the mood
                    tracker.
                  </Text>
                </View>
              </View>
            }
           
          />
        </View>
      </VirtualizedScrollView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Journal;

import React from 'react';
import { View, Text, TouchableOpacity, Image, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import HeaderText from 'components/base/header-text';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { Images } from 'theme/config';
import { journalList } from 'constants/data';
import VirtualizedScrollView from 'components/virtualized-list';
import { wp } from 'constants/layout';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Journal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Journal = ({ navigation: { goBack, navigate } }: Props) => {
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
        <HeaderText
          text="My Journal"
          hasSubText="Put your feelings and thoughts into writing..."
        />
        <Image
          source={Images['journal-frame']}
          resizeMode="contain"
          style={styles.journalFrameContainer}
        />
        {(() => {
          if (journalList.length === 0) {
            return (
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
            );
          }
        })()}
        <View style={styles.bodyContainer}>
          <SectionList
            sections={journalList}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.itemMoodContainer,
                    { backgroundColor: item.bg },
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
                    <Text style={styles.itemMoodBodyText}>{item.date}</Text>
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={styles.headerSectionContainer}>
                  <Text style={styles.headerTitleStyle}>{title}</Text>
                </View>
              );
            }}
          />
        </View>
      </VirtualizedScrollView>
    </SafeAreaView>
  );
};

export default Journal;

/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

import { HeaderBar } from 'components';
import { styles } from './style';
import moment from 'moment';
import { Colors, Images, Typography } from 'theme/config';
import SettingsModal from './components/SettingsModal';
import { DashboardParamList } from 'utils/types/navigation-types';
import DeleteModal from './components/DeleteModal';
import MoodViewModal from './components/MoodEditModal';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchJournals } from 'store/actions/journal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'PreviewJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const PreviewJournal = ({ route, navigation: { goBack, navigate } }: Props) => {
  const { id, color, mood_url, mood_title } = route.params;
  const [openSettingModal, setOpenSettingModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openMoodViewModal, setOpenMoodViewModal] = React.useState(false);
  const [isFetchingJournal, setIsFetchingJournal] = useState(false);
  const [isDeletingJournal, setIsDeletingJournal] = useState(false);
  const dispatch = useAppDispatch();
  const [journal, setJournal] = useState<any>();
  const [journalEntries, setJournalEntries] = useState<any>([]);
  const audioRef = useRef<any>();
  const [positions, setPositions] = useState<any>([]);
  const [durations, setDurations] = useState<any>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const fetchJournal = async () => {
    try {
      setIsFetchingJournal(true);
      const response = await $api.fetch(`/api/journal/log/${id}/`);
      if ($api.isSuccessful(response)) {
        setJournal(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingJournal(false);
    }
  };

  useEffect(() => {
    fetchJournal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!openDeleteModal) {
      dispatch(fetchJournals(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDeleteModal]);

  useEffect(() => {
    if (journal) {
      const entries = [];

      // Add text entry
      entries.push({
        type: 'text',
        content: journal.document, // Assuming 'document' is the text content
        id: Date.now(), // Unique identifier (timestamp)
        isEditing: true,
      });

      // Add mood entry
      entries.push({
        type: 'mood',
        icon_url: journal.mood.icon_url,
        title: journal.mood.title,
        // You can include other mood-related fields if needed
      });

      // Add audio and image entries with index
      let audioIndex = 0;
      for (const upload of journal.uploads) {
        if (upload.type.startsWith('audio/')) {
          entries.push({
            type: 'audio',
            content: upload.upload_url,
            index: audioIndex,
          });
          loadAudios(upload.upload_url, audioIndex);
          audioIndex++;
        } else if (upload.type.startsWith('image/')) {
          entries.push({
            type: 'image',
            content: upload.upload_url,
          });
        }
      }

      setJournalEntries(entries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal]);

  const loadAudios = async (uri: any, index: number) => {
    try {
      setContentLoading(true);
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: false },
        status => onPlaybackStatusUpdate(status, index),
      );

      if (!audioRef.current) {
        audioRef.current = [];
      }
      audioRef.current[index] = sound;
    } catch (error) {
      console.error('Error loading audio:', error);
    }
    setContentLoading(false);
  };

  const onPlaybackStatusUpdate = async (status: any, index: number) => {
    if (status.isLoaded && !isSeeking) {
      const duration = status.durationMillis / 1000;
      setDurations((prevDurations: any) => {
        const newDurations: any = [...prevDurations];
        newDurations[index] = duration;
        return newDurations;
      });
      setPositions((prevPositions: any) => {
        const newPositions: any = [...prevPositions];
        newPositions[index] = status.positionMillis / 1000;
        return newPositions;
      });
    }
    if (status.didJustFinish) {
      await audioRef.current[index].stopAsync();
      setIsPlaying(false);
      setPositions((prevPositions: any) => {
        const newPositions: any = [...prevPositions];
        newPositions[index] = 0;
        return newPositions;
      });
    }
  };

  const images = React.useMemo(() => {
    switch (mood_title) {
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
  }, [mood_title]);

  const handleSeek = async (value: number, index: number) => {
    const sound = audioRef.current[index];

    if (sound) {
      try {
        await sound.setPositionAsync(value * durations[index] * 1000);
        setPositions((prevPositions: any) => {
          const newPositions: any = [...prevPositions];
          newPositions[index] = value * durations[index];
          return newPositions;
        });
      } catch (error) {
        console.error('Error seeking audio:', error);
      }
    }
  };

  const playPauseAsync = async (index: number) => {
    const sound = audioRef.current[index];
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
          setIsSeeking(false);
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error playing/pausing audio:', error);
      }
    }
  };

  const formatTime = (time: number, index: number) => {
    if (durations[index] > 0) {
      const remainingTime = durations[index] - time;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = Math.floor(remainingTime % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return '0:00';
    }
  };

  const deleteJournal = async () => {
    try {
      setIsDeletingJournal(true);
      const response = await $api.delete(`/api/journal/log/${id}/`);
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Journal deleted successfully',
        });
        setOpenDeleteModal(false);
        setOpenSettingModal(false);
        dispatch(fetchJournals(1));
        navigate('Journal');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeletingJournal(false);
    }
  };

  const renderItem = (item: any, index: number) => {
    if (item.type === 'text' && item.isEditing) {
      return (
        <KeyboardAvoidingView
          key={index}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}>
          <TextInput
            style={[
              {
                // paddingHorizontal: 5,
                marginVertical: 10,
                color: 'rgba(159, 152, 178, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              },
            ]}
            placeholder="Enter a new paragraph"
            placeholderTextColor={'white'}
            multiline
            value={item.content}
            returnKeyType="done"
            onChangeText={text => {
              const updatedEntries = [...journalEntries];
              updatedEntries[index].content = text;
              setJournalEntries(updatedEntries);
            }}
          />
        </KeyboardAvoidingView>
      );
    } else if (item.type === 'text') {
      return (
        <Text style={{ marginBottom: 10 }} key={index}>
          {item.content}
        </Text>
      );
    } else if (item.type === 'image') {
      return (
        <View style={{ position: 'relative', marginVertical: 10 }} key={index}>
          <Image
            source={{ uri: item.content }}
            style={{
              width: '100%',
              height: 227,
              resizeMode: 'cover',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Change Image Button */}
            <Pressable
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.24)',
                padding: 16,
                borderRadius: 64,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                Change Image
              </Text>
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              style={{
                backgroundColor: 'rgba(227, 228, 248, 0.16)',
                padding: 7,
                borderRadius: 64,
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              <Image
                source={Images['cancel-image']}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
        </View>
      );
    } else if (item.type === 'audio') {
      return (
        <View
          style={{
            position: 'relative',
            backgroundColor: 'rgba(238, 239, 251, 0.08)',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
          key={index}>
          <Pressable
            style={{
              padding: 5,
              borderRadius: 100,
              position: 'absolute',
              right: 10,
              top: 5,
              backgroundColor: 'rgba(208, 210, 244, 0.12)',
            }}>
            <Image
              source={Images['cancel-audio']}
              style={{
                width: 12,
                height: 12,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              // gap: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Pressable
                style={{
                  backgroundColor: 'rgba(234, 235, 250, 0.12)',
                  padding: 10,
                  borderRadius: 100,
                }}>
                <Image
                  source={images}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: color,
                  }}
                />
              </Pressable>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 100,
                }}
                disabled={contentLoading}
                onPress={() => playPauseAsync(item.index)}>
                {contentLoading ? (
                  <ActivityIndicator size={'small'} color={color} />
                ) : (
                  <Image
                    source={
                      isPlaying ? Images['pause-audio'] : Images['play-audio']
                    }
                    style={{
                      width: 19,
                      height: 24,
                      resizeMode: 'contain',
                      tintColor: color,
                    }}
                  />
                )}
              </Pressable>
            </View>
            <Slider
              style={{
                flex: 1,
                height: 40,
                backgroundColor: 'transparent',
              }}
              value={positions[item.index] / (durations[item.index] || 1)}
              onValueChange={value => handleSeek(value, item.index)}
              maximumValue={1}
              minimumValue={0}
              minimumTrackTintColor={color}
              maximumTrackTintColor={'#A2A5E9'}
              thumbTintColor={color}
              onSlidingStart={() => setIsSeeking(true)}
              onSlidingComplete={value => handleSeek(value, item.index)}
              step={0.01}
              disabled={contentLoading}
            />
            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {formatTime(positions[item.index], item.index)}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const HeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => !isFetchingJournal && setOpenMoodViewModal(true)}
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={{ uri: mood_url }}
            style={styles.headerRightMood}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => !isFetchingJournal && setOpenSettingModal(true)}
          activeOpacity={0.6}
          style={[styles.headerRightIconContainer]}>
          <Image
            source={Images.more}
            resizeMode="contain"
            style={[styles.headerRightIcon, { tintColor: color }]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const formattedDate = moment(journal?.updated_at).calendar();
  const containerWidth = formattedDate.length * 8;
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        headerRight={<HeaderRight />}
        tintColor={color}
      />

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>{journal?.title}</Text>
        <View
          style={[styles.previewButtonContainer, { width: containerWidth }]}>
          <Text style={[styles.previewButtonText, { color: color }]}>
            Updated: {moment(journal?.updated_at).calendar()}
          </Text>
        </View>

        {isFetchingJournal && (
          <ActivityIndicator
            color={Colors.WHITE}
            size={'large'}
            style={{ alignItems: 'center' }}
          />
        )}
        <View style={styles.previewDocument}>
          <ScrollView
            // ref={scrollView => {
            //   this.scrollView = scrollView;
            // }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // onContentSizeChange={() => {
            //   this.scrollView.scrollToEnd({ animated: true });
            // }}
          >
            {journalEntries?.map((journ: any, index: number) =>
              renderItem(journ, index),
            )}
          </ScrollView>
        </View>
      </View>

      <SettingsModal
        onPressEdit={() =>
          navigate('EditJournal', { journal: journal, color: color })
        }
        onPressDelete={() => setOpenDeleteModal(true)}
        isVisible={openSettingModal}
        onClose={() => setOpenSettingModal(false)}
      />
      <DeleteModal
        isVisible={openDeleteModal}
        onPressDeleteNo={() => setOpenDeleteModal(false)}
        onPressDeleteYes={() => deleteJournal()}
        onClose={() => setOpenDeleteModal(false)}
        loading={isDeletingJournal}
      />

      <MoodViewModal
        //  onPressEditMood={() => navigate('EditJournal', { selectedItem })}
        //  onPressViewMood={handleDeleteModal}
        isVisible={openMoodViewModal}
        onClose={() => setOpenMoodViewModal(false)}
      />
    </SafeAreaView>
  );
};

export default PreviewJournal;

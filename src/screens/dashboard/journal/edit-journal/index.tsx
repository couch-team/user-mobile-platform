/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { HeaderBar } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './style';
import { RightHeader } from '../add-journal/components';

import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, Images, Typography } from 'theme/config';
import { useSelector } from 'react-redux';
import { $api } from 'services';
import {
  JournalType,
  fetchJournals,
  setJournals,
} from 'store/slice/journalSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import { RootState } from 'store';
import { MoodColors } from 'theme/config/colors';
import MoodModal from '../add-journal/components/MoodListContainer';
import VoiceModal from '../add-journal/components/VoiceModel';
import { showMessage } from 'react-native-flash-message';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'EditJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const EditJournal = ({ route, navigation: { navigate } }: Props) => {
  const { journal } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { journals } = useSelector((state: RootState) => state.Journal);
  const [journalEntries, setJournalEntries] = useState<any>([]);
  const audioRef = useRef<any>();
  const [positions, setPositions] = useState<any>([]);
  const [durations, setDurations] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [openVoiceModal, setOpenVoiceModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodType, setMoodType] = useState('');
  const [moodId, setMoodId] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showToolBar, setShowToolBar] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState<number | null | any>(
    null,
  );
  const flatListRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePressIn = () => {
    const timeoutId = setTimeout(() => {
      // Your function to execute after 3 seconds
      setShowToolBar(true);
    }, 2000);

    setLongPressTimeout(timeoutId);
  };

  const handlePressOut = () => {
    if (longPressTimeout !== null) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const dispatch = useAppDispatch();

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
          // console.log(audioIndex, 'audioIndex');
        } else if (upload.type.startsWith('image/')) {
          entries.push({
            type: 'image',
            content: upload.upload_url,
          });
        }
      }

      setJournalEntries(entries);
      setTitle(journal.title);
      setSelectedMood(journal.mood.icon_url);
    }
  }, [journal]);

  const loadAudios = async (uri: any, index: number) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: false },
        status => onPlaybackStatusUpdate(status, index),
      );

      if (!audioRef.current) {
        audioRef.current = [];
      }
      audioRef.current[index] = sound;
      console.log(index, 'audioIndex audios');

      // Remove the duplicate addition of audio entries in journalEntries
      // Instead, just update the positions and durations arrays
      // setPositions(prevPositions => {
      //   const newPositions = [...prevPositions];
      //   newPositions[index] = 0; // Initialize position to 0
      //   return newPositions;
      // });
      // // console.log(positions, 'sound');

      // if (sound) {
      //   setDurations(prevDurations => {
      //     const newDurations = [...prevDurations];
      //     newDurations[index] =
      //       audioRef.current[index]._lastStatusUpdate?.durationMillis; // Get audio duration
      //     return newDurations;
      //   });
      // }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  // console.log(audioRef.current, 'audioRef.current');

  // console.log(journalEntries, 'Journal Entry');

  const editJournalFile = async () => {
    try {
      console.log('reached');
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('title', title || journal?.title);
      // formdata.append('document', description || journal?.document);
      const textEntriesContent = journalEntries
        .filter((entry: any) => entry.type === 'text')
        .map((entry: any) => entry.content)
        .join('\n'); // You can use a separator that suits your needs

      formdata.append('document', textEntriesContent);

      const getFileType = (fileName: any) => {
        const extension = fileName.split('.').pop().toLowerCase();
        const extensionToMIME: any = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          // Add more extensions and corresponding MIME types as needed
          '3gp': 'audio/3gp',
          mp3: 'audio/mp3',
          // Add more audio extensions and corresponding MIME types as needed
        };

        return extensionToMIME[extension] || '';
      };
      const uploadsEntries = journalEntries
        .filter(
          (entry: any) => entry.type === 'image' || entry.type === 'audio',
        )
        .map((entry: any) => {
          const fileName = entry.content.split('/').pop();
          const fileType = getFileType(fileName);

          return {
            uri: entry.content, // Adjust field name
            type: fileType,
            name: fileName,
          };
        });

      for (let i = 0; i < uploadsEntries.length; i++) {
        formdata.append('uploads', uploadsEntries[i]);
      }
      const id = journal?.id;
      console.log(formdata, 'FormData');
      const response = await $api.update(
        `/api/journal/log/${id}/`,
        formdata,
        true,
      );
      if ($api.isSuccessful(response)) {
        const { data }: { data: JournalType } = response;
        dispatch(
          setJournals(
            journals.map(journalss => (journalss.id === id ? data : journalss)),
          ),
        );
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Journal updated successfully',
        });
        navigate('Journal');
        dispatch(fetchJournals(1));
      }
    } catch (error) {
      console.log(error);
    }
    console.log('finally');
    setIsLoading(false);
  };

  const addTextEntry = () => {
    const newEntry = {
      type: 'text',
      content: '',
      id: Date.now(),
      isEditing: true,
    };

    setJournalEntries([...journalEntries, newEntry]);
  };

  const addImageEntry = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setJournalEntries([
          ...journalEntries,
          { type: 'image', content: result.assets[0].uri },
        ]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

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
        return Colors.COUCH_BLUE;
    }
  }, [selectedMood]);

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
  }, [selectedMood]);

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
  }, [selectedMood]);

  const renderMood = React.useCallback(() => {
    const image = selectedMood;

    return image ? (
      <View style={[styles.moodView]}>
        <Image source={{ uri: image }} style={styles.mood} />
      </View>
    ) : null;
  }, [selectedMood, color]);

  const handleMoodModal = (iconUrl: any, titles: string, ids: string) => {
    setSelectedMood(iconUrl);
    setModalVisible(true);
    setMoodType(titles);
    setMoodId(ids);
  };

  const onPlaybackStatusUpdate = async (status: any, index: number) => {
    if (status.isLoaded && !isSeeking) {
      console.log(status, 'status');
      const duration = status.durationMillis / 1000;
      setDurations((prevDurations: any) => {
        const newDurations: any = [...prevDurations];
        newDurations[index] = duration;

        console.log(newDurations, 'new duration');
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

  const handleSeek = async (value: number, index: number) => {
    const sound = audioRef.current[index];

    console.log(sound, 'sound');

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

  const loadAudio = async (uri: any, index: number) => {
    try {
      // console.log(uri);i
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: false },
        status => onPlaybackStatusUpdate(status, index),
      );

      if (!audioRef.current) {
        audioRef.current = [];
      }
      console.log(sound, 'sound');
      audioRef.current[index] = sound;
      setJournalEntries((prevEntries: any) => [
        ...prevEntries,
        { type: 'audio', content: uri, index: index },
      ]);

      // if (sound && sound.getStatusAsync) {
      //   const status = await sound.getStatusAsync();
      //   if (status && status.durationMillis) {
      //     setDurations(prevDurations => {
      //       const newDurations = [...prevDurations];
      //       newDurations[index] = status.durationMillis / 1000; // Convert to seconds
      //       return newDurations;
      //     });
      //   }
      // }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  console.log(journalEntries, 'journalEntries');

  const handleRemoveImage = (index: number) => {
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  const handleRemoveAudio = (index: number) => {
    console.log(index, 'remove audio');
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  const handleChangeImage = async (item: any, index: number) => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        // User selected a new image
        const updatedEntries = [...journalEntries];
        updatedEntries[index] = {
          type: 'image',
          content: result.assets[0].uri,
        };
        setJournalEntries(updatedEntries);
      }
    } catch (error) {
      console.error('Error picking image:', error);
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
    console.log(time, 'time');
    if (durations[index] > 0) {
      const remainingTime = durations[index] - time;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = Math.floor(remainingTime % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return '0:00';
    }
  };

  const renderItem = ({ item, index }: any) => {
    if (item.type === 'text' && item.isEditing) {
      return (
        // <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0}>
        <TextInput
          style={{ padding: 8, marginBottom: 20, color: 'white' }}
          placeholder="Enter a new paragraph"
          placeholderTextColor={'white'}
          multiline
          value={item.content}
          autoFocus={isFocused}
          returnKeyType="done"
          onChangeText={text => {
            const updatedEntries = [...journalEntries];
            updatedEntries[index].content = text;
            setJournalEntries(updatedEntries);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsKeyboardVisible(false);
            setIsFocused(false);
            if (!item.content.trim()) {
              // Remove the entry if it's empty
              const updatedEntries = [...journalEntries];
              updatedEntries.splice(index, 1);
              setJournalEntries(updatedEntries);
            }
          }}
          editable={showToolBar}
        />
        // </KeyboardAvoidingView>
      );
    } else if (item.type === 'text') {
      return <Text style={{ marginBottom: 10 }}>{item.content}</Text>;
    } else if (item.type === 'image') {
      return (
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: item.content }}
            style={{
              width: '100%',
              height: 227,
              marginBottom: 10,
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
              }}
              onPress={() => handleChangeImage(item, index)}
              disabled={!showToolBar}>
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
              }}
              onPress={() => handleRemoveImage(index)}
              disabled={!showToolBar}>
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
          }}>
          <Pressable
            style={{
              padding: 5,
              borderRadius: 100,
              position: 'absolute',
              right: 10,
              top: 5,
              backgroundColor: 'rgba(208, 210, 244, 0.12)',
            }}
            onPress={() => handleRemoveAudio(index)}
            disabled={!showToolBar}>
            <Image
              source={Images['cancel-audio']}
              style={{ width: 12, height: 12, resizeMode: 'contain' }}
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
                onPress={() => playPauseAsync(item.index)}>
                <Image
                  source={
                    audioImages
                      ? audioImages
                      : isPlaying
                      ? Images['pause-audio']
                      : Images['play-audio']
                  }
                  style={{
                    width: 19,
                    height: 24,
                    resizeMode: 'contain',
                    tintColor: color,
                  }}
                />
              </Pressable>
            </View>
            <Slider
              style={{
                flex: 1,
                height: 40,
                backgroundColor: 'transparent',
              }}
              value={positions[index] / (durations[index] || 1)}
              onValueChange={value => handleSeek(value, item.index)}
              maximumValue={1}
              minimumValue={0}
              minimumTrackTintColor={color}
              maximumTrackTintColor={'#A2A5E9'}
              thumbTintColor={color}
              onSlidingStart={() => setIsSeeking(true)}
              onSlidingComplete={value => handleSeek(value, item.index)}
              step={0.01}
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerLeft={renderMood()}
        headerRight={
          <RightHeader
            activeColor={color}
            loading={isLoading}
            pressConfirmButton={() => editJournalFile()}
            pressCloseButton={() => navigate('Journal')}
            disabled={!title || journalEntries.length === 0}
          />
        }
      />

      <View style={styles.noteOptionBodyContainer}>
        <TextInput
          placeholder="Title you Note..."
          editable={showToolBar}
          // defaultValue={selectedItem?.title || title}
          value={title}
          placeholderTextColor={Colors.COUCH_GREEN_400}
          style={styles.titleTextStyle}
          onChangeText={(text: string) => setTitle(text)}
        />

        <View
          style={{
            flex: 1,
            // paddingTop: 20,
            paddingHorizontal: 20,
          }}>
          <FlatList
            ref={flatListRef}
            data={journalEntries}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => {
              // console.log(w, h);
              if (isKeyboardVisible) {
                flatListRef.current.scrollToEnd({ animated: true });
              }
            }}
            showsVerticalScrollIndicator={true}
            getItemLayout={(data, index) => ({
              length: 20,
              offset: 20 * index,
              index,
            })}
            style={{ flex: 1 }}
            // style={{ padding: 20, paddingBottom: isKeyboardVisible ? 10 : 0 }}
          />
        </View>

        {/* <ScrollView>
          <View style={styles.noteBodyContainer}>
            <Text style={{ color: 'rgba(227, 228, 248, 1)', fontSize: 16 }}>
              {journal?.document}
            </Text>
          </View>
        </ScrollView> */}
      </View>

      {showToolBar ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 0,
            gap: 10,
            left: 0,
            right: 0,
            marginBottom: 20,
            marginTop: 10,
            backgroundColor: 'rgba(15, 17, 65, 1)',
            padding: 16,
            borderRadius: 64,
            marginHorizontal: 25,
          }}>
          <Pressable
            style={{
              backgroundColor: 'rgba(234, 235, 250, 0.12)',
              padding: 10,
              borderRadius: 100,
            }}
            onPress={addTextEntry}>
            <Image
              source={Images['active-note-text']}
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
              backgroundColor: 'rgba(234, 235, 250, 0.12)',
              padding: 10,
              borderRadius: 100,
            }}>
            <Image
              source={Images['note-video']}
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
              backgroundColor: 'rgba(234, 235, 250, 0.12)',
              padding: 10,
              borderRadius: 100,
            }}
            onPress={addImageEntry}>
            <Image
              source={Images['note-image']}
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
              backgroundColor: 'rgba(234, 235, 250, 0.12)',
              padding: 10,
              borderRadius: 100,
            }}
            disabled={isPlaying}
            onPress={() => setOpenVoiceModal(true)}>
            <Image
              source={Images['note-voice']}
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
              backgroundColor: 'rgba(234, 235, 250, 0.12)',
              padding: 10,
              borderRadius: 100,
            }}
            disabled={isPlaying}
            onPress={() => setModalVisible(true)}>
            <Image
              source={Images['smile-2']}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{
            backgroundColor: 'rgba(243, 243, 252, 0.08)',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 256,
            marginHorizontal: 30,
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            gap: 10,
            left: 0,
            right: 0,
            marginBottom: 20,
            marginTop: 10,
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <Text style={{ color: 'white' }}>Press and Hold to Edit Note</Text>
        </Pressable>
      )}

      <MoodModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectMood={handleMoodModal}
        setMoodType={setMoodType}
      />

      <VoiceModal
        isVisible={openVoiceModal}
        onClose={() => setOpenVoiceModal(false)}
        loadAudio={loadAudio}
        journalEntries={journalEntries}
      />
    </SafeAreaView>
  );
};

export default EditJournal;

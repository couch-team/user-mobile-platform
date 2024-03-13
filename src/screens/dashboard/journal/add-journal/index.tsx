/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { HeaderBar } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Keyboard,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './style';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteOption, RightHeader } from './components';

import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

import { Colors, Images, Typography } from 'theme/config';
import MoodModal from './components/MoodListContainer';
import VoiceModal from './components/VoiceModel';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { showMessage } from 'react-native-flash-message';
import { MoodColors } from 'theme/config/colors';
import { debounce } from 'lodash';
import { fetchJournals } from 'store/actions/journal';
// import { showMessage } from 'react-native-flash-message';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'AddJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddJournal = ({ navigation: { goBack } }: Props) => {
  const [title, setTitle] = useState('');
  const [openVoiceModal, setOpenVoiceModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [moodType, setMoodType] = useState('');
  const [moodId, setMoodId] = useState('');

  const [journalEntries, setJournalEntries] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const [positions, setPositions] = useState([]);
  const [durations, setDurations] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const audioRef = useRef<any>([]);
  const flatListRef = useRef<any>();

  const createJournal = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log(data, 'Form Data');
      const response = await $api.post('/api/journal/log/', data, true);
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Journal created successfully',
        });
        dispatch(fetchJournals(1));
        goBack();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createJournalFile = React.useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);

      // Append text entries directly to 'document' field
      const textEntriesContent = journalEntries
        .filter((entry: any) => entry.type === 'text')
        .map((entry: any) => entry.content)
        .join('\n'); // You can use a separator that suits your needs

      formData.append('document', textEntriesContent);

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

          // return fileName;
          return {
            uri: entry.content, // Adjust field name
            type: fileType,
            name: fileName,
          };
        });

      for (let i = 0; i < uploadsEntries.length; i++) {
        formData.append('uploads', uploadsEntries[i]);
      }

      if (moodId) {
        formData.append('mood_id', moodId);
      }

      await createJournal(formData);
    } catch (error) {
      console.error('Error creating journal:', error);
      // Handle error appropriately (e.g., show error message)
    }
  }, [title, journalEntries, moodId]);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flatListRef.current.scrollToEnd({ animated: true });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [flatListRef.current]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (isKeyboardVisible && isFocused) {
          // The keyboard is fully hidden, and the TextInput is still focused
          // Add any additional conditions as needed
          setIsKeyboardVisible(false);
          setIsFocused(false);
          if (!journalEntries[journalEntries.length - 1].content.trim()) {
            // Remove the entry if it's empty
            const updatedEntries = [...journalEntries];
            updatedEntries.pop(); // Remove the last entry
            setJournalEntries(updatedEntries);
          }
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isKeyboardVisible, isFocused, journalEntries]);

  const onPlaybackStatusUpdate = async (status: any, index: number) => {
    if (status.isLoaded && !isSeeking) {
      const duration = status.durationMillis / 1000;
      setDurations(prevDurations => {
        const newDurations: any = [...prevDurations];
        newDurations[index] = duration;
        return newDurations;
      });
      setPositions(prevPositions => {
        const newPositions: any = [...prevPositions];
        newPositions[index] = status.positionMillis / 1000;
        return newPositions;
      });
    }
    if (status.didJustFinish) {
      await audioRef.current[index].stopAsync();
      setIsPlaying(false);
      setPositions(prevPositions => {
        const newPositions: any = [...prevPositions];
        newPositions[index] = 0;
        return newPositions;
      });
    }
  };

  const handleSeek = async (value: number, index: number) => {
    const sound = audioRef.current[index];

    if (sound) {
      try {
        await sound.setPositionAsync(value * durations[index] * 1000);
        setPositions(prevPositions => {
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
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: false },
        status => onPlaybackStatusUpdate(status, index),
      );

      audioRef.current[index] = sound;
      setJournalEntries((prevEntries: any) => [
        ...prevEntries,
        { type: 'audio', content: uri, index: index },
      ]);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  // const totalTextCharacters = journalEntries
  //   .filter((entry: any) => entry.type === 'text')
  //   .reduce((total: any, entry: any) => total + entry.content.length, 0);

  // // Check if adding a new text entry would exceed the limit
  // if (totalTextCharacters + newEntry.content.length <= 200) {
  //   // Find the index of the last text entry
  //   const lastTextEntryIndex = journalEntries
  //     .slice()
  //     .reverse()
  //     .findIndex((entry: any) => entry.type === 'text');

  //   // Calculate the correct index for the new text entry
  //   const newIndex =
  //     lastTextEntryIndex >= 0
  //       ? journalEntries.length - lastTextEntryIndex
  //       : 0;

  //   // Add the new text entry at the calculated index
  //   setJournalEntries((prevEntries: any) => [
  //     ...prevEntries.slice(0, newIndex),
  //     newEntry,
  //     ...prevEntries.slice(newIndex),
  //   ]);
  const addTextEntry = () => {
    const newEntry = {
      type: 'text',
      content: '',
      id: Date.now(), // Unique identifier (timestamp)
      isEditing: true,
    };

    setJournalEntries([...journalEntries, newEntry]);

    if (!isKeyboardVisible) {
      flatListRef.current.scrollToEnd({ animated: true });
    }

    setIsKeyboardVisible(true);
    setIsFocused(true);
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
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  const handleRemoveAudio = (index: number) => {
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  const handleChangeImage = async (item: any, index: number) => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync();
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
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
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
          />
        </KeyboardAvoidingView>
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
              onPress={() => handleChangeImage(item, index)}>
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
              onPress={() => handleRemoveImage(index)}>
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
            onPress={() => handleRemoveAudio(index)}>
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
                onPress={() => playPauseAsync(index)}>
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
              onValueChange={value => handleSeek(value, index)}
              maximumValue={1}
              minimumValue={0}
              minimumTrackTintColor={color}
              maximumTrackTintColor={'#A2A5E9'}
              thumbTintColor={color}
              onSlidingStart={() => setIsSeeking(true)}
              onSlidingComplete={value => handleSeek(value, index)}
              step={0.01}
            />
            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {formatTime(positions[index], index)}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      style={styles.container}>
      <HeaderBar
        headerLeft={renderMood()}
        headerRight={
          <RightHeader
            loading={isLoading}
            activeColor={color}
            pressConfirmButton={() => createJournalFile()}
            pressCloseButton={() => goBack()}
            disabled={!title || journalEntries.length === 0}
          />
        }
      />

      <TextInput
        placeholder="Title you note..."
        value={title}
        placeholderTextColor={Colors.COUCH_GREEN_400}
        style={styles.titleTextStyle}
        onChangeText={(text: string) => setTitle(text)}
      />

      <View style={styles.noteOptionBodyContainer}>
        <View
          // behavior={undefined}
          // keyboardVerticalOffset={100}
          style={{
            flex: 1,
            paddingTop: 20,
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
            // style={{ padding: 20, paddingBottom: isKeyboardVisible ? 10 : 0 }}
          />
        </View>
        {!isFocused && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // position: 'absolute',
              bottom: 0,
              gap: 10,
              left: 0,
              right: 0,
              marginBottom: 10,
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
            {/* <Button title="Add Text" onPress={addTextEntry} /> */}
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
        )}
      </View>
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
    </View>
  );
};

export default AddJournal;

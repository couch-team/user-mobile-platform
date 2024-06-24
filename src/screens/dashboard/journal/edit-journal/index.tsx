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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
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
import { JournalType, setJournals } from 'store/slice/journalSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import { RootState } from 'store';
import { MoodColors } from 'theme/config/colors';
import MoodModal from '../add-journal/components/MoodListContainer';
import VoiceModal from '../add-journal/components/VoiceModel';
import { showMessage } from 'react-native-flash-message';
import { fetchJournals } from 'store/actions/journal';
import JournalPromptModal from '../add-journal/components/JournalPrompt';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ImageSlideShow from './ImageSlideShow';

type DashboardNavigationProps = NativeStackNavigationProp<
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
  const [isLoading, setIsLoading] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(0);
  const [contentLoading, setContentLoading] = useState(false);
  const [openJournalPrompt, setOpenJournalPrompt] = useState(false);
  const [showPreviewImage, setShowPreviesImage] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setCurrentIndex(index);
    setShowPreviesImage(true);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setBottomMargin(50);
        setIsFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [journalEntries, isKeyboardVisible]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (isKeyboardVisible) {
          // The keyboard is fully hidden, and the TextInput is still focused
          // Add any additional conditions as needed
          setIsKeyboardVisible(false);
          setIsFocused(true);
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
  }, [isKeyboardVisible, journalEntries]);

  useEffect(() => {
    if (journal) {
      const entries = [];
      const previewImagesArray = [];

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
        id: journal.mood.id,
        // You can include other mood-related fields if needed
      });

      // Add audio and image entries with index
      let audioIndex = 0;
      for (const upload of journal.uploads) {
        if (
          upload.type.startsWith('audio/') ||
          upload.type.startsWith('application/')
        ) {
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
          previewImagesArray.push(upload.upload_url);
        }
      }

      setJournalEntries(entries);
      setTitle(journal.title);
      setSelectedMood(journal.mood.icon_url);
      setMoodId(journal.mood.id);
      setMoodType(journal.mood.title);
      setPreviewImages(previewImagesArray);
    }
    setIsFocused(false);
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

  useEffect(() => {
    const removeEmptyTextEntries = () => {
      for (let i = 1; i < journalEntries.length; i++) {
        const entry = journalEntries[i];
        if (entry.type === 'text' && entry.content.trim() === '') {
          journalEntries.splice(i, 1);
          i--;
        }
      }
    };

    const lastEntryType =
      journalEntries.length > 0
        ? journalEntries[journalEntries.length - 1].type
        : '';

    if (lastEntryType === 'image' || lastEntryType === 'audio') {
      removeEmptyTextEntries();
    }

    if (lastEntryType === 'image' || lastEntryType === 'audio') {
      addTextEntry();
    }
  }, [journalEntries]);

  const editJournalFile = async () => {
    try {
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

      if (moodId) {
        formdata.append('mood_id', moodId);
      }
      const id = journal?.id;

      const response = await $api.patch(
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
    // setShowToolBar(false);
    // setIsKeyboardVisible(true);
    // setIsFocused(true);
  };

  const addImageEntry = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        // aspect: [4, 3],
        quality: 0.4,
      });
      if (!result.canceled) {
        setJournalEntries([
          ...journalEntries,
          { type: 'image', content: result.assets[0].uri },
        ]);
        setPreviewImages([...previewImages, result.assets[0].uri]);
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
        return MoodColors.CALM;
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

  const loadAudio = async (uri: any, index: number) => {
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
      setJournalEntries((prevEntries: any) => [
        ...prevEntries,
        { type: 'audio', content: uri, index: index },
      ]);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const handleRemoveImage = (index: number, item: any) => {
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);

    const imageIndex = previewImages.findIndex(image => image === item.content);
    // Remove the image from previewImages
    if (imageIndex !== -1) {
      const updatedPreviewImages = [...previewImages];
      updatedPreviewImages.splice(imageIndex, 1);
      setPreviewImages(updatedPreviewImages);
    }
  };

  const handleRemoveAudio = (index: number) => {
    const updatedEntries: any = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  const handleChangeImage = async (item: any, index: number) => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.4,
      });
      if (!result.canceled) {
        // User selected a new image
        const updatedEntries = [...journalEntries];
        const updatedPreviewImages = [...previewImages];

        const imageIndex = previewImages.findIndex(
          image => image === item.content,
        );

        if (imageIndex !== -1) {
          // If the image already exists in previewImages, update it
          updatedPreviewImages[imageIndex] = result.assets[0].uri;
        }

        updatedEntries[index] = {
          type: 'image',
          content: result.assets[0].uri,
        };
        setJournalEntries(updatedEntries);
        setPreviewImages(updatedPreviewImages);
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
                marginVertical: 5,
                color: 'rgba(159, 152, 178, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              },
            ]}
            multiline
            value={item.content}
            // autoFocus={isFocused}
            returnKeyType="done"
            onChangeText={text => {
              const updatedEntries = [...journalEntries];
              updatedEntries[index].content = text;
              setJournalEntries(updatedEntries);
            }}
            onBlur={() => {
              setIsKeyboardVisible(false);
              // setIsFocused(false);
              if (!item.content.trim()) {
                // Remove the entry if it's empty
                const updatedEntries = [...journalEntries];
                updatedEntries.splice(index, 1);
                setJournalEntries(updatedEntries);
              }
            }}
            editable={showToolBar}
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
      const imageIndex = previewImages.findIndex(
        image => image === item.content,
      );
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
            <Pressable
              style={{
                backgroundColor: 'rgba(227, 228, 248, 0.16)',
                padding: 7,
                borderRadius: 64,
                position: 'absolute',
                left: 10,
                top: 10,
              }}
              onPress={() => handleImagePress(imageIndex)}>
              <Image
                source={Images['zoom-in']}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: '#E3E4F8',
                }}
              />
            </Pressable>
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
              onPress={() => handleRemoveImage(index, item)}
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
            }}
            onPress={() => handleRemoveAudio(index)}
            disabled={!showToolBar}>
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
              // thumbImage={require('../../../../assets/images/journal/slider-thumb-image.png')}
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      style={[styles.container, isKeyboardVisible && { paddingBottom: 40 }]}>
      <ImageSlideShow
        showPreviewImage={showPreviewImage}
        onClose={() => setShowPreviesImage(false)}
        currentIndex={currentIndex}
        previewImages={previewImages}
      />
      <JournalPromptModal
        isVisible={openJournalPrompt}
        onClose={() => setOpenJournalPrompt(false)}
      />
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
      <TextInput
        placeholder="Title you Note..."
        editable={showToolBar}
        // defaultValue={selectedItem?.title || title}
        value={title}
        placeholderTextColor={Colors.COUCH_GREEN_400}
        style={styles.titleTextStyle}
        onChangeText={(text: string) => setTitle(text)}
      />

      <View style={styles.noteOptionBodyContainer}>
        <View
          // behavior={undefined}
          // keyboardVerticalOffset={100}
          // onPress={addTextEntry}
          style={{
            flex: 1,
            // paddingTop: 20,
            paddingHorizontal: 20,
          }}>
          <ScrollView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // contentContainerStyle={{ flex: 1 }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            <View style={{ paddingBottom: !isFocused ? 0 : 100, flex: 1 }}>
              {journalEntries?.map((journ: any, index: number) =>
                renderItem(journ, index),
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      {showToolBar ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 30,
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
            onPress={() => setOpenJournalPrompt(true)}>
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
            }}
            onPress={addTextEntry}>
            <Image
              source={Images['note-text']}
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
            bottom: 30,
            gap: 10,
            left: 0,
            right: 0,
            marginBottom: 20,
            marginTop: 10,
          }}
          onPress={() => setShowToolBar(true)}>
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
    </KeyboardAvoidingView>
  );
};

export default EditJournal;

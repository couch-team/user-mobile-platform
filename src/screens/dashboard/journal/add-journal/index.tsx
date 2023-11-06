import { HeaderBar, SVGIcon } from 'components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import {
  AutoExpandingTextInput,
  NoteOption,
  NoteTakerOptionType,
  RightHeader,
} from './components';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, Images } from 'theme/config';
import ImagePicker from 'react-native-image-crop-picker';
import { deviceWidth } from 'constants/layout';
import MoodModal, { MoodType } from './components/MoodModal';
import VoiceModal, { AudioDataType } from './components/VoiceModal';
import { AudioPathIcon } from 'assets/svg/audio-path';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { JournalPayloadType } from 'redux/types';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'AddJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddJournal = ({ navigation: { goBack } }: Props) => {
  const {
    User: { getUserProfileData },
    Journal: { addJournal },
  } = useDispatch();
  const userProfile = useSelector((state: RootState) => state.User.userProfile);
  const [title, setTitle] = useState('');
  const [audioData, setAudioData] = useState<AudioDataType>();
  const [imageData, setImageData] = useState('');
  const [mood, setMood] = useState<MoodType>();
  const [openMoodModal, setOpenMoodModal] = useState(false);
  const [openVoiceModal, setOpenVoiceModal] = useState(false);
  const [noteTakerOption, setNoteTakerOption] = useState<NoteTakerOptionType[]>(
    [
      {
        id: Date.now() + Math.random() + '',
        type: 'text',
        value: '',
      },
    ],
  );

  useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const color = useMemo(() => {
    switch (mood) {
      case 'angry':
        return Colors.PEACHY_RED_200;
      case 'anxious':
        return Colors.GREEN;
      case 'calm':
        return Colors.COUCH_INFO_BLUE;
      case 'excited':
        return Colors.COUCH_BLUE;
      case 'happy':
        return Colors.YELLOW_100;
      case 'sad':
        return Colors.COUCH_GRAY;
      default:
        return Colors.COUCH_BLUE;
    }
  }, [mood]);

  const removeImage = useCallback(() => {
    setImageData('');
    setNoteTakerOption(state => {
      return state.filter(item => item.type !== 'image');
    });
  }, []);

  const hasImage = !!imageData;
  const selectImage = useCallback(() => {
    ImagePicker.openPicker({
      width: deviceWidth,
      height: deviceWidth * 0.6,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    })
      .then(response => {
        const image = `data:${response.mime};base64,${response.data}`;
        setImageData(image);
      })
      .catch(err => {
        console.log(err);
        if (hasImage) {
          return;
        }
        removeImage();
      });
  }, [hasImage, removeImage]);

  const addNoteTakerOption = useCallback(
    (item: NoteTakerOptionType) => {
      if (item.type === 'mood') {
        setOpenMoodModal(true);
        return;
      }

      if (item.type === 'voice') {
        setOpenVoiceModal(true);
      }

      if (item.type === 'image') {
        selectImage();
      }

      setNoteTakerOption(state => {
        let hasImageVoice = false;
        const newState = state.map(elem => {
          if (
            elem.type === item.type &&
            (item.type === 'voice' || item.type === 'image')
          ) {
            hasImageVoice = true;
          }
          return elem;
        });

        if (!hasImageVoice) {
          newState.push(item);
        }

        return newState;
      });
    },
    [selectImage],
  );

  const handleTextChange = useCallback((id: string, value: string) => {
    setNoteTakerOption(state => {
      return state.map(item => {
        if (item.id === id) {
          return { ...item, value };
        }

        return item;
      });
    });
  }, []);

  const renderMood = useCallback(() => {
    let image;
    switch (mood) {
      case 'angry':
        image = Images.mood_angry;
        break;
      case 'sad':
        image = Images.mood_sad;
        break;
      case 'anxious':
        image = Images.mood_anxious;
        break;
      case 'excited':
        image = Images.mood_excited;
        break;
      case 'calm':
        image = Images.mood_calm;
        break;
      case 'happy':
        image = Images.mood_happy;
        break;
    }

    return image ? (
      <View style={styles.moodView}>
        <Image source={image} style={styles.mood} />
      </View>
    ) : null;
  }, [mood]);

  const handleSubmit = useCallback(async () => {
    if (!title.length) {
      Alert.alert('Error', 'Enter your note');
      return;
    }

    const data: JournalPayloadType = {
      tags: [],
      audio_file: audioData?.data || null,
      notes: title,
      mood_emoji: mood as string,
      image: imageData || null,
      user: userProfile?.user,
    };

    await addJournal(data);
    goBack();
  }, [
    audioData?.data,
    imageData,
    mood,
    title,
    userProfile?.user,
    addJournal,
    goBack,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerLeft={renderMood()}
        headerRight={
          <RightHeader
            activeColor={color}
            pressConfirmButton={handleSubmit}
            pressCloseButton={() => goBack()}
          />
        }
      />
      <ScrollView>
        <View style={styles.noteOptionBodyContainer}>
          <TextInput
            placeholder="Title you Note..."
            value={title}
            placeholderTextColor={Colors.COUCH_GREEN_400}
            style={styles.titleTextStyle}
            onChangeText={(text: string) => setTitle(text)}
          />
          {noteTakerOption.map(option => (
            <View key={option.id} style={styles.noteBodyItem}>
              {option.type === 'image' && !!imageData && (
                <ImageBackground
                  source={{ uri: imageData }}
                  style={styles.image}>
                  <View style={styles.imageContent}>
                    <TouchableOpacity
                      onPress={() => removeImage()}
                      activeOpacity={0.9}
                      style={styles.closeIconContainer}>
                      <Image
                        source={Images.x}
                        resizeMode="contain"
                        style={styles.closeIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={selectImage}
                      style={styles.changeImageBtn}>
                      <Text style={styles.changeImageText}>Change Image</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              )}
              {option.type === 'text' && (
                <AutoExpandingTextInput
                  value={option.value}
                  onChangeText={text => handleTextChange(option.id, text)}
                />
              )}
              {option.type === 'voice' && !!audioData && (
                <View style={styles.audioView}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.smallCloseIconContainer}>
                    <Image
                      source={Images.x}
                      resizeMode="contain"
                      style={styles.smallCloseIcon}
                    />
                  </TouchableOpacity>
                  <View style={styles.audioContent}>
                    <View style={styles.voiceIconContainer}>
                      <Image
                        source={Images['note-voice']}
                        resizeMode="contain"
                        style={styles.voiceIcon}
                      />
                    </View>
                    <SVGIcon name="play" />
                    <AudioPathIcon color={color} />
                    <Text style={styles.audioDuration}>
                      {audioData.duration}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <NoteOption addNoteTaker={addNoteTakerOption} activeColor={color} />
      <MoodModal
        selectedMood={mood}
        isVisible={openMoodModal}
        onClose={newMood => {
          setOpenMoodModal(false);
          if (newMood) {
            setMood(newMood);
          }
        }}
      />
      <VoiceModal
        isVisible={openVoiceModal}
        onClose={() => setOpenVoiceModal(false)}
        addAudio={setAudioData}
      />
    </SafeAreaView>
  );
};

export default AddJournal;

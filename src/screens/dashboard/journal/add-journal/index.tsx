/* eslint-disable react-hooks/exhaustive-deps */
import { HeaderBar } from 'components';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteOption, RightHeader } from './components';

import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { Colors, Images } from 'theme/config';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { hp, wp } from 'constants/layout';
import MoodModal from './components/MoodListContainer';
import VoiceModal from './components/VoiceModel';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { showMessage } from 'react-native-flash-message';
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
  const [description, setDescription] = useState('');
  const [recordingAudio, setRecordingAudio] = useState();
  const [mood, setMood] = useState<any>();
  const richText = React.useRef<any>();
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [openVoiceModal, setOpenVoiceModal] = useState(false);
  const [height, setHeight] = useState(600);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const contentStyle = {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    placeholderColor: 'gray',
    contentCSSText: 'font-size: 16px; height: 100%;',
  };

  const createJournal = async (data: FormData) => {
    try {
      setIsLoading(true);
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

  const pickImageAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permission to upload images.',
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImages = result.assets.map(asset => {
          const localUri = asset.uri;
          const filename: any = localUri.split('/').pop();
          const base64 = asset.base64;

          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image';
          richText.current?.insertImage(
            `data:image/jpg;base64,${base64}`,
            'background:white;',
          );
          return { uri: localUri, type, name: filename };
        });

        setSelectedImage((prevSelectedImages: any) => [
          ...prevSelectedImages,
          ...selectedImages,
        ]);
      }
    }
  };
  const createJournalFile = React.useCallback(async () => {
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('document', description);
    for (let i = 0; i < selectedImage.length; i++) {
      formdata.append('uploads', selectedImage[i]);
    }
    formdata.append('uploads', recordingAudio);
    // eslint-disable-next-line no-lone-blocks
    {
      mood === undefined ? null : formdata.append('mood_id', mood?.id);
    }

    await createJournal(formdata);
  }, [
    title,
    description,
    selectedImage,
    recordingAudio,
    mood,
    createJournal,
    // goBack,
  ]);

  const color = React.useMemo(() => {
    switch (mood?.title) {
      case 'Angry':
        return Colors.PEACHY_RED_200;
      case 'Anxious':
        return Colors.GREEN;
      case 'Calm':
        return Colors.COUCH_INFO_BLUE;
      case 'Excited':
        return Colors.COUCH_BLUE;
      case 'Happy':
        return Colors.YELLOW_100;
      case 'Sad':
        return Colors.COUCH_GRAY;
      default:
        return Colors.COUCH_BLUE;
    }
  }, [selectedMood]);

  const renderMood = React.useCallback(() => {
    const image = selectedMood;

    return image ? (
      <View style={[styles.moodView, { backgroundColor: color }]}>
        <Image source={{ uri: image }} style={styles.mood} />
      </View>
    ) : null;
  }, [selectedMood, color]);

  const handleMoodModal = (iconUrl: any) => {
    setSelectedMood(iconUrl);
    setModalVisible(true);
  };

  const handleVoiceModal = React.useCallback(() => {
    setOpenVoiceModal(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerLeft={renderMood()}
        headerRight={
          <RightHeader
            loading={isLoading}
            activeColor={color}
            pressConfirmButton={() => createJournalFile()}
            pressCloseButton={() => goBack()}
            disabled={!title || !description}
          />
        }
      />

      <View style={styles.noteOptionBodyContainer}>
        <TextInput
          placeholder="Title you note..."
          value={title}
          placeholderTextColor={Colors.COUCH_GREEN_400}
          style={styles.titleTextStyle}
          onChangeText={(text: string) => setTitle(text)}
        />

        <ScrollView style={{ height: wp(520) }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.noteBodyContainer}>
            <RichEditor
              ref={richText}
              style={styles.noteBodyText}
              onChange={descriptionText => {
                const replaceHTML = descriptionText
                  .replace(/<(.|\n)*?>/g, '')
                  .trim();
                const replaceWhiteSpace = replaceHTML
                  .replace(/&nbsp;/g, '')
                  .trim();
                setDescription(replaceWhiteSpace);
              }}
              editorStyle={contentStyle}
              initialHeight={500}
              useContainer={false}
              containerStyle={{ minHeight: height }}
              onHeightChange={e => {
                setHeight(e);
              }}
              placeholder={'input your content'}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <RichToolbar
          iconSize={50}
          style={styles.noteOptionContainer}
          editor={richText}
          actions={[
            actions.heading6,
            actions.insertImage,
            'insertHTML',
            'insertEmoji',
          ]}
          iconMap={{
            ['insertHTML']: ({}) => (
              <View style={styles.voiceIconContainer}>
                <Image
                  source={Images['note-voice']}
                  resizeMode="contain"
                  style={styles.voiceIcon}
                />
              </View>
            ),
            ['insertEmoji']: ({}) => (
              <View style={styles.voiceIconContainer}>
                <Image
                  source={Images['smile-2']}
                  resizeMode="contain"
                  style={styles.voiceIcon}
                />
              </View>
            ),
            [actions.insertImage]: ({}) => (
              <View style={styles.voiceIconContainer}>
                <Image
                  source={Images['active-note-image']}
                  resizeMode="contain"
                  style={styles.voiceIcon}
                />
              </View>
            ),
            [actions.heading6]: ({}) => (
              <View style={styles.voiceIconContainer}>
                <Image
                  source={Images['active-note-text']}
                  resizeMode="contain"
                  style={styles.voiceIcon}
                />
              </View>
            ),
          }}
          onPressAddImage={pickImageAsync}
          insertHTML={handleVoiceModal}
          insertEmoji={handleMoodModal}
        />
      </View>
      <MoodModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectMood={handleMoodModal}
        setSelectMood={setMood}
      />

      <VoiceModal
        isVisible={openVoiceModal}
        onClose={() => setOpenVoiceModal(false)}
        setSound={setRecordingAudio}
      />
    </SafeAreaView>
  );
};

export default AddJournal;

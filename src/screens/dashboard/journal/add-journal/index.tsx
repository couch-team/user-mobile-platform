import { HeaderBar } from 'components';
import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
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

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'AddJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddJournal = ({ navigation: { goBack } }: Props) => {
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState<MoodType>();
  const [noteTakerOption, setNoteTakerOption] = useState<NoteTakerOptionType[]>(
    [
      {
        id: Date.now() + Math.random() + '',
        type: 'text',
        value: '',
      },
    ],
  );
  const [openMoodModal, setOpenMoodModal] = useState(false);

  const selectImage = useCallback((id: string) => {
    ImagePicker.openPicker({
      width: deviceWidth,
      height: deviceWidth * 0.6,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    })
      .then(response => {
        const image = `data:${response.mime};base64,${response.data}`;
        setNoteTakerOption(state => {
          return state.map(item => {
            if (item.id === id) {
              return { ...item, value: image };
            }

            return item;
          });
        });
      })
      .catch(err => console.log(err));
  }, []);

  const removeImage = useCallback((id: string) => {
    setNoteTakerOption(state => {
      return state.filter(item => item.id !== id);
    });
  }, []);

  const addNoteTakerOption = useCallback(
    (item: NoteTakerOptionType) => {
      if (item.type === 'mood') {
        setOpenMoodModal(true);
        return;
      }

      setNoteTakerOption(state => {
        return [...state, item];
      });

      if (item.type === 'image') {
        selectImage(item.id);
      }
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerLeft={renderMood()}
        headerRight={
          <RightHeader
            pressConfirmButton={() => goBack()}
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
              {option.type === 'image' && !!option.value && (
                <ImageBackground
                  source={{ uri: option.value }}
                  style={styles.image}>
                  <View style={styles.imageContent}>
                    <TouchableOpacity
                      onPress={() => removeImage(option.id)}
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
                      onPress={() => selectImage(option.id)}
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
            </View>
          ))}
        </View>
      </ScrollView>
      <NoteOption addNoteTaker={addNoteTakerOption} />
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
    </SafeAreaView>
  );
};

export default AddJournal;

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVModeIOSOption,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { BaseModal } from 'components';
import { RecordIcon } from 'assets/svg/record';

export type AudioDataType = {
  data: string;
  duration: string;
};

interface VoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  addAudio: (data: AudioDataType) => void;
}

const VoiceModal = ({ isVisible, addAudio, onClose }: VoiceModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [recordTime, setRecordTime] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const audioRecorderPlayer = useMemo(() => {
    return new AudioRecorderPlayer();
  }, []);

  const generateAudioName = useCallback(() => {
    // Come up with a funky way to generate a name here!
    return `${Date.now() + Math.random()}`;
  }, []);

  const start = useCallback(async () => {
    // Let's get creative and generate a unique audio name!
    const path = `${generateAudioName()}.aac`;
    // Set up the audio settings for our recording adventure
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVModeIOS: AVModeIOSOption.measurement,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;
    // Let the countdown begin…or not!
    // await setCountdown(0);
    // await setSeconds(0);
    // await setMinutes(0);
    // setStartCountdown(true);
    try {
      // Start the recording and get the audio URI
      const uri = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled,
      );
      audioRecorderPlayer.addRecordBackListener(e => {
        const curr = Math.floor(e.currentPosition / 1000);
        let min = Math.floor(curr / 60);
        let sec = Math.floor(curr % 60);
        let minutes = (min < 10 ? '0' : '') + min;
        let seconds = (sec < 10 ? '0' : '') + sec;
        setRecordTime(`${minutes}:${seconds}`);
      });
      setIsRecording(true);
      setIsPaused(false);
      // setAudio;
      setAudioPath(uri);
    } catch (error) {
      console.log('Uh-oh! Failed to start recording:', error);
    }
  }, [audioRecorderPlayer, generateAudioName]);

  const startRecording = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
          start();
        } else {
          console.log('All required permissions not granted');
          Alert.alert('Error', 'All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    } else {
      start();
    }
  }, [start]);

  const stopRecording = useCallback(async () => {
    // setStartCountdown(false);
    console.log('stopRecording');
    try {
      // Stop the recording and see what we've got
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsPaused(false);
      setIsRecording(false);
    } catch (error) {
      console.log('Oops! Failed to stop recording:', error);
    }
  }, [audioRecorderPlayer]);

  const pauseRecording = useCallback(async () => {
    // setStartCountdown(false);
    console.log('pauseRecording');
    try {
      // Pause the recording and see what we've got
      const result = await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setIsRecording(false);
    } catch (error) {
      console.log('Oops! Failed to pause recording:', error);
    }
  }, [audioRecorderPlayer]);

  const resumeRecording = useCallback(async () => {
    // setStartCountdown(false);
    console.log('resumeRecording');
    try {
      // rRsume the recording and see what we've got
      const result = await audioRecorderPlayer.resumeRecorder();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.log('Oops! Failed to resume recording:', error);
    }
  }, [audioRecorderPlayer]);

  const closeModal = useCallback(() => {
    onClose();
    stopRecording();
    setIsRecording(false);
    setIsPaused(false);
    setAudioPath('');
    setRecordTime('00:00');
  }, [onClose, stopRecording]);

  const prepRecording = useCallback(async () => {
    // setStartCountdown(false);
    try {
      // Stop the recording (for real this time)
      const fileContent = await RNFS.readFile(audioPath, 'base64');
      // const fileInfo = await RNFS.stat(audioPath);
      // const vnData = {
      //   fileCopyUri: fileInfo?.path,
      //   size: fileInfo?.size,
      //   type: 'audio/mpeg',
      //   name: `${generateAudioName()}.${getFileType(fileInfo?.path)}`,
      // };
      const vnBase = `data:application/audio;base64,${fileContent}`;
      addAudio({ data: vnBase, duration: recordTime });
      const result = await audioRecorderPlayer.stopRecorder();
      closeModal();
      // setAudioFile(vnData);
      // setAudioBase(vnBase);
      // Now input code here to send your voicenote to websocket endpoint.
      // setIsRecording(false);
    } catch (error) {
      console.log('Uh-oh! Failed to stop and send recording:', error);
    }
  }, [addAudio, audioPath, audioRecorderPlayer, closeModal, recordTime]);

  // const playAudio = useCallback(async newAudioUrl => {
  //   if (active === newAudioUrl) {
  //     try {
  //       if (isPlaying) {
  //         await SoundPlayer.pause(); // Pause the audio if already playing
  //         setIsPlaying(false);
  //       } else {
  //         await SoundPlayer.resume(); // Resume playing the audio if paused
  //         setIsPlaying(true);
  //       }
  //     } catch (error) {
  //       console.log(
  //         'Oh no! An error occurred while pausing/resuming audio:',
  //         error,
  //       );
  //     }
  //   } else {
  //     try {
  //       if (isPlaying) {
  //         await SoundPlayer.stop(); // Stop the currently playing audio
  //       }
  //       dispatch(setPlaying(newAudioUrl)); // Set the new audio URL
  //       setIsPlaying(true);
  //       const soundData = await SoundPlayer.getInfo();
  //       setTotalDuration(soundData?.duration);
  //       SoundPlayer.addEventListener('FinishedPlaying', () => {
  //         setIsPlaying(false); // Reset the playing state when audio finishes playing
  //         dispatch(clearPlaying(newAudioUrl));
  //       });
  //       await SoundPlayer.playUrl(newAudioUrl); // Play the new audio
  //       const audio = await SoundPlayer.getInfo();
  //       setTotalDuration(audio?.duration);
  //     } catch (error) {
  //       console.log('Oops! An error occurred while playing audio:', error);
  //     }
  //   }
  // }, []);

  return (
    <BaseModal visible={isVisible} onClose={closeModal}>
      <View style={styles.container}>
        <View>
          <View style={styles.dateBtn}>
            <Text style={styles.dateText}>{recordTime}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.record}>
            <RecordIcon
              primaryColor={isRecording ? Colors.COUCH_BLUE : undefined}
              secondaryColor={isRecording ? Colors.COUCH_BLUE_1100 : undefined}
            />
          </TouchableOpacity>
          {!(isRecording || isPaused) && !audioPath && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={startRecording}
              style={styles.dateBtn}>
              <Text style={styles.tapText}>Tap Icon to Record</Text>
            </TouchableOpacity>
          )}
          {(isRecording || isPaused) && (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (isRecording) {
                    pauseRecording();
                  } else {
                    resumeRecording();
                  }
                }}>
                <Image
                  source={
                    isRecording ? Images['note-pause'] : Images['note-play']
                  }
                  resizeMode="contain"
                  style={styles.option}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={stopRecording}
                style={styles.stop}>
                <Image
                  source={Images['note-stop']}
                  resizeMode="contain"
                  style={styles.option}
                />
              </TouchableOpacity>
            </View>
          )}
          {!(isRecording || isPaused) && !!audioPath && (
            <View style={[styles.optionContainer, styles.footerOption]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsRecording(false);
                  setIsPaused(false);
                  setAudioPath('');
                  setRecordTime('00:00');
                  startRecording();
                }}>
                <Image
                  source={Images['note-retry']}
                  resizeMode="contain"
                  style={styles.optionLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsRecording(false);
                  setIsPaused(false);
                  setAudioPath('');
                  setRecordTime('00:00');
                }}
                style={styles.cancel}>
                <Image
                  source={Images['note-cancel']}
                  resizeMode="contain"
                  style={styles.optionLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={prepRecording}>
                <Image
                  source={Images['note-check']}
                  resizeMode="contain"
                  style={styles.optionLarge}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_MODAL_200,
    paddingTop: hp(25),
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
    paddingBottom: hp(50),
  },
  dateBtn: {
    minHeight: hp(38),
    alignSelf: 'center',
    borderRadius: hp(50),
    paddingVertical: hp(12),
    paddingHorizontal: wp(14),
    backgroundColor: Colors.COUCH_GREEN_300,
  },
  dateText: {
    fontSize: hp(12),
    color: Colors.DATE_COLOR,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  tapText: {
    fontSize: hp(12),
    color: Colors.COUCH_INFO_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  record: {
    marginTop: hp(28),
    marginBottom: hp(40),
  },
  optionContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: hp(64),
    backgroundColor: Colors.COUCH_BLUE_1500,
  },
  option: {
    width: 48,
    height: 48,
  },
  footerOption: {
    backgroundColor: undefined,
  },
  optionLarge: {
    width: 56,
    height: 56,
  },
  stop: {
    marginLeft: wp(8),
  },
  cancel: {
    marginHorizontal: wp(16),
  },
});

export default VoiceModal;

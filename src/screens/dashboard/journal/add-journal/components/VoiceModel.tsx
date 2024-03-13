/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { Audio } from 'expo-av';

import { hp, wp } from 'constants/layout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseModal, XButton } from 'components';

export type AudioDataType = {
  data: string;
  duration: string;
};

interface VoiceModalProps {
  isVisible?: boolean;
  onClose: () => void;
  addAudio?: (data: AudioDataType) => void;
  loadAudio: any;
  journalEntries: [];
}

const VoiceModal = ({
  isVisible,
  onClose,
  loadAudio,
  journalEntries,
}: VoiceModalProps) => {
  const [recordTime, setRecordTime] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // const [recordings, setRecording] = useState<any>();
  // const [permissionResponse, requestPermission]: any = Audio.usePermissions();
  const [hasStoppedPlaying, setHasStoppedPlaying] = useState(false);
  const [recordIntervalId, setRecordIntervalId] = useState<any>('');

  // const [duration, setDuration] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<any>();
  // const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const recordingOptions = {
        isMeteringEnabled: true,
        android: {
          extension: '.mp3', // Specify the desired audio format (e.g., mp3)
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: Audio.RECORDING_OPTION_ANDROID_SAMPLE_RATE_44100,
          numberOfChannels: Audio.RECORDING_OPTION_ANDROID_NUMBER_OF_CHANNELS_2,
          bitRate: Audio.RECORDING_OPTION_ANDROID_BIT_RATE_128000,
        },
        ios: {
          extension: '.caf', // Specify the desired audio format for iOS (e.g., caf)
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: Audio.RECORDING_OPTION_IOS_SAMPLE_RATE_MAX,
          numberOfChannels: Audio.RECORDING_OPTION_IOS_NUMBER_OF_CHANNELS_MAX,
          bitRate: Audio.RECORDING_OPTION_IOS_BIT_RATE_MAX,
          linearPCMBitDepth: Audio.RECORDING_OPTION_IOS_LINEARPCM_BIT_DEPTH_16,
          linearPCMIsBigEndian:
            Audio.RECORDING_OPTION_IOS_LINEARPCM_IS_BIG_ENDIAN_FALSE,
          linearPCMIsFloat: Audio.RECORDING_OPTION_IOS_LINEARPCM_IS_FLOAT_FALSE,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { recording } = await Audio.Recording.createAsync(
        // Audio.RecordingOptionsPresets.HIGH_QUALITY,
        recordingOptions,
      );

      setRecording(recording);

      setRecordTime('00:00');

      // Update the recording time every second once the duration is available
      const intervalId = setInterval(async () => {
        const status = await recording.getStatusAsync();

        if (status.isRecording) {
          const durationSeconds = Math.floor(status.durationMillis / 1000);
          const minutes = Math.floor(durationSeconds / 60);
          const seconds = durationSeconds % 60;
          const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
            seconds,
          ).padStart(2, '0')}`;
          setRecordTime(formattedTime);
        }
      }, 1000);

      setRecordIntervalId(intervalId);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const addRecording = async () => {
    try {
      const audioUri: any = recording.getURI();
      loadAudio(audioUri, journalEntries.length);
      setRecordTime('00:00');
    } catch (error) {
      console.log('Error adding audio', error);
    }
  };

  const removeRecording = async () => {
    try {
      await recording._subscription.remove();
    } catch (error) {
      console.log('Error removing audio', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();

      // const { sound, status } = await recording.createNewLoadedSoundAsync();
      setHasStoppedPlaying(true);
      // clearInterval(recordIntervalId);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const playPauseAsync = async () => {
    // const sound = audioRef.current[index];
    if (recording) {
      try {
        if (isPlaying) {
          await recording.pauseAsync();
          setRecordTime(recordTime);
        } else {
          await recording.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error playing/pausing audio:', error);
      }
    }
  };

  const closeModal = useCallback(() => {
    onClose();
    stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <BaseModal visible={isVisible} onClose={closeModal}>
      <View style={styles.container}>
        <View style={{ gap: 20 }}>
          <View style={styles.dateBtn}>
            {!isRecording && !isPlaying && !hasStoppedPlaying && (
              <Text style={styles.dateText}>{recordTime}</Text>
            )}
            {isRecording && <Text style={styles.dateText}>{recordTime}</Text>}
            {hasStoppedPlaying && (
              <Text style={styles.dateText}>{recordTime}</Text>
            )}
          </View>
          <View style={{ gap: 40, alignItems: 'center' }}>
            <Image
              source={
                isRecording
                  ? Images['record-icon-big']
                  : Images['record-icon-inactive']
              }
              style={{ width: 180, height: 180, resizeMode: 'contain' }}
            />

            <Image
              source={
                isRecording
                  ? Images['record-tracks-active']
                  : Images['record-tracks-inactive']
              }
              style={{ width: 200, height: 100, resizeMode: 'contain' }}
            />
          </View>
          {!isRecording && !isPlaying && !hasStoppedPlaying && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={startRecording}
              style={styles.dateBtn}>
              <Text style={styles.tapText}>Tap Icon to Record</Text>
            </TouchableOpacity>
          )}
          {isRecording && (
            <View style={styles.optionContainer}>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => playPauseAsync()}>
                <Image
                  source={
                    isRecording ? Images['note-pause'] : Images['note-play']
                  }
                  resizeMode="contain"
                  style={styles.option}
                />
              </TouchableOpacity> */}
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
          {isPlaying && (
            <View style={styles.optionContainer}>
              <Pressable onPress={playPauseAsync}>
                <Image
                  source={
                    isPlaying && isPaused
                      ? Images['note-pause']
                      : Images['note-play']
                  }
                  resizeMode="contain"
                  style={styles.option}
                />
              </Pressable>
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
          {hasStoppedPlaying && (
            <View style={[styles.optionContainer]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsRecording(false);
                  setIsPaused(false);
                  setRecordTime('00:00');
                  setHasStoppedPlaying(false);
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
                  removeRecording();
                  setIsRecording(false);
                  setIsPaused(false);
                  setRecordTime('00:00');
                  onClose();
                  setHasStoppedPlaying(false);
                }}
                style={styles.cancel}>
                <Image
                  source={Images['note-cancel']}
                  resizeMode="contain"
                  style={styles.optionLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  addRecording();
                  setHasStoppedPlaying(false);
                  onClose();
                }}>
                <Image
                  source={Images['note-check']}
                  resizeMode="contain"
                  style={[
                    styles.optionLarge,
                    { width: 30, height: 30, resizeMode: 'contain' },
                  ]}
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
    gap: 16,
  },
  option: {
    width: 30,
    height: 30,
  },
  // footerOption: {
  //   backgroundColor: undefined,
  // },
  optionLarge: {
    width: 24,
    height: 24,
  },
  stop: {
    // marginLeft: wp(8),
  },
  cancel: {
    marginHorizontal: wp(16),
  },
});

export default VoiceModal;

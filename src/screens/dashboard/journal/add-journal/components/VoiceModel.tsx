import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { Audio } from 'expo-av';

import { hp, wp } from 'constants/layout';
import { BaseModal, XButton } from 'components';
import { RecordIcon } from 'assets/svg/record';

export type AudioDataType = {
  data: string;
  duration: string;
};

interface VoiceModalProps {
  isVisible?: boolean;
  onClose: () => void;
  addAudio?: (data: AudioDataType) => void;
  setSound: any;
}

const VoiceModal = ({ isVisible, setSound, onClose }: VoiceModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState<any>(null);
  const [audioUri, setAudioUri] = useState<any>(null);
  const [recordTime, setRecordTime] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recording, setRecording] = useState<any>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [position, setPosition] = useState('00:00');
  const [duration, setDuration] = useState(0);

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        // console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const statusUpdateCallback = async (status: Audio.RecordingStatus) => {
        const durationSeconds = Math.floor(status.durationMillis / 1000);
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;

        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
          seconds,
        ).padStart(2, '0')}`;
        setRecordTime(formattedTime);
        // console.log(status);
      };
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        statusUpdateCallback,
      );
      setRecording(recording);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    // console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setAudioUri(uri);

    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `audio/${match[1]}` : `audio`;

    setSound({ type, name: filename, uri: uri });
    setIsRecording(false);
    // console.log('Recording stopped and stored at', uri);
  }

  React.useEffect(() => {
    const loadAudio = async () => {
      try {
        if (audioUri) {
          const { sound } = await Audio.Sound.createAsync(
            { uri: audioUri },
            { shouldPlay: true },
          );
          setAudioPath(sound);
          const status: any = await sound.getStatusAsync();
          setDuration(status.durationMillis);
          setPosition('00:00');
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (audioPath) {
        setIsPlaying(false);
        setIsPaused(false);
        audioPath.unloadAsync();
      }
    };
  }, [audioUri]);

  React.useEffect(() => {
    const updatePosition = () => {
      if (audioPath) {
        audioPath
          .getStatusAsync()
          .then((currentPosition: { positionMillis: number }) => {
            const durationSeconds = Math.floor(
              currentPosition.positionMillis / 1000,
            );
            const minutes = Math.floor(durationSeconds / 60);
            const seconds = durationSeconds % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
              seconds,
            ).padStart(2, '0')}`;
            setPosition(formattedTime);
          });
      }
    };

    const intervalId: any =
      (isPlaying || isRecording) && setInterval(updatePosition, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [audioPath, isPlaying, isRecording]);

  const setAudioMode = async () => {
    if (audioPath) {
      await audioPath.setAudioModeAsync({ staysActiveInBackground: true });
    }
  };

  React.useEffect(() => {
    setAudioMode();
  }, [audioPath]);

  const handlePlayPause = async () => {
    if (audioPath) {
      try {
        if (isPlaying && !isPaused) {
          await audioPath.pauseAsync();
          setIsPaused(true);
        } else {
          await audioPath.playAsync();
          setIsPlaying(true);
          setIsPaused(false);
        }
      } catch (error) {
        console.error('Error playing/pausing audio:', error);
      }
    }
  };

  const handleStop = async () => {
    if (audioPath) {
      try {
        await audioPath.stopAsync();
        setIsPlaying(false);
        setIsPaused(false);
        setRecordTime('00:00');
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }
  };

  const handlePlay = async () => {
    if (recording) {
      await recording.playAsync();
    }
  };

  const handlePause = async () => {
    if (recording) {
      await recording.pauseAsync();
    }
  };

  const closeModal = useCallback(() => {
    onClose();
    stopRecording();
  }, [onClose]);

  return (
    <BaseModal visible={isVisible} onClose={closeModal}>
     
      <View style={styles.container}>
        <View>
          <View style={styles.dateBtn}>
            {!isRecording && !isPlaying && (
              <Text style={styles.dateText}>{recordTime}</Text>
            )}
            {isRecording && <Text style={styles.dateText}>{recordTime}</Text>}
            {isPlaying && <Text style={styles.dateText}>{position}</Text>}
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.record}>
            <RecordIcon
              primaryColor={recording ? Colors.COUCH_BLUE : undefined}
              secondaryColor={recording ? Colors.COUCH_BLUE_1100 : undefined}
            />
          </TouchableOpacity>
          {!recording && !isPlaying && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={startRecording}
              style={styles.dateBtn}>
              <Text style={styles.tapText}>Tap Icon to Record</Text>
            </TouchableOpacity>
          )}
          {recording && (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (recording) {
                    handlePause();
                    // pauseRecording();
                  } else {
                    handlePlay();
                    // resumeRecording();
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
          {isPlaying && (
            <View style={styles.optionContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={handlePlayPause}>
                <Image
                  source={
                    isPlaying && isPaused
                      ? Images['note-pause']
                      : Images['note-play']
                  }
                  resizeMode="contain"
                  style={styles.option}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleStop}
                style={styles.stop}>
                <Image
                  source={Images['note-stop']}
                  resizeMode="contain"
                  style={styles.option}
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
    width: 30,
    height: 30,
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

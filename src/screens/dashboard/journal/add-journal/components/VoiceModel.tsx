import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { Audio } from 'expo-av';

import { hp, wp } from 'constants/layout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [recordings, setRecording] = useState<any>();
  const [permissionResponse, requestPermission]: any = Audio.usePermissions();
  const [position, setPosition] = useState('00:00');
  const [hasStoppedPlaying, setHasStoppedPlaying] = useState(false);

  // const [duration, setDuration] = useState(0);

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
    await recordings.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recordings.getURI();
    setAudioUri(uri);

    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `audio/${match[1]}` : 'audio';

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
          // const status: any = await sound.getStatusAsync();
          // setDuration(status.durationMillis);
          setPosition('00:00');
          setIsPlaying(true);
          setHasStoppedPlaying(false);
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
        setHasStoppedPlaying(true);
        audioPath.unloadAsync();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      (isPlaying || isPaused) && setInterval(updatePosition, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [audioPath, isPlaying, isPaused]);

  const setAudioMode = async () => {
    if (audioPath) {
      await audioPath.setAudioModeAsync({ staysActiveInBackground: true });
    }
  };

  React.useEffect(() => {
    setAudioMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setHasStoppedPlaying(false);
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
        setHasStoppedPlaying(true);
        // onClose()
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }
  };

  React.useEffect(() => {
    // Use hasStoppedPlaying state to detect when the audio has stopped playing
    if (hasStoppedPlaying) {
      console.log('Audio has stopped playing');
      // Do something when the audio stops playing
    }
  }, [hasStoppedPlaying]);

  const handlePlay = async () => {
    if (recordings) {
      await recordings.playAsync();
    }
  };

  const handlePause = async () => {
    if (recordings) {
      await recordings.pauseAsync();
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
        <View>
          <View style={styles.dateBtn}>
            {!isRecording && !isPlaying && !hasStoppedPlaying && (
              <Text style={styles.dateText}>{recordTime}</Text>
            )}
            {isRecording && <Text style={styles.dateText}>{recordTime}</Text>}
            {isPlaying && <Text style={styles.dateText}>{position}</Text>}
            {hasStoppedPlaying && (
              <Text style={styles.dateText}>{position}</Text>
            )}
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.record}>
            <RecordIcon
              primaryColor={recordings ? Colors.COUCH_BLUE : undefined}
              secondaryColor={recordings ? Colors.COUCH_BLUE_1100 : undefined}
            />
          </TouchableOpacity>
          {!recordings && !isPlaying && !hasStoppedPlaying && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={startRecording}
              style={styles.dateBtn}>
              <Text style={styles.tapText}>Tap Icon to Record</Text>
            </TouchableOpacity>
          )}
          {recordings && (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (recordings) {
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
          {hasStoppedPlaying && (
            <View style={[styles.optionContainer]}>
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
                  onClose();
                }}
                style={styles.cancel}>
                <Image
                  source={Images['note-cancel']}
                  resizeMode="contain"
                  style={styles.optionLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => onClose()}>
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
    width: 30,
    height: 30,
  },
  // footerOption: {
  //   backgroundColor: undefined,
  // },
  optionLarge: {
    width: 34,
    height: 34,
  },
  stop: {
    marginLeft: wp(8),
  },
  cancel: {
    marginHorizontal: wp(16),
  },
});

export default VoiceModal;

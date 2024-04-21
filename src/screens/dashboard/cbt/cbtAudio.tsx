import { RouteProp, useRoute } from '@react-navigation/native';
import {
  CLOSE,
  NEXT_ICON,
  PAUSE_ICON,
  PLAY_ICON,
  REPLAY_ICON,
} from 'assets/svg';
import { deviceHeight, deviceWidth } from 'constants/layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from 'theme/config';
import { DashboardParamList } from 'utils/types/navigation-types';
import { showMessage } from 'react-native-flash-message';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import dayjs from 'dayjs';
import { $api } from 'services';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CbtAudio'
>;
type Props = {
  navigation: DashboardNavigationProps;
};
const CbtAudio = ({ navigation: { goBack } }: Props) => {
  const { params } = useRoute<RouteProp<DashboardParamList, 'CbtAudio'>>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const { top } = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound | ''>('');
  const [progress, setProgress] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedDuration, setPlayedDuration] = useState(0);

  var playedDurationRef = useRef(0);
  const fetchAudio = async () => {
    try {
      setIsLoadingAudio(true);
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: params?.audio_uri,
      });
      setSound(newSound);
      console.log(newSound);
      const response = await newSound.getStatusAsync();
      setDuration((response as any)?.durationMillis);
    } catch (err) {
      console.log(err);
      goBack();
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const completeWatch = async () => {
    try {
      const response = await $api.post('/api/therapy/play/', {
        is_complete: true,
        // current_duration: playedDuration,
        content_id: params?.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveDuration = async (durationToUpload: string) => {
    try {
      const response = await $api.post('/api/therapy/play/', {
        current_duration: durationToUpload,
        content_id: params?.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const playAudio = async () => {
    if (!sound) {
      return;
    }
    try {
      await sound.playAsync();
      setHasStarted(true);

      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setPlayedDuration(status.positionMillis);
          playedDurationRef.current = status.positionMillis;
          status.isPlaying ? setIsPaused(false) : setIsPaused(true);
        }
        if ('didJustFinish' in status && status.didJustFinish) {
          // setHasStarted(false)
          setIsPaused(true);
          setIsCompleted(true);
          completeWatch();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAudio();
  }, []);

  useEffect(() => {
    return () => {
      !params?.is_complete &&
        Number(playedDurationRef.current) > 1000 &&
        saveDuration(dayjs(playedDurationRef.current).format('mm:ss'));
    };
  }, []);

  useEffect(() => {
    const durationArray = params?.duration?.split(':');

    if (sound) {
      sound.setPositionAsync(
        durationArray?.length > 2
          ? (Number(durationArray[0]) * 60 * 60 +
              Number(durationArray[1]) * 60 +
              Number(durationArray[2])) *
              1000
          : (Number(durationArray[0]) * 60 + Number(durationArray[1])) * 1000,
      );
    }
  }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });

    return sound
      ? () => {
          sound.unloadAsync();
          setHasStarted(false);
          setIsPaused(true);
          setPlayedDuration(0);
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPaused) {
        await sound.playAsync();
        setIsPaused(true);
      } else {
        await sound.pauseAsync();
        setIsPaused(false);
      }
    }
  };

  const handleRestart = async () => {
    if (sound) {
      await sound.replayAsync();
      setIsCompleted(false);
    }
  };

  const handleMoveToPosition = async (event: any) => {
    if (sound) {
      const { locationX } = event.nativeEvent;
      const positionPercentage = locationX / (deviceWidth - 48);
      const milliseconds = Math.floor(positionPercentage * duration);
      await sound.setPositionAsync(milliseconds);
      if (isPaused) {
        await sound.playAsync();
        setIsPaused(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: params?.backgroundImageUri }}
        style={[styles.backgroundImage]}
        resizeMode="cover">
        <LinearGradient
          colors={[
            'rgba(38, 28, 64, 0.2)',
            'rgba(38, 28, 64, 0.5237)',
            'rgba(38, 28, 64, 0.73)',
            'rgba(38, 28, 64, 1)',
          ]}
          style={[styles.gradient, { paddingTop: top }]}>
          {isCompleted ? (
            <View></View>
          ) : (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => goBack()}>
              <CLOSE />
            </TouchableOpacity>
          )}
          <View style={styles.contentContainer}>
            <Text style={styles.audioLabel}>
              How to not believe everything you see
            </Text>
            <View style={styles.audioControls}>
              <TouchableOpacity
                style={styles.audioLength}
                onPress={e => hasStarted && handleMoveToPosition(e)}>
                <View
                  style={[
                    styles.audioPlayedLength,
                    isLoadingAudio
                      ? { width: 0 }
                      : { width: `${(playedDuration / duration) * 100}%` },
                  ]}></View>
              </TouchableOpacity>
              <View style={styles.audioControlsLabel}>
                <Text style={styles.audioControlsText}>
                  {dayjs(playedDuration).format('mm:ss')}
                </Text>
                <Text style={styles.audioControlsText}>
                  {isLoadingAudio ? (
                    <ActivityIndicator size="small" color={Colors.WHITE} />
                  ) : (
                    dayjs(duration).format('mm:ss')
                  )}
                </Text>
              </View>
            </View>
            {hasStarted ? (
              isPaused ? (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => {
                    handlePlayPause();
                  }}>
                  <PLAY_ICON />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => {
                    handlePlayPause();
                  }}>
                  <PAUSE_ICON />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  playAudio();
                }}
                disabled={isLoadingAudio}>
                {isLoadingAudio ? (
                  <ActivityIndicator size="small" color={Colors.WHITE} />
                ) : (
                  <Text style={styles.buttonText}>Get Started</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
        {isCompleted && (
          <LinearGradient
            style={styles.replayOptions}
            colors={['rgba(38, 28, 64, 0.2)', 'rgba(38, 28, 64, 1)']}>
            <TouchableOpacity
              style={styles.replayOption}
              onPress={() => handleRestart()}>
              <REPLAY_ICON />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.replayOption}
              onPress={() => goBack()}>
              <NEXT_ICON />
            </TouchableOpacity>
          </LinearGradient>
        )}
      </ImageBackground>
    </View>
  );
};
export default CbtAudio;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: '#E3E4F83B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  backgroundImage: {
    alignItems: 'flex-end',
    flex: 1,
  },
  gradient: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 88,
    paddingHorizontal: 24,
  },
  contentContainer: {},
  audioLabel: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.48,
    color: Colors.WHITE,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.COUCH_BLUE,
    paddingVertical: 22,
    borderRadius: 64,
    marginTop: 52,
  },
  playButton: {
    backgroundColor: Colors.COUCH_BLUE,
    width: 75,
    height: 75,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 52,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontWeight: '600',
    color: Colors.WHITE,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.48,
    textAlign: 'center',
  },
  replayOptions: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 24,
  },
  replayOption: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3E4F83D',
    borderRadius: 96,
  },
  audioControls: {
    marginTop: 20,
  },
  audioControlsLabel: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 8,
  },
  audioControlsText: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    fontWeight: '600',
    color: Colors.WHITE,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.32,
    textAlign: 'center',
  },
  audioLength: {
    backgroundColor: '#E3E4F840',
    borderRadius: 128,
    height: 7,
  },
  audioPlayedLength: {
    backgroundColor: Colors.COUCH_BLUE,
    borderRadius: 128,
    height: 7,
  },
});

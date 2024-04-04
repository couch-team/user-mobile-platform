import { RouteProp, useRoute } from "@react-navigation/native";
import { CLOSE, NEXT_ICON, PAUSE_ICON, PLAY_ICON, REPLAY_ICON } from "assets/svg";
import { deviceHeight, deviceWidth } from "constants/layout";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResizeMode, Video } from "expo-av"; // Import Video instead of Audio
import dayjs from "dayjs";

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CbtVideo' // Change the route name to 'CbtVideo'
>;
type Props = {
  navigation: DashboardNavigationProps;
};
const CbtVideo = ({ navigation: { goBack } }: Props) => {
    const { params } = useRoute<RouteProp<DashboardParamList, 'CbtVideo'>>();
    const [ isCompleted, setIsCompleted ] = useState(false);
    const [ hasStarted, setHasStarted ] = useState(false);
    const [ isPaused, setIsPaused ] = useState(true);
    const { top } = useSafeAreaInsets();
    const [ progress, setProgress ] = useState(0);
    const [ isLoadingVideo, setIsLoadingVideo ] = useState(false);
    const [ duration, setDuration ] = useState(0);
    const [ playedDuration, setPlayedDuration ] = useState(0);
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const handleRestart = () => {
        console.log("hello")
    }

    return(
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => {
                    setStatus(() => status)
                    if ('didJustFinish' in status && status.didJustFinish) {
                        setIsCompleted(true);
                        (video.current as any).pauseAsync()
                    }
                }}
            />
            {/* <View style={styles.buttons}>
                <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
                />
            </View> */}
              {
                isCompleted
                    &&
                <LinearGradient
                        style={styles.replayOptions}
                        colors={['rgba(38, 28, 64, 0.87)', 'rgba(38, 28, 64, 1)']}
                    >
                            <TouchableOpacity style={styles.replayOption} onPress={() => { setIsCompleted(false); (video.current as any).playAsync() }}>
                                <REPLAY_ICON/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.replayOption} onPress={() => goBack()}>
                                <NEXT_ICON/>
                            </TouchableOpacity>
                    </LinearGradient>
                }
        </View>
    )
}
export default CbtVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_MODAL_200
    },
    video: {
        width: '100%',
        height: '100%'
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
})
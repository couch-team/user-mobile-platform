import { RouteProp, useRoute } from "@react-navigation/native";
import { CLOSE, NEXT_ICON, PAUSE_ICON, PLAY_ICON, REPLAY_ICON } from "assets/svg";
import { deviceHeight, deviceWidth, getStatusBarHeight } from "constants/layout";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResizeMode, Video } from "expo-av"; // Import Video instead of Audio
import dayjs from "dayjs";
import { $api } from "services";

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
    const video = useRef(null);
    const [status, setStatus] = useState({});

    var playedDuration = useRef(0);
    const completeWatch = async() => {
        try{
            const response = await $api.post('/api/therapy/play/', {
                is_complete: true,
                content_id: params?.id,
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const saveDuration = async(durationToUpload: string) => {
        try{
            const response = await $api.post('/api/therapy/play/', {
                current_duration: durationToUpload,
                content_id: params?.id,
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        return () => {
            !params?.is_complete && Number(playedDuration.current) > 1000 && saveDuration(dayjs(playedDuration.current).format('mm:ss'))
        }
    },[])

    useEffect(() => {
        const durationArray = params?.duration?.split(":")
        if(durationArray){
            if(video){
                (video.current as any).setPositionAsync( durationArray?.length > 2 ? ( (Number(durationArray[0]) * 60 * 60) + (Number(durationArray[1]) * 60) + Number(durationArray[2])) * 1000 : ((Number(durationArray[0]) * 60) + Number(durationArray[1])) * 1000 )
            }
        }
    },[])


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
                    status.isLoaded && status.isPlaying && (playedDuration.current = status.positionMillis)
                    if ('didJustFinish' in status && status.didJustFinish) {
                        setIsCompleted(true);
                        (video.current as any).pauseAsync()
                        completeWatch()
                    }
                }}
            />
            { !isCompleted && <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}><CLOSE/></TouchableOpacity> }
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
    closeButton: {
        position: 'absolute',
        top: 88,
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: '#E3E4F83B',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
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
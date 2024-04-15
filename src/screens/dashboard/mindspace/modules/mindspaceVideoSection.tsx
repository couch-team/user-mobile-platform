import { RouteProp, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { HeaderBar, HeaderText } from "components"
import debounce from "helpers/debounce";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { $api } from "services";
import { Colors, Typography } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";
import { RecentlyWatchedVideo } from "../components";

type ScreenProps = StackScreenProps<DashboardParamList, 'MindSpaceVideoSection'>;
const MindSpaceVideoSection = ({ navigation: { navigate, goBack } }: ScreenProps) => {
    const { params } = useRoute<RouteProp<DashboardParamList, 'MindSpaceVideoSection'>>();
    const [ isFetchingVideo, setIsFetchingVideo ] = useState(false);
    const [ podcasts, setPodcasts ] = useState<any[]>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ reached_end, setReachedEnd ] = useState(false);
    const [ hasFetchedVideo, setHasFetchedVideo ] = useState(false)

    const fetchVideoLibrary = async() => {
        setHasFetchedVideo(true)
        setIsFetchingVideo(true)
        debounceFecthVideoLibrary(currentPage)
      }
    
    const debounceFecthVideoLibrary = debounce(async(current_page) => {
        try{
          const response = await $api.fetch(`/api/therapy/library/video/?page=${current_page}&category_title=${params?.header}`)
          if($api.isSuccessful(response)){
            console.log(response)
            response?.data?.results?.length > 0 ? setPodcasts(response?.data?.results) : setReachedEnd(true);
            !reached_end && !isFetchingVideo && setCurrentPage(currentPage + 1)
          }
          else if(!response?.data){
            setReachedEnd(true)
          }
        }
        catch(err){
          console.log(err)
        }
        finally{
          setIsFetchingVideo(false)
        }
    }, 500)

    useEffect(() => {
        fetchVideoLibrary()
    },[])
    
    return(
        <SafeAreaView style={styles.container}>
            <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
            <HeaderText
                text={params?.header}
                hasSubText={params?.sub_header}
            />
            <FlatList
                contentContainerStyle={{ marginTop: 24, paddingHorizontal: 24 }}
                data={podcasts}
                renderItem={(item: any) => {
                    return <RecentlyWatchedVideo background_url={item?.item?.background_url} content_url={item?.item?.content_url} current_duration={item?.item?.play_history?.current_duration || "00:00"} id={item?.item?.id} duration={item?.item?.duration} key={item?.item?.id} color={item?.item?.category[0]?.colour} tags={item?.item?.tags} title={item?.item?.title}/>
                }}
                ListFooterComponent={
                    reached_end 
                        ?  
                        podcasts?.length > 0
                        ?           
                        <View style={styles.reachedEndContainer}>
                            <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                        </View>
                        :
                        <View style={styles.reachedEndContainer}></View>
                        :
                        (podcasts?.length > 0 && isFetchingVideo)
                        ?
                        <View style={styles.reachedEndContainer}>
                            <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                        </View>
                        :
                        <View style={styles.reachedEndContainer}></View>
                }
                ListEmptyComponent={
                    isFetchingVideo
                        ?
                        <View style={styles.reachedEndContainer}>
                        <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                        </View>
                        :
                        <View style={styles.reachedEndContainer}>
                        <Text style={styles.reachedEnd}>No result</Text>
                        </View>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>

            </ScrollView>
        </SafeAreaView>
    )
};
export default MindSpaceVideoSection;
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.PRIMARY,
    },
    reachedEndContainer: {
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
    },
    reachedEnd: {
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.WHITE
    },
})
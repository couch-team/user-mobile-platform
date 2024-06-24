import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CLOSE, LONG_ARROW } from "assets/svg";
import { deviceWidth } from "constants/layout";
import { RefObject, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { $api } from "services";
import { Colors, Typography } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CbtText'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const TextView = ({ goBack, text, index, img, carouselRef, total, completeReading, isSaving} : { goBack:() => void, index: number, img: string, text: string, carouselRef: RefObject<FlatList>, total: number, completeReading: () => void, isSaving: boolean }) => {
    const swipe = () => {
        (carouselRef.current as any).scrollToIndex({ index: index + 1 });
    };
    const width = ((index + 1) / total) * 187
    return(
        <View style={styles.parent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}><CLOSE/></TouchableOpacity>
            <View style={styles.contentContainer}>
                <View style={{ alignItems: 'center' }}>
                    {
                        index !== 0
                            &&
                        <View style={styles.progressIndicator}>
                            <View style={[styles.progress, { width: width } ]}></View>
                        </View>
                    }
                    <Image source={{ uri: img }} style={styles.image} resizeMode="cover"/>
                    { index === 0 && <Text style={styles.headerText}>{text}</Text> }
                    { index !==0 && <Text style={styles.subheaderText}>{text}</Text> }
                </View>
                {
                    (index + 1) === total
                    ?
                    <TouchableOpacity style={styles.startButton} onPress={() => completeReading()}>
                        { isSaving ? <ActivityIndicator color={Colors.WHITE} size="small"/> : <Text style={styles.buttonText}>Finish Article</Text> }
                    </TouchableOpacity>
                    :
                    index == 0
                        ?
                        <TouchableOpacity style={styles.startButton} onPress={() => swipe()}>
                            <Text style={styles.buttonText}>Start Reading</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.nextButtonContainer}>
                            <TouchableOpacity style={styles.nextButton} onPress={() => swipe()}>
                                <LONG_ARROW/>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    )
};


const CbtText = ({ navigation: { goBack } }: Props) => {
    const { params } = useRoute<RouteProp<DashboardParamList, 'CbtText'>>();
    const carouselRef = useRef(null);
    const [ isSaving, setIsSaving ] = useState(false);

    const completeReading = async() => {
        try{
            setIsSaving(true)
            const response = await $api.post('/api/therapy/play/', {
                is_complete: true,
                duration: '00:00',
                content_id: params?.id,
            })
            console.log(response)
            if($api.isSuccessful(response)){
                goBack()
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsSaving(false)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={params?.content}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => {
                    return <TextView isSaving={isSaving} goBack={goBack} index={index} img={item?.image_url} text={item?.content} carouselRef={carouselRef} total={params?.content?.length} completeReading={completeReading}/>;
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={carouselRef}
            />

        </SafeAreaView>
    )
}
export default CbtText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_MODAL_200,
        paddingTop: 24
    },
    parent: {
        paddingHorizontal: 24,
        width: deviceWidth
    },
    image: {
        width: '100%',
        minHeight: 284,
        marginTop: 16,
        borderRadius: 16,
    },
    closeButton: {
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: '#E3E4F83B',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    startButton: {
        backgroundColor: Colors.COUCH_BLUE,
        paddingVertical: 22,
        borderRadius: 64,
        width: '100%'
    },
    nextButton: {
        backgroundColor: Colors.COUCH_BLUE,
        borderRadius: 64,
        width: 116,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.48,
        color: '#fff',
        textAlign: 'center'
    },
    headerText: {
        fontSize: 18,
        lineHeight: 32,
        letterSpacing: -0.64,
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.COUCH_BLUE_1100,
        textAlign: 'center',
        marginTop: 40,
        paddingHorizontal: 13.5,
    },
    subheaderText: {
        fontSize: 14,
        lineHeight: 25,
        letterSpacing: -0.48,
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.COUCH_TEXT_COLOR,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 13.5,
    },
    progressIndicator: {
        width: 187,
        height: 7,
        borderRadius: 128,
        backgroundColor: '#E3E4F840',
    },
    progress: {
        height: 7,
        borderRadius: 128,
        backgroundColor: Colors.DATE_COLOR, 
    }
})
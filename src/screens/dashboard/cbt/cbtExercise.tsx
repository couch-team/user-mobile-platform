import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ARROW_DOWN, CLOSE, INITIAL_EXERCISE, LONG_ARROW } from "assets/svg";
import { deviceHeight, deviceWidth } from "constants/layout";
import { values } from "lodash";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { $api } from "services";
import { Colors, Images, Typography } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CbtText'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const SummaryCard = ({ swipe, question, answer, number } : { swipe: (page: number) => void, question: string, answer: string, number: number }) => {
    const [ isOpen, setIsOpen ] = useState(false)
    return(
        <View >
            <TouchableOpacity style={styles.indexContainer} onPress={() => swipe(1)}>
                <Text style={styles.indexText}>{number}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.summaryContainer}>
                <View style={styles.summaryHeaderContainer}>
                    <Text numberOfLines={ isOpen ? undefined : 1} ellipsizeMode="tail" style={[styles.summaryContainerHeader, { width: !isOpen ? '90%' : '100%'  }]}>{question}</Text>
                    { !isOpen && <View><ARROW_DOWN/></View> }
                </View>
                { isOpen && <Text style={styles.summaryBodyText}>{answer}</Text> }
            </TouchableOpacity>
        </View>
    )
}

const ExerciseView = ({ goBack, text, index, img, carouselRef, total, completeReading, isSaving, values, setValues} : { goBack:() => void, index: number, img: string, text: string, carouselRef: RefObject<FlatList>, total: number, completeReading: () => void, isSaving: boolean, values: {exercise_id: string, question: string, answer: string}[], setValues: Dispatch<SetStateAction<{exercise_id: string, question: string, answer: string}[]>> }) => {
    const swipe = (swipeTo?: number) => {
        var newIndex = swipeTo ? swipeTo : index + 1;
        (carouselRef.current as any).scrollToIndex({ index: newIndex });
    };
    const width = ((index) / (total - 2)) * (deviceWidth - 48)

    return index + 1 === total ? (
        <View style={styles.parent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}><CLOSE/></TouchableOpacity>
            <View style={styles.contentContainer}>
                <View>
                    <Text style={styles.summaryHeader}>Summary</Text>
                </View>
                <ScrollView style={styles.summaryBody} showsVerticalScrollIndicator={false}>
                    <View style={styles.summaryContent}>
                        {
                            values?.map((valuetoRender, index) => {
                                return(
                                    <SummaryCard key={valuetoRender?.exercise_id} swipe={swipe} number={index + 1} answer={valuetoRender?.answer} question={valuetoRender?.question}/>
                                )
                            })
                        }
                    </View>
                    <View style={{ height: 50 }}></View>
                </ScrollView>
                <TouchableOpacity style={styles.startButton} onPress={() => completeReading()}>
                    { isSaving ? <ActivityIndicator color={Colors.WHITE} size="small"/> : <Text style={styles.buttonText}>Done</Text> }
                </TouchableOpacity>
            </View>
        </View>
    ) : (
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
                    { index === 0 && <Image source={Images['initial_exercise_image']} resizeMode="contain" style={{ width: '100%', height: (deviceWidth - 48) * (417 /382) }}/>}
                    { index === 0 && <Text style={styles.headerText}>Try to answer these questions as honestly as possible. You can fill them in here or in your personal journal.</Text> }
                    { 
                        index !==0 
                            && 
                        <View style={styles.inputContainer}>
                            <View style={styles.indexContainer}>
                                <Text style={styles.indexText}>{index}</Text>
                            </View>
                            <View style={styles.inputLabelContainer}>
                                <Text style={styles.inputLabel}>{text}</Text>
                            </View>
                            <TextInput
                                placeholder="Describe your task"
                                style={[styles.textInputBoxContainer]}
                                textAlignVertical="top"
                                multiline={true}
                                value={values[index - 1]?.answer}
                                placeholderTextColor={Colors.COUCH_BLUE_1800}
                                onChangeText={(text: string) => { 
                                    setValues(prev => {
                                        const updatedValues = [...prev];
                                        updatedValues[index -1] = {...updatedValues[index - 1], answer: text};
                                        return updatedValues;
                                    });
                                }}
                            />
                        </View>
                    }
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => swipe()}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};


const CbtExercise = ({ navigation: { goBack } }: Props) => {
    const { params } = useRoute<RouteProp<DashboardParamList, 'CbtText'>>();
    const carouselRef = useRef(null);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ values, setValues ] = useState<{exercise_id: string,  question: string, answer: string}[]>(params?.content?.map((content: any) => ({ exercise_id: content?.id, question: content?.content, answer: '' }) ));

    const completeReading = async() => {
        try{
            setIsSaving(true)
            const response = await $api.post('/api/therapy/cbt/response/', {
                is_complete: true,
                content_id: params?.id,
                responses: values?.map((valueToUpload) => ({ exercise_id: valueToUpload?.exercise_id, response: valueToUpload?.answer }))
            })
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
                data={[{},...params?.content,{}]}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => {
                    return <ExerciseView values={values} setValues={setValues} isSaving={isSaving} goBack={goBack} index={index} img={item?.image_url} text={item?.content} carouselRef={carouselRef} total={params?.content?.length + 2} completeReading={completeReading}/>;
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={carouselRef}
            />

        </SafeAreaView>
    )
}
export default CbtExercise;

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
    summaryBody: {
        marginTop: 30.5,
    },
    summaryHeader: {
        fontSize: 24,
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: "600",
        lineHeight: 30.24,
        letterSpacing: -0.48,
        color: Colors.WHITE,
        textAlign: 'center',
        paddingTop: 18
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
        marginTop: 10,
        // alignItems: 'center'
    },
    indexContainer: {
        borderColor: Colors.COUCH_BLUE_900,
        borderWidth: 1,
        borderRadius: 40,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF14',
        marginBottom: 20
    },
    indexText: {
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 28.8,
        letterSpacing: -0.64,
        color: Colors.COUCH_BLUE_1100,
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
        width: '100%',
        height: 7,
        borderRadius: 128,
        backgroundColor: '#E3E4F840',
    },
    progress: {
        height: 7,
        borderRadius: 128,
        backgroundColor: Colors.DATE_COLOR, 
    },
    inputContainer: {
        marginTop: 20,
        width: '100%'
    },
    inputLabelContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputLabel: {
        color: Colors.WHITE,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.64,
        fontFamily: Typography.fontFamily.SoraRegular
    },
    textInputBoxContainer: {
        height: 172,
        marginTop: 40,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        paddingTop: 16,
        fontFamily: Typography.fontFamily.SoraMedium,
        borderColor: Colors.COUCH_BLUE_1800,
        color: Colors.WHITE,
    },
    summaryContainer: {
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: Colors.COUCH_BLUE_1900,
    },
    summaryContainerHeader: {
        color: Colors.COUCH_BLUE_1100,
        fontFamily: Typography.fontFamily.SoraRegular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.64
    },
    summaryHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    summaryBodyText: {
        fontFamily: Typography.fontFamily.SoraRegular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.48,
        color: Colors.COUCH_TEXT_COLOR,
        marginTop: 19,
    },
    summaryContent: {
        gap: 20
    }
})
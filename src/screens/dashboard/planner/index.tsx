import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";
import { View, Image, Text, ActivityIndicator, SectionList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { BottomTabParamList, DashboardParamList } from "utils/types/navigation-types";
import { HeaderBar, HeaderText } from "components";
import { Colors, Images } from "theme/config";
import { CHECK, MOON } from "assets/svg";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Fragment, useEffect, useState } from "react";
import useAppDispatch from "hooks/useAppDispatch";
import { fetchPlans } from "store/actions/planner";
import { groupTransactions } from "utils";
import AddPlannerModal from "./components/add-planner-modal";

type DashboardNavigationProps = StackNavigationProp<
  BottomTabParamList,
  'Activities'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const ItemSeparator = () => {
    return <View style={{ height: 20 }} ><View style={[styles.horizontalLine,{ height: 20, marginLeft: 11.3, }]}></View></View>;
};
const SectionSeparator = () => {
    return <View style={{ height: 20 }}></View>;
};

const Planner = ({ navigation: { goBack, navigate, getState } }: Props) => {
    const { plans, reached_end, isFetchingPlans, hasFetchedPlans } = useSelector((state: RootState) => state.Planner);
    const dispatch = useAppDispatch();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ addJournalModalActive, setAddJournalModalActive ] = useState(false);

    useEffect(() => {
        dispatch(fetchPlans(currentPage))
    }, [ currentPage ]);

    const groupedPlans = groupTransactions(plans)

    const isBottomTabVisible = (getState().type as any)  === 'tab'

    return(
        <SafeAreaView style={styles.container}>
            <View style={[styles.plusParent, isBottomTabVisible && { paddingBottom: 110, paddingRight: 10 } ]}>
                <TouchableOpacity
                    onPress={() => setAddJournalModalActive(true)}
                    activeOpacity={0.8}
                    style={styles.plusIconContainer}>
                    <Image source={Images.plus} style={styles.plusIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.topSection}>
                <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
                <HeaderText
                    text="Hi Daniella,"
                    hasSubText="Here’s your routine for today"
                    bannerIcon={<MOON/>}
                />
            </View>
            <Image source={Images['curve']} alt="" style={styles.curve}/>
            <View style={styles.body}>
                <SectionList
                    onEndReached={() => !reached_end && !isFetchingPlans && setCurrentPage(currentPage + 1)}
                    sections={groupedPlans}
                    contentContainerStyle={styles.contentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={ItemSeparator}
                    renderSectionFooter={SectionSeparator}
                    ListEmptyComponent={
                        <View style={styles.emptyMoodTrackerContainer}>
                            <View style={styles.emptyMoodIconContainer}>
                                <Image
                                source={Images.journal}
                                resizeMode="contain"
                                style={styles.emptyMoodIcon}
                                />
                            </View>
                            <View style={styles.emptyTextContainer}>
                                <Text style={styles.emptyMainText}>
                                    Not Notes in your Journal as for now
                                </Text>
                                <Text style={styles.emptyBodyText}>
                                    Tap the '+' button below to log your mood on the mood tracker.
                                </Text>
                            </View>
                        </View>
                    }
                    ListHeaderComponent={
                        <View style={{ width: '100%' }}>
                            <Text style={styles.headerText}>Today’s Affirmation</Text>
                            <Image source={Images.affirmation} style={styles.affirmationImage} resizeMode="contain"/>
                        </View>
                    }
                    ListFooterComponent={
                        reached_end 
                        ?  
                        plans?.length > 0
                            ?           
                            <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}>
                                <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                            </View>
                            :
                            <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}></View>
                        :
                        (hasFetchedPlans && isFetchingPlans)
                            ?
                            <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}>
                                <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                            </View>
                            :
                            <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}></View>
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.cardParent}>
                                <View style={styles.cardStatus}>
                                    <View style={[styles.horizontalLine,{ height: 33 }]}></View>
                                    <View style={styles.completeCircle}>{ item?.is_complete == true && <CHECK/> }</View>
                                    <View style={[styles.horizontalLine,{ height: 33 }]}></View>
                                </View>
                                <TouchableOpacity key={index} style={styles.cardContainer}>
                                    <View style={[ styles.cardLabel, { backgroundColor: item?.colour } ]}></View>
                                    <View style={styles.itemMoodBodyContainer}>
                                        <Text style={[styles.cardHeader]}>{item?.title}</Text>
                                        <View style={styles.timeWrapper}>
                                            <View style={styles.cardTimeContainer}>
                                                <Text style={styles.cardTimeText}>
                                                    {moment(item?.start).format('hh:mm A')} -
                                                    {moment(item?.end).format('hh:mm A')}
                                                </Text>
                                            </View>
                                            <View style={styles.cardTimeContainer}>
                                                <Text style={styles.cardTimeText}>
                                                    {
                                                        moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes() > 60 
                                                            ?
                                                            (Math.floor(moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()/60)) + ' Hours' + '  ' + (moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()%60) + ' Mins'
                                                            :
                                                            (moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()) + ' Mins'
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <Text>

                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    renderSectionHeader={({ section: { title, isToday } }) => {
                        return (
                            <View style={styles.headerSectionWrapper}>
                                <View style={{ backgroundColor: Colors.PRIMARY, borderRadius: 64 }}>
                                    <View style={styles.headerSectionContainer}>
                                        <Text style={styles.headerTitleStyle}>
                                            {isToday === 'Today' ? 'TODAY' : title}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.horizontalLine,{ height: 16, marginLeft: 11.3, }]}></View>
                            </View>
                        );
                    }}
                    />
            </View>
            <AddPlannerModal isActive={addJournalModalActive} setIsActive={setAddJournalModalActive}/>
        </SafeAreaView>
    )
}
export default Planner;
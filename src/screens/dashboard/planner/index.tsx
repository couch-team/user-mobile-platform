import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";
import { View, Image, Text, ActivityIndicator, SectionList, TouchableOpacity, RefreshControl } from "react-native";
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
import { fetchPlans, fetchTodayPlans } from "store/actions/planner";
import { groupPlans, groupTransactions } from "utils";
import AddPlannerModal from "./components/add-planner-modal";
import EditPlannerModal from "./components/edit-planner-modal";
import PlanCard from "./components/cards/planCard";
import { clearPlannerReducer, setPlans } from "store/slice/plannerSlice";
import { deviceWidth, wp } from "constants/layout";
import { MindSpaceHeader } from "../mindspace/components";
import { PlannerHeader } from "./components/planner-header";

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
    const { plans, todayPlans, reached_end, isFetchingPlans, hasFetchedPlans, today_plans_reached_end, isFetchingTodayPlans, hasFetchedTodayPlans } = useSelector((state: RootState) => state.Planner);
    const dispatch = useAppDispatch();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentPageTodayPlans, setCurrentPageTodayPlans ] = useState(1);
    const [ addPlannerModalActive, setAddPlannerModalActive ] = useState(false);
    const [ editPlannerModalActive, setEditPlannerModalActive ] = useState(false);
    const { first_name } = useSelector((state: RootState) => state.User)
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchPlans(currentPage))
        dispatch(fetchTodayPlans(currentPageTodayPlans))
    }, [ currentPage ]);

    const groupedPlans = groupPlans(plans)
    const groupedTodayPlans = groupPlans(todayPlans)

    const isBottomTabVisible = (getState().type as any)  === 'tab'

    const resetPlans = () => {
        dispatch(clearPlannerReducer())
        currentPage === 1 ? getPlans() : setCurrentPage(1)
    }

    const getPlans = () => {
        dispatch(fetchPlans(1))
        dispatch(fetchTodayPlans(1))
    }

    const reachedTodayPlansEnd = () => {
        !today_plans_reached_end && !isFetchingTodayPlans && setCurrentPageTodayPlans(currentPageTodayPlans + 1)
    }

    const reachedPlansEnd = () => {
        !reached_end && !isFetchingPlans && setCurrentPage(currentPage + 1)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={[styles.plusParent, isBottomTabVisible && { paddingBottom: 110, paddingRight: 10 } ]}>
                <TouchableOpacity
                    onPress={() => setAddPlannerModalActive(true)}
                    activeOpacity={0.8}
                    style={styles.plusIconContainer}>
                    <Image source={Images.plus} style={styles.plusIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.topSection}>
                <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
                <HeaderText
                    text={`Hi ${first_name},`}
                    hasSubText="Here’s your routine for today"
                    bannerIcon={<MOON/>}
                    hasSubTextStyle={{ maxWidth: deviceWidth - wp(100) - 125 }}
                />
            </View>
            <Image source={Images['curve']} alt="" style={styles.curve}/>
            <View style={styles.body}>
                <SectionList
                    onEndReached={() => activeIndex === 0 ? reachedTodayPlansEnd() : reachedPlansEnd()  }
                    sections={ activeIndex === 0 ? groupedTodayPlans : groupedPlans}
                    contentContainerStyle={styles.contentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={ItemSeparator}
                    renderSectionFooter={SectionSeparator}
                    refreshControl={
                        <RefreshControl
                            refreshing={(isFetchingPlans || isFetchingTodayPlans) && (plans?.length === 0 || todayPlans?.length === 0 )}
                            onRefresh={() => resetPlans()}
                            colors={['#ffffff']}
                            progressBackgroundColor="#0D0E36"
                        />
                    }
                    ListEmptyComponent={
                        isFetchingPlans
                        ?
                            <View></View>
                        :
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
                                    No Tasks in your planner for now
                                </Text>
                                <Text style={styles.emptyBodyText}>
                                    Tap the '+' button below to add a task to your planner.
                                </Text>
                            </View>
                        </View>
                    }
                    ListHeaderComponent={
                        <View>
                            <View style={{ width: '100%', marginBottom: 20 }}>
                                <Text style={styles.headerText}>Today’s Affirmation</Text>
                                <Image source={Images.affirmation} style={styles.affirmationImage} resizeMode="contain"/>
                            </View>
                            <PlannerHeader
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        </View>
                    }
                    ListFooterComponent={
                        activeIndex === 0
                            ?
                        today_plans_reached_end
                            ?  
                            todayPlans?.length > 0
                                ?           
                                <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}>
                                    <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
                                </View>
                                :
                                <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}></View>
                            :
                            (hasFetchedTodayPlans && isFetchingTodayPlans)
                                ?
                                <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}>
                                    <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                                </View>
                                :
                                <View style={[styles.reachedEndContainer, isBottomTabVisible && { height: 170 } ]}></View>
                            :
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
                            <PlanCard item={item} index={index}/>
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
            <AddPlannerModal isActive={addPlannerModalActive} setIsActive={setAddPlannerModalActive}/>
        </SafeAreaView>
    )
}
export default Planner;
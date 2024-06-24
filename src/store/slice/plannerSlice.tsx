import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPlannerPayload {
    plans: any[],
    isFetchingPlans: boolean,
    plans_last_page: number,
    plans_current_page: number,
    hasFetchedPlans: boolean,
    reached_end: boolean,
    todayPlans: any[],
    isFetchingTodayPlans: boolean,
    today_plans_last_page: number,
    today_plans_current_page: number,
    hasFetchedTodayPlans: boolean,
    today_plans_reached_end: boolean,
}
const initialState:IPlannerPayload = {
    plans: [],
    isFetchingPlans: false,
    plans_last_page: 1,
    plans_current_page: 1,
    hasFetchedPlans: false,
    reached_end: false,
    todayPlans: [],
    isFetchingTodayPlans: false,
    today_plans_last_page: 1,
    today_plans_current_page: 1,
    hasFetchedTodayPlans: false,
    today_plans_reached_end: false,
}
const PlannerSlice = createSlice({
    name: 'planner',
    initialState,
    reducers: {
        setPlans: (state, { payload }:PayloadAction<any[]>) => { state.plans = payload },
        setIsFetchingPlans: (state, { payload }:PayloadAction<boolean>) => { state.isFetchingPlans = payload },
        setPlansLastPage: ( state, { payload }:PayloadAction<number> ) => { state.plans_last_page = payload },
        setPlansCurrentPage: ( state, { payload }:PayloadAction<number> ) => { state.plans_current_page = payload },
        setHasFetchedPlans: ( state, { payload }:PayloadAction<boolean> ) => { state.hasFetchedPlans = payload },
        setHasReachedEnd: ( state, { payload }:PayloadAction<boolean> ) => { state.reached_end = payload },
        setTodayPlans: (state, { payload }:PayloadAction<any[]>) => { state.todayPlans = payload },
        setIsFetchingTodayPlans: (state, { payload }:PayloadAction<boolean>) => { state.isFetchingTodayPlans = payload },
        setTodayPlansLastPage: ( state, { payload }:PayloadAction<number> ) => { state.today_plans_last_page = payload },
        setTodayPlansCurrentPage: ( state, { payload }:PayloadAction<number> ) => { state.today_plans_current_page = payload },
        setHasFetchedTodayPlans: ( state, { payload }:PayloadAction<boolean> ) => { state.hasFetchedTodayPlans = payload },
        setTodayPlansReachedEnd: ( state, { payload }:PayloadAction<boolean> ) => { state.today_plans_reached_end = payload },
        clearPlannerReducer: state => {
            state.plans = [];
            state.hasFetchedPlans = false;
            state.isFetchingPlans = false;
            state.plans_current_page = 1;
            state.plans_last_page = 1;
            state.reached_end = false;
            state.todayPlans = [];
            state.hasFetchedTodayPlans = false;
            state.isFetchingTodayPlans = false;
            state.today_plans_current_page = 1;
            state.today_plans_last_page = 1;
            state.today_plans_reached_end = false;
        },
    }
})

const PlannerReducer = PlannerSlice.reducer
export default PlannerReducer;
export const { setPlans, setHasReachedEnd, setHasFetchedPlans, setIsFetchingPlans, setPlansCurrentPage, setPlansLastPage, clearPlannerReducer, setHasFetchedTodayPlans, setIsFetchingTodayPlans, setTodayPlans, setTodayPlansCurrentPage, setTodayPlansLastPage, setTodayPlansReachedEnd } = PlannerSlice.actions
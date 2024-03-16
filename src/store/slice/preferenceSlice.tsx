import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPreferencePayload {
    physical_status: string,
    ever_had_therapy: "YES" | "NO" | "",
    referral_channel: string,
    goal: string[]
}

const initialState:IPreferencePayload = {
    physical_status: "",
    ever_had_therapy: "",
    referral_channel: "",
    goal: [] 
}

const preferenceSlice = createSlice({
    name: "preference",
    initialState,
    reducers: {
        setPhysicalStatus: ( state, { payload }:PayloadAction<string> ) => { state.physical_status = payload },
        setEverHadTherapy: ( state, { payload }:PayloadAction<"YES" | "NO" | ""> ) => { state.ever_had_therapy = payload },
        setReferralChannel: ( state, { payload }:PayloadAction<string> ) => { state.referral_channel = payload },
        setGoal: ( state, { payload }:PayloadAction<string[]> ) => { state.goal = payload }
    }
})

export const { setPhysicalStatus, setEverHadTherapy, setGoal, setReferralChannel } = preferenceSlice.actions

const PreferenceReducer = preferenceSlice.reducer
export default PreferenceReducer;
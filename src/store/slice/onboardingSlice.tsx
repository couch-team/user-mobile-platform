import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IOnboardingPayload {
    gender: string,
    dob: string,
    avatar_url: string,
    country: string,
    state_of_residence: string
}

const initialState:IOnboardingPayload = {
    gender: '',
    dob: '',
    avatar_url: '',
    country: '',
    state_of_residence: ''
}
const OnboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setGender: (state, { payload }:PayloadAction<string>) => { state.gender = payload },
        setDob: (state, { payload }:PayloadAction<string>) => { state.dob = payload },
        setAvatarUrl: ( state, { payload }:PayloadAction<string> ) => { state.avatar_url = payload },
        setCountry: ( state, { payload }:PayloadAction<string> ) => { state.country = payload },
        setStateOfResidence: ( state, { payload }:PayloadAction<string> ) => { state.state_of_residence = payload },
    }
})
const OnboardingReducer = OnboardingSlice.reducer
export const { setGender, setDob, setCountry, setAvatarUrl, setStateOfResidence } = OnboardingSlice.actions
export default OnboardingReducer;
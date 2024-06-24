import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuthPayload {
    access_token: string,
    refresh_token: string,
    email: string,
    is_loading: boolean,
    push_notifications_setup: boolean
}

const initialState:IAuthPayload = {
    access_token: '',
    refresh_token: '',
    email: '',
    is_loading: false,
    push_notifications_setup: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, { payload }:PayloadAction<string>) => { state.access_token = payload },
        setRefreshToken: (state, { payload }: PayloadAction<string>) => { state.refresh_token = payload },
        setEmail: (state, { payload }:PayloadAction<string>) => { state.email= payload },
        setIsLoading: (state, { payload }:PayloadAction<boolean>) => { state.is_loading = payload },
        setPushNotificationsSetup: (state, { payload }:PayloadAction<boolean>) => { state.push_notifications_setup = payload },
    }
})
const AuthReducer = AuthSlice.reducer
export default AuthReducer;

export const { 
    setAccessToken,
    setEmail,
    setRefreshToken,
    setIsLoading,
    setPushNotificationsSetup
} = AuthSlice.actions
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import { $api } from "services";
import { AppThunk } from "store";
import { fetchUserDetails } from "./userSlice";

interface IAuthPayload {
    access_token: string,
    refresh_token: string,
    email: string,
    is_loading: boolean,
}

const initialState:IAuthPayload = {
    access_token: '',
    refresh_token: '',
    email: '',
    is_loading: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, { payload }:PayloadAction<string>) => { state.access_token = payload },
        setRefreshToken: (state, { payload }: PayloadAction<string>) => { state.refresh_token = payload },
        setEmail: (state, { payload }:PayloadAction<string>) => { state.email= payload },
        setIsLoading: (state, { payload }:PayloadAction<boolean>) => { state.is_loading = payload },
        logout: (state) => {
            AsyncStorage.clear()
            state.access_token = ''
        },
    }
})
const AuthReducer = AuthSlice.reducer
export default AuthReducer;

export const { 
    setAccessToken, 
    logout,
    setEmail,
    setRefreshToken,
    setIsLoading
} = AuthSlice.actions

export const login = ({ email, password } : {email: string, password: string} ):AppThunk => async(dispatch) => {
    try{
        dispatch(setIsLoading(true))
        const response = await $api.post('/api/auth/login/', { email, password })
        if($api.isSuccessful(response)){
            showMessage({
              message: 'Logged in successfully',
              duration: 3000,
              type: 'success',
            });
            dispatch(setEmail(email))
            dispatch(setAccessToken(response?.data?.access))
            dispatch(setRefreshToken(response?.data?.refresh))
            dispatch(fetchUserDetails())
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        setIsLoading(false)
    }
}
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import { $api } from "services";
import { AppThunk } from "store";

interface IAuthPayload {
    access_token: string,
    refresh_token: string,
    email: string,
}

const initialState:IAuthPayload = {
    access_token: '',
    refresh_token: '',
    email: '',
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, { payload }:PayloadAction<string>) => { state.access_token = payload },
        setRefreshToken: (state, { payload }: PayloadAction<string>) => { state.refresh_token = payload },
        setEmail: (state, { payload }:PayloadAction<string>) => { state.email= payload },
        logout: (state) => {
            state.access_token = '';
            state.refresh_token = '';
            state.email = '';
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
} = AuthSlice.actions

export const login = ({ email, password } : {email: string, password: string} ):AppThunk => async(dispatch) => {
    try{
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
        }
    }
    catch(err){
        console.log(err)
    }
}
import { showMessage } from "react-native-flash-message";
import { $api } from "services";
import { AppThunk } from "store";
import { setAccessToken, setEmail, setIsLoading, setRefreshToken } from "store/slice/authSlice";
import { setFirstName, setLastName, setPreference, setProfile, setUserActive, setUserDataLoading, setUserId, setUserVerified } from "store/slice/userSlice";

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
            dispatch(setRefreshToken(response?.data?.refresh))
            dispatch(setUserDataLoading(response?.data?.user?.data))
            dispatch(setFirstName(response?.data?.user?.first_name))
            dispatch(setLastName(response?.data?.user?.last_name))
            dispatch(setProfile(response?.data?.user?.profile))
            dispatch(setPreference(response?.data?.user?.preference))
            dispatch(setUserId(response?.data?.user?.id))
            dispatch(setUserActive(response?.data?.user?.is_active))
            dispatch(setUserVerified(response?.data?.user?.is_verified))
            dispatch(setAccessToken(response?.data?.access))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        setIsLoading(false)
    }
}
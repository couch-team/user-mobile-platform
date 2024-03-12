import debounce from "helpers/debounce"
import { $api } from "services"
import { AppThunk } from "store"
import { setHasFetchedMoods, setIsFetchingMoods, setMoods, setMoodsCurrentPage, setMoodsLastPage, setReachedEnd } from "store/slice/moodSlice"

const debounceFetchMoods = debounce(async(current_page, dispatch) => {
    try{
        const response = await $api.fetch(`/api/mood/log/?page=${current_page}`)
        if($api.isSuccessful(response)){
            response?.data?.results?.length > 0 ? dispatch(setMoods(response?.data?.results)) : dispatch(setReachedEnd(true))
            dispatch(setMoodsLastPage(response?.data?.count /15))
        }
        else{
            response?.response?.status == 404 && dispatch(setReachedEnd(true))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        dispatch(setIsFetchingMoods(false))
    }
}, 1000)

export const fetchMoods = (current_page: number, isSilent?: boolean):AppThunk => async(dispatch) => {
    dispatch(setMoodsCurrentPage(current_page))
    dispatch(setHasFetchedMoods(true))
    !isSilent && dispatch(setIsFetchingMoods(true))
    debounceFetchMoods(current_page, dispatch)
}
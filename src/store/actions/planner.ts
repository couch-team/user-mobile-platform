import debounce from "helpers/debounce"
import { $api } from "services"
import { AppThunk } from "store"
import { setHasFetchedPlans, setHasFetchedTodayPlans, setHasReachedEnd, setIsFetchingPlans, setIsFetchingTodayPlans, setPlans, setPlansCurrentPage, setPlansLastPage, setTodayPlans, setTodayPlansCurrentPage, setTodayPlansLastPage, setTodayPlansReachedEnd } from "store/slice/plannerSlice"

const debounceFetchPlans = debounce(async(current_page, dispatch) => {
    try{
        const response = await $api.fetch(`/api/planner/todo/?page=${current_page}`)
        if($api.isSuccessful(response)){
            response?.data?.results?.length > 0 ? dispatch(setPlans(response?.data?.results)) : dispatch(setHasReachedEnd(true))
            dispatch(setPlansLastPage(response?.data?.count /15))
        }
        else{
            response?.response?.status == 404 && dispatch(setHasReachedEnd(true))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        dispatch(setIsFetchingPlans(false))
    }
}, 1000)

export const fetchPlans = (current_page: number, isSilent?: boolean):AppThunk => async(dispatch) => {
    dispatch(setPlansCurrentPage(current_page))
    dispatch(setHasFetchedPlans(true))
    !isSilent && dispatch(setIsFetchingPlans(true))
    debounceFetchPlans(current_page, dispatch)
}

const debounceFetchTodayPlans = debounce(async(current_page, dispatch) => {
    try{
        const response = await $api.fetch(`/api/planner/todo/today/?page=${current_page}`)
        if($api.isSuccessful(response)){
            response?.data?.results?.length > 0 ? dispatch(setTodayPlans(response?.data?.results)) : dispatch(setTodayPlansReachedEnd(true))
            dispatch(setTodayPlansLastPage(response?.data?.count /15))
        }
        else{
            response?.response?.status == 404 && dispatch(setTodayPlansReachedEnd(true))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        dispatch(setIsFetchingTodayPlans(false))
    }
}, 1000)

export const fetchTodayPlans = (current_page: number, isSilent?: boolean):AppThunk => async(dispatch) => {
    dispatch(setTodayPlansCurrentPage(current_page))
    dispatch(setHasFetchedTodayPlans(true))
    !isSilent && dispatch(setIsFetchingTodayPlans(true))
    debounceFetchTodayPlans(current_page, dispatch)
}
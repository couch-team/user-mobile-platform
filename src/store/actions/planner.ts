import debounce from "helpers/debounce"
import { $api } from "services"
import { AppThunk } from "store"
import { setHasFetchedPlans, setHasReachedEnd, setIsFetchingPlans, setPlans, setPlansCurrentPage, setPlansLastPage } from "store/slice/plannerSlice"

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
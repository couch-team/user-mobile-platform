import debounce from "helpers/debounce"
import { $api } from "services"
import { AppThunk } from "store"
import { setHasFetchedCbts, setIsFetchingCbts, setCbts, setCbtsCurrentPage, setCbtsLastPage, setReachedEnd } from "store/slice/cbtSlice";

const debounceFetchCbts = debounce(async(current_page, dispatch) => {
    try{
        const response = await $api.fetch(`/api/therapy/cbt/?page=${current_page}`)
        if($api.isSuccessful(response)){
            response?.data?.results?.length > 0 ? dispatch(setCbts(response?.data?.results)) : dispatch(setReachedEnd(true))
            dispatch(setCbtsLastPage(response?.data?.count /15))
        }
        else{
            response?.response?.status == 404 && dispatch(setReachedEnd(true))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        dispatch(setIsFetchingCbts(false))
    }
}, 1000)

export const fetchCbts = (current_page: number, isSilent?: boolean):AppThunk => async(dispatch) => {
    dispatch(setCbtsCurrentPage(current_page))
    dispatch(setHasFetchedCbts(true))
    !isSilent && dispatch(setIsFetchingCbts(true))
    debounceFetchCbts(current_page, dispatch)
}
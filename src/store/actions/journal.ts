import debounce from "helpers/debounce"
import { $api } from "services"
import { AppThunk } from "store"
import { setHasFetchedJournals, setIsFetchingJournals, setJournals, setJournalsCurrentPage, setJournalsLastPage } from "store/slice/journalSlice"

const debounceFetchJournals = debounce(async(current_page, dispatch) => {
    try{
        const response = await $api.fetch(`/api/journal/log/?page=${current_page}`)
        if($api.isSuccessful(response)){
            dispatch(setJournals(response?.data?.results))
            dispatch(setJournalsLastPage(response?.data?.count /10))
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        dispatch(setIsFetchingJournals(false))
    }
}, 1000)

export const fetchJournals = (current_page: number, isSilent?: boolean):AppThunk => async(dispatch) => {
    dispatch(setJournalsCurrentPage(current_page))
    dispatch(setHasFetchedJournals(true))
    !isSilent && dispatch(setIsFetchingJournals(true))
    debounceFetchJournals(current_page, dispatch)
}
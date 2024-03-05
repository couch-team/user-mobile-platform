import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { $api } from "services";
import { AppThunk } from "store";

export interface JournalType  {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    document: string;
    uploads: {
      id: string;
      created_at: string;
      updated_at: string;
      upload_url: string;
      type: string;
      length: string;
    }[];
    prompt: {
      id: string;
      created_at: string;
      updated_at: string;
      prompt: string;
    };
    mood: {
      id: string;
      title: string;
      icon_url: string;
    };
    mood_id: string;
}

interface IJournalsPayload {
    journals: JournalType[],
    isFetchingJournals: boolean,
    journals_last_page: number,
    journals_current_page: number,
    hasFetchedJournals: boolean,
}

const initialState:IJournalsPayload = {
    journals: [],
    isFetchingJournals: false,
    journals_last_page: 1,
    journals_current_page: 1,
    hasFetchedJournals: false,
}

const JournalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        setJournals: (state, { payload }:PayloadAction<JournalType[]>) => { state.journals = payload },
        setIsFetchingJournals: ( state, { payload }:PayloadAction<boolean> ) => { state.isFetchingJournals = payload },
        setHasFetchedJournals: ( state, { payload }:PayloadAction<boolean> ) => { state.hasFetchedJournals = payload },
        setJournalsCurrentPage: (state, { payload }:PayloadAction<number>) => { state.journals_current_page = payload },
        setJournalsLastPage: (state, { payload }:PayloadAction<number>) => { state.journals_last_page = payload },
    }
})

const JournalReducer = JournalSlice.reducer;
export default JournalReducer;

export const { setJournals, setIsFetchingJournals, setHasFetchedJournals, setJournalsCurrentPage, setJournalsLastPage } = JournalSlice.actions

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
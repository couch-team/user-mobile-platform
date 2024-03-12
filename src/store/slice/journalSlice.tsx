import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

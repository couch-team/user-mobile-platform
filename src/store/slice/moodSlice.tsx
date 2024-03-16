import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { $api } from 'services';
import { AppThunk } from 'store';

export interface MoodType {
  id: string;
  created_at: string;
  updated_at: string;
  mood: {
    id: string;
    title: string;
    icon_url: string;
  };
  mood_id: string;
  description: string;
}

interface IMoodsPayload {
  moods: MoodType[];
  isFetchingMoods: boolean;
  moods_last_page: number;
  moods_current_page: number;
  hasFetchedMoods: boolean;
  reached_end: boolean;
}

const initialState: IMoodsPayload = {
  moods: [],
  isFetchingMoods: false,
  moods_last_page: 1,
  moods_current_page: 1,
  hasFetchedMoods: false,
  reached_end: false,
};
const MoodSlice = createSlice({
  name: 'Mood',
  initialState,
  reducers: {
    setMoods: (state, { payload }: PayloadAction<MoodType[]>) => {
      const uniqueMoods = payload.filter(
        newMood =>
          !state.moods.some(existingMood => existingMood.id === newMood.id),
      );
      state.moods = [...state.moods, ...uniqueMoods];
    },
    setIsFetchingMoods: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingMoods = payload;
    },
    setHasFetchedMoods: (state, { payload }: PayloadAction<boolean>) => {
      state.hasFetchedMoods = payload;
    },
    setMoodsCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.moods_current_page = payload;
    },
    setMoodsLastPage: (state, { payload }: PayloadAction<number>) => {
      state.moods_last_page = payload;
    },
    setReachedEnd: (state, { payload }: PayloadAction<boolean>) => {
      state.reached_end = payload;
    },
    clearMoodReducer: state => {
      state.moods = [];
      state.hasFetchedMoods = false;
      state.isFetchingMoods = false;
      (state.moods_current_page = 1), (state.moods_last_page = 1);
      state.reached_end = false;
    },
  },
});

const MoodReducer = MoodSlice.reducer;
export default MoodReducer;

const debounceFetchJournalMoods = debounce(async (current_page, dispatch) => {
  try {
    const response = await $api.fetch('/api/mood/mood/');
    if ($api.isSuccessful(response)) {
      dispatch(setMoods(response?.data));
      dispatch(setMoodsLastPage(response?.data?.count / 10));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsFetchingMoods(false));
  }
}, 1000);

export const fetchJournalMoods =
  (current_page: number, isSilent?: boolean): AppThunk =>
  async dispatch => {
    dispatch(setMoodsCurrentPage(current_page));
    dispatch(setHasFetchedMoods(true));
    !isSilent && dispatch(setIsFetchingMoods(true));
    debounceFetchJournalMoods(current_page, dispatch);
  };
export const {
  setMoods,
  setMoodsCurrentPage,
  setMoodsLastPage,
  setHasFetchedMoods,
  setIsFetchingMoods,
  setReachedEnd,
  clearMoodReducer,
} = MoodSlice.actions;

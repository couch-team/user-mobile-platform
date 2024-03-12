import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoDashExplicitStringWrapper, debounce } from 'lodash';
import { $api } from 'services';
import { AppThunk } from 'store';

export interface MoodType {
  id: string;
  created_at: string;
  updated_at: string;
  user: LoDashExplicitStringWrapper;
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
}

const initialState: IMoodsPayload = {
  moods: [],
  isFetchingMoods: false,
  moods_last_page: 1,
  moods_current_page: 1,
  hasFetchedMoods: false,
};
const MoodSlice = createSlice({
  name: 'Mood',
  initialState,
  reducers: {
    setMoods: (state, { payload }: PayloadAction<MoodType[]>) => {
      state.moods = payload;
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
  },
});

const MoodReducer = MoodSlice.reducer;
export default MoodReducer;

export const {
  setMoods,
  setMoodsCurrentPage,
  setMoodsLastPage,
  setHasFetchedMoods,
  setIsFetchingMoods,
} = MoodSlice.actions;

const debounceFetchMoods = debounce(async (current_page, dispatch) => {
  try {
    const response = await $api.fetch('/api/mood/mood/');
    if ($api.isSuccessful(response)) {
      console.log(response?.data, 'Mood Response');
      dispatch(setMoods(response?.data));
      dispatch(setMoodsLastPage(response?.data?.count / 10));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsFetchingMoods(false));
  }
}, 1000);

export const fetchMoods =
  (current_page: number, isSilent?: boolean): AppThunk =>
  async dispatch => {
    dispatch(setMoodsCurrentPage(current_page));
    dispatch(setHasFetchedMoods(true));
    !isSilent && dispatch(setIsFetchingMoods(true));
    debounceFetchMoods(current_page, dispatch);
  };

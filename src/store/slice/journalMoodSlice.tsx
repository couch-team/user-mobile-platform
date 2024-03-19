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
  hasFetchedMoods: boolean;
}

const initialState: IMoodsPayload = {
  moods: [],
  isFetchingMoods: false,
  hasFetchedMoods: false,
};
const JournalMoodSlice = createSlice({
  name: 'JournalMood',
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
    clearMoodReducer: state => {
      state.moods = [];
      state.hasFetchedMoods = false;
      state.isFetchingMoods = false;
    },
  },
});

const JournalMoodReducer = JournalMoodSlice.reducer;
export default JournalMoodReducer;

const debounceFetchJournalMoods = debounce(async (current_page, dispatch) => {
  try {
    const response = await $api.fetch('/api/mood/mood/');
    if ($api.isSuccessful(response)) {
      dispatch(setMoods(response?.data));
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
    dispatch(setHasFetchedMoods(true));
    !isSilent && dispatch(setIsFetchingMoods(true));
    debounceFetchJournalMoods(current_page, dispatch);
  };
export const {
  setMoods,
  setHasFetchedMoods,
  setIsFetchingMoods,
  clearMoodReducer,
} = JournalMoodSlice.actions;

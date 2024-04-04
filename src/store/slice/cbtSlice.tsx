import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IcbtsPayload {
  cbts: any[];
  isFetchingCbts: boolean;
  cbts_last_page: number;
  cbts_current_page: number;
  hasFetchedCbts: boolean;
  reached_end: boolean;
}

const initialState: IcbtsPayload = {
  cbts: [],
  isFetchingCbts: false,
  cbts_last_page: 1,
  cbts_current_page: 1,
  hasFetchedCbts: false,
  reached_end: false,
};
const CbtSlice = createSlice({
  name: 'cbt',
  initialState,
  reducers: {
    setCbts: (state, { payload }: PayloadAction<any[]>) => {
      const uniquecbts = payload.filter(
        newcbt =>
          !state.cbts.some(existingcbt => existingcbt.id === newcbt.id),
      );
      state.cbts = [...state.cbts, ...uniquecbts];
    },
    setIsFetchingCbts: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingCbts = payload;
    },
    setHasFetchedCbts: (state, { payload }: PayloadAction<boolean>) => {
      state.hasFetchedCbts = payload;
    },
    setCbtsCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.cbts_current_page = payload;
    },
    setCbtsLastPage: (state, { payload }: PayloadAction<number>) => {
      state.cbts_last_page = payload;
    },
    setReachedEnd: (state, { payload }: PayloadAction<boolean>) => {
      state.reached_end = payload;
    },
    clearCbtReducer: state => {
      state.cbts = [];
      state.hasFetchedCbts = false;
      state.isFetchingCbts = false;
      (state.cbts_current_page = 1), (state.cbts_last_page = 1);
      state.reached_end = false;
    },
  },
});

const cbtReducer = CbtSlice.reducer;
export default cbtReducer;

export const {
  setCbts,
  setCbtsCurrentPage,
  setCbtsLastPage,
  setHasFetchedCbts,
  setIsFetchingCbts,
  setReachedEnd,
  clearCbtReducer,
} = CbtSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { $api } from 'services';
import { AppThunk } from 'store';

interface IUserPayload {
  is_loading: boolean;
  email: string;
  first_name: string;
  last_name: string;
  user_id: string;
  avatar_url: string;
  is_active: boolean;
  is_verified: boolean;
  goal: string[];
  profile: {
    id: string;
    gender: string;
    dob: string;
    avatar_url: string;
    country: string;
    state_of_residence: string;
  } | null;
  preference: {
    id: string;
    physical_status: string;
    ever_had_therapy: string;
    referral_channel: string;
    goal: string[];
  } | null;
}

const initialState: IUserPayload = {
  is_loading: false,
  first_name: '',
  last_name: '',
  email: '',
  user_id: '',
  avatar_url: '',
  is_active: false,
  is_verified: false,
  goal: [],
  profile: null,
  preference: null,
};

const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFirstName: (state, { payload }: PayloadAction<string>) => {
      state.first_name = payload;
    },
    setLastName: (state, { payload }: PayloadAction<string>) => {
      state.last_name = payload;
    },
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.user_id = payload;
    },
    setProfile: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        gender: string;
        dob: string;
        avatar_url: string;
        country: string;
        state_of_residence: string;
      } | null>,
    ) => {
      state.profile = payload;
    },
    setPreference: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        physical_status: string;
        ever_had_therapy: string;
        referral_channel: string;
        goal: string[];
      } | null>,
    ) => {
      state.preference = payload;
    },
    setAvatarUrl: (state, { payload }: PayloadAction<string>) => {
      state.avatar_url = payload;
    },
    setUserActive: (state, { payload }: PayloadAction<boolean>) => {
      state.is_active = payload;
    },
    setUserVerified: (state, { payload }: PayloadAction<boolean>) => {
      state.is_active = payload;
    },
    setUserDataLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.is_loading = payload;
    },
  },
});
const UserReducer = UserSlice.reducer;
export default UserReducer;

export const {
  setAvatarUrl,
  setProfile,
  setPreference,
  setFirstName,
  setLastName,
  setUserActive,
  setUserId,
  setUserVerified,
  setUserDataLoading,
} = UserSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PreferencesState {
  [preferenceId: number]: boolean;
}

interface SetPreferencePayload {
  preferenceId: number;
  value: boolean;
}

const initialState: PreferencesState = {};

const PreferencesSlice = createSlice({
  name: 'notifypreferences',
  initialState,
  reducers: {
    setPreference: (state, action: PayloadAction<SetPreferencePayload>) => {
      const { preferenceId, value } = action.payload;
      state[preferenceId] = value;
    },
  },
});

export const { setPreference } = PreferencesSlice.actions;
const NotificationPreferencesReducer = PreferencesSlice.reducer;
export default NotificationPreferencesReducer;

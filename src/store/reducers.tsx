import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './slice/authSlice';
import UserReducer from './slice/userSlice';
import OnboardingReducer from './slice/onboardingSlice';
import JournalReducer from './slice/journalSlice';
import MoodReducer from './slice/moodSlice';
import PreferenceReducer from './slice/preferenceSlice';
import JournalMoodReducer from './slice/journalMoodSlice';

const CombinedReducers = combineReducers({
  Auth: AuthReducer,
  User: UserReducer,
  Onboarding: OnboardingReducer,
  Journal: JournalReducer,
  Mood: MoodReducer,
  Preference: PreferenceReducer,
  JournalMood: JournalMoodReducer,
});
export default CombinedReducers;
export type ICombinedReducer = ReturnType<typeof CombinedReducers>;

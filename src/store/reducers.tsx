import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './slice/authSlice';
import UserReducer from './slice/userSlice';
import OnboardingReducer from './slice/onboardingSlice';
import JournalReducer from './slice/journalSlice';
import MoodReducer from './slice/moodSlice';
import PreferenceReducer from './slice/preferenceSlice';
import JournalMoodReducer from './slice/journalMoodSlice';
import PlannerReducer from './slice/plannerSlice';

const CombinedReducers = combineReducers({
  Auth: AuthReducer,
  User: UserReducer,
  Onboarding: OnboardingReducer,
  Journal: JournalReducer,
  Mood: MoodReducer,
  Preference: PreferenceReducer,
  Planner: PlannerReducer,
  JournalMood: JournalMoodReducer,
});
export default CombinedReducers;
export type ICombinedReducer = ReturnType<typeof CombinedReducers>;

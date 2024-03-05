import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import UserReducer from "./slice/userSlice";
import { Action } from "redux";
import OnboardingReducer from "./slice/onboardingSlice";
import JournalReducer from "./slice/journalSlice";
import MoodReducer from "./slice/moodSlice";

const CombinedReducers = combineReducers({
	Auth: AuthReducer,
    User: UserReducer,
    Onboarding: OnboardingReducer,
    Journal: JournalReducer,
    Mood: MoodReducer,
});
export default CombinedReducers;
export type ICombinedReducer = ReturnType<typeof CombinedReducers>

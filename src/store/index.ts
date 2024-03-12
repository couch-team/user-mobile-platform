import { Action, AnyAction, configureStore, Reducer, ThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CombinedReducers, { ICombinedReducer } from "./reducers";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
    key: 'couch_root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['Mood'],
};

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        console.log('logout action received')
      return CombinedReducers(undefined, action)
    }
  
    return CombinedReducers(state, action)
}
const persistedReducer = persistReducer<ICombinedReducer, Action<any>>(
    persistConfig,
    rootReducer
  );

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const persistor = persistStore(store);
export default store;
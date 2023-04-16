import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from '../models';
import persistPlugin from '@rematch/persist';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { persistPluginConfig } from '../persist';

type FullModel = ExtraModelsFromLoading<RootModel, { type: 'boolean' }>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [
    loadingPlugin({ type: 'boolean' }),
    persistPlugin(persistPluginConfig),
  ],
  redux: {
    rootReducers: { RESET_APP: () => undefined },
  },
});

export type RootState = RematchRootState<RootModel, FullModel>;
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;

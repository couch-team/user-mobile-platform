import AsyncStorage from '@react-native-async-storage/async-storage';
import { AllFilters } from '../filters';

const blacklist: [] = [];

export const persistPluginConfig = {
  key: 'root',
  blacklist,
  version: 2,
  storage: AsyncStorage,
  transforms: AllFilters,
};

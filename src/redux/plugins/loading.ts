import createLoadingPlugin from '@rematch/loading';
import { getModelKeys } from '../../utils';
import { Auth } from '../models/Auth';

export const loadingPlugin = createLoadingPlugin({
  whitelist: [...getModelKeys(Auth)],
});

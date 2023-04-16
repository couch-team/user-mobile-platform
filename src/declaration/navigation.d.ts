import { RootNavigationRoutes } from '../utils/types/navigation-types';

export type StackParamsList = RootNavigationRoutes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {}
  }
}

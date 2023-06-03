import { createNavigationContainerRef } from '@react-navigation/native';
import { DashboardParamList } from 'utils/types/navigation-types';

export const navigationRef = createNavigationContainerRef();

export type Navigation = {
  goBack: () => void;
  navigate: <RouteName extends keyof DashboardParamList>(
    ...args: RouteName extends unknown
      ? undefined extends DashboardParamList[RouteName]
        ?
            | [screen: RouteName]
            | [screen: RouteName, params: DashboardParamList[RouteName]]
        : [screen: RouteName, params: DashboardParamList[RouteName]]
      : never
  ) => void;
};

export const navigation: Navigation = {
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
  navigate: (...args) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(...args);
    }
  },
};

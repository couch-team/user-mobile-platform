import React, { useEffect, useState } from 'react';
import { View, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { DashboardParamList } from 'utils/types/navigation-types';
import { HeaderText, HeaderBar } from 'components';
import NotificationHeader from './components/NotificationHeader';
// import { notifications } from 'constants/data';
import RenderNotificationList from './components/RenderNotificationList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { $api } from 'services';
import NotificationSection from './components/notificationSection';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};
// 
const Notifications = ({ navigation: { goBack } }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Notifications"
        hasSubText="it's a beautiful morning Today..."
      />
      <NotificationHeader
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <NotificationSection index={activeIndex}/>
    </SafeAreaView>
  );
};

export default Notifications;

import React, { useState } from 'react';
import { View, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import HeaderText from 'components/base/header-text';
import NotificationHeader from './components/NotificationHeader';
import { notifications } from 'constants/data';
import RenderNotificationList from './components/RenderNotificationList';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

export const groupAccounts = (data = []) => {
  let transGroup = [{ data: data }];
  return transGroup.reverse();
};

const Notifications = ({ navigation: { goBack } }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const RenderBottomSection = () => {
    const moodTrackers = notifications.filter(t => t.title === 'Mood trackers');
    const therapy = notifications.filter(t => t.title === 'Therapy');
    const community = notifications.filter(t => t.title === 'Community');
    const productivity = notifications.filter(t => t.title === 'Productivity');
    const store = notifications.filter(t => t.title === 'Store');

    const getCurrentDetials = () => {
      switch (activeIndex) {
        case 0:
          return moodTrackers;

        case 1:
          return therapy;

        case 2:
          return community;

        case 3:
          return productivity;

        case 4:
          return store;

        default:
          return moodTrackers;
      }
    };
    //@ts-ignore
    const data = groupAccounts(getCurrentDetials());

    return (
      <View>
        <SectionList
          style={styles.sectionListStyle}
          sections={data}
          contentContainerStyle={styles.sectionListContainer}
          renderItem={({ item, index }) => {
            // TODO: implement empty state for notifications
            return <RenderNotificationList key={index} item={item} />;
          }}
        />
      </View>
    );
  };
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
      <RenderBottomSection />
    </SafeAreaView>
  );
};

export default Notifications;

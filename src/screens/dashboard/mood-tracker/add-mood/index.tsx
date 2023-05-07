import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, Images } from 'theme/config';
import ProgressHeader from 'components/base/progress-header';
import { wp } from 'constants/layout';
import HeaderText from 'components/base/header-text';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddMood = ({ navigation: { navigate, goBack } }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerRight={
          <NotificationIcon
            tintColor={Colors.COUCH_BLUE}
            sharedImage={Images.x}
            onPressIcon={() => goBack()}
          />
        }
      />
      <ProgressHeader progressWidth={wp(98)} firstProgress={1} />
      <HeaderText
        text="Hey John"
        hasSubText="How do you feel today?"
        headerTextStyle={styles.headerTextStyle}
      />
    </SafeAreaView>
  );
};

export default AddMood;

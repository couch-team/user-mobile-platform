import { StackNavigationProp } from '@react-navigation/stack';
import HeaderBar from 'components/base/header-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { Colors, Images } from 'theme/config';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { ScrollView } from 'react-native-gesture-handler';
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

const AddMood2 = ({ navigation: { navigate, goBack } }: Props) => {
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
      <ScrollView>
        <ProgressHeader
          progressWidth={wp(98)}
          firstProgress={1}
          secondProgress={1}
        />
        <HeaderText
          text="That’s Great!"
          hasSubText="How do you feel today?"
          headerTextStyle={styles.headerTextStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMood2;

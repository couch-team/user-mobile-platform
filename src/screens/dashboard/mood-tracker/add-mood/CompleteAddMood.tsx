import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { LongButton, HeaderBar } from 'components';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const CompleteAddMood = ({ navigation: { goBack, navigate } }: Props) => {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.PRIMARY_2 }]}>
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        tintColor={Colors.GREEN_100}
      />

      <Image
        source={Images['happy-2']}
        resizeMode="contain"
        style={styles.moodIcon}
      />

      <View style={styles.moodBodyContainer}>
        <Image source={Images['ellipse-2']} style={styles.ellipseImage} />
        <View style={styles.moodDataContainer}>
          <View style={styles.moodLogTimeContainer}>
            <Text style={styles.moodLogTimeText}>Today — 12:48PM</Text>
          </View>
          <Text style={styles.todaysMoodText}>Happy</Text>
          <Text style={styles.loggedThoughtsText}>
            Oh yes, I got a Chevrolet Camaro and did a test drive on it
            yesterday
          </Text>
        </View>
      </View>
      <LongButton
        buttonStyle={styles.buttonStyle}
        title="View Journal"
        titleStyle={styles.titleStyle}
        onPress={() => navigate('Home')}
      />
    </SafeAreaView>
  );
};

export default CompleteAddMood;

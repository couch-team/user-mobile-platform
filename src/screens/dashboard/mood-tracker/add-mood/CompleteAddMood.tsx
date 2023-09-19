import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { LongButton, HeaderBar, SVGIcon } from 'components';
import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const CompleteAddMood = ({ navigation: { goBack, navigate } }: Props) => {
  const { params } =
    useRoute<RouteProp<DashboardParamList, 'CompleteAddMood'>>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.PRIMARY_2 }]}>
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        tintColor={Colors.GREEN_100}
      />

      <View style={styles.moodIconContainer}>
        <SVGIcon name={params?.res?.mood?.toLowerCase()} />
      </View>

      <View style={styles.moodBodyContainer}>
        <Image source={Images['ellipse-2']} style={styles.ellipseImage} />

        <View style={styles.moodDataContainer}>
          <View style={styles.moodLogTimeContainer}>
            <Text style={styles.moodLogTimeText}>
              {moment(params?.res?.created_at).calendar()}
            </Text>
          </View>
          <Text style={styles.todaysMoodText}>{params?.res?.mood}</Text>
          <Text
            style={styles.loggedThoughtsText}
            numberOfLines={3}
            ellipsizeMode="tail">
            {params?.res?.reason}
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

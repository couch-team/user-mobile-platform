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
        onPressLeftIcon={() => navigate('MoodTracker')}
        tintColor={params?.emotion?.mood?.colour || Colors.GREEN_100}
      />

      <View style={styles.moodIconContainer}>
        {
          params?.emotion?.mood?.icon_url
            ?
            <Image 
              style={styles.moodEmoji}
              source={{ uri: params?.emotion?.mood?.icon_url }}
              resizeMode='cover'
            /> 
            :
            <View style={styles.dummyMoodEmoji}></View>
        }
      </View>

      <View style={styles.moodBodyContainer}>
        <Image source={Images['ellipse-2']} style={styles.ellipseImage} />

        <View style={styles.moodDataContainer}>
          <View style={styles.moodLogTimeContainer}>
            <Text style={[styles.moodLogTimeText, { color: params?.emotion?.mood?.colour}]}>
              {moment(params?.created_at).calendar()}
            </Text>
          </View>
          <Text style={[styles.todaysMoodText, { color: params?.emotion?.mood?.colour}]}>{params?.emotion?.title}</Text>
          <Text
            style={styles.loggedThoughtsText}
            numberOfLines={3}
            ellipsizeMode="tail">
            {params?.description || 'No Description'}
          </Text>
        </View>
      </View>
      <LongButton
        buttonStyle={{ backgroundColor: params?.emotion?.mood?.colour || Colors.GREEN_100  }}
        title="View Journal"
        titleStyle={styles.titleStyle}
        onPress={() => navigate('Journal')}
      />
    </SafeAreaView>
  );
};

export default CompleteAddMood;

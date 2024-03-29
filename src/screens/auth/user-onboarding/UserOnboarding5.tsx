import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { anxiousState } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import {
  AuthParamList,
  RootNavigationRoutes,
} from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'UserOnboarding5'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding5 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const userProfile = useSelector((state: RootState) => state.User);
  const { ever_had_therapy } = useSelector(
    (state: RootState) => state.Preference,
  );

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      mentalInfo: {
        beenToTherapy: ever_had_therapy,
        previousMood: selectedStatus,
      },
    };
    // const res = await pendingProfileCompletion(data);
    // if (res) {
    navigate('UserOnboarding6');
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader status={1} bars={4} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={2}
          totalCount={5}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Over the last two weeks, have you been bothered by feeling nervous,
            anxious or on edge?
          </Text>

          <View style={styles.helpListContainer}>
            {anxiousState.map(rate => {
              return (
                <Checkbox
                  selectedCheckType={selectedStatus}
                  hideCheckBox
                  onSelectOption={setSelectedStatus}
                  key={rate.id}
                  index={rate}
                  checkTitle={rate.title}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          disabled={selectedStatus ? false : true}
          isNotBottom
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding5;

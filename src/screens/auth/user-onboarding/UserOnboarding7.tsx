import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { functionState } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'UserOnboarding7'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding7 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const userProfile = useSelector((state: RootState) => state.Auth.userProfile);
  const {
    Auth: { pendingProfileCompletion },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      mentalInfo: {
        beenToTherapy: userProfile?.mentalInfo?.beenToTherapy,
        previousMood: userProfile?.mentalInfo?.previousMood,
        presenceOfDifficultFeelings:
          userProfile?.mentalInfo?.presenceOfDifficultFeelings,
        pastTraumaTrigger: selectedStatus,
      },
    };
    const res = await pendingProfileCompletion(data);
    if (res) {
      navigate('UserOnboarding8');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={0.8} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={4}
          totalCount={5}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Has any traumatic event happened within the past few weeks or
            months?
          </Text>

          <View style={styles.helpListContainer}>
            {functionState.map(rate => {
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

export default UserOnboarding7;

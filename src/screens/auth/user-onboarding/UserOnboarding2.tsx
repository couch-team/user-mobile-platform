import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { rates } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding2'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding2 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const userProfile = useSelector((state: RootState) => state.Auth.userProfile);
  const {
    Auth: { pendingProfileCompletion },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      healthInfo: {
        reasonForJoining: userProfile?.healthInfo?.reasonForJoining,
        physicalHealth: selectedStatus,
      },
    };
    const res = await pendingProfileCompletion(data);
    if (res) {
      navigate('UserOnboarding3');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={0.7} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Health Related Info"
          currentCount={2}
          totalCount={3}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            How would you rate your physical health?
          </Text>

          <View style={styles.helpListContainer}>
            {rates.map(rate => {
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

export default UserOnboarding2;

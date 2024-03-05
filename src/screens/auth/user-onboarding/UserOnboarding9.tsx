import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { healthyLevel } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding9'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding9 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const userProfile = useSelector((state: RootState) => state.Auth.userProfile);
  const {
    Auth: { pendingProfileCompletion },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      productivityInfo: {
        productivityLevel: selectedStatus,
      },
    };
    const res = await pendingProfileCompletion(data);
    if (res) {
      navigate('UserOnboarding10');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader
        firstProgress={1}
        secondProgress={1}
        thirdProgress={0.5}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Productivity info"
          currentCount={1}
          totalCount={2}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Have you been productive to a healthy level?
          </Text>

          <View style={styles.helpListContainer}>
            {healthyLevel.map(rate => {
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

export default UserOnboarding9;

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { sleepPattern } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const UserOnboarding10 = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const userProfile = useSelector((state: RootState) => state.Auth.userProfile);
  const {
    Auth: { completeProfileCreation, accessDashboard },
  } = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loading.effects.Auth.completeProfileCreation,
  );

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      productivityInfo: {
        productivityLevel: selectedStatus?.split('--')[0],
      },
    };
    const res = await completeProfileCreation(data);
    if (res) {
      accessDashboard();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={1} thirdProgress={1} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Productivity info"
          currentCount={2}
          totalCount={2}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Have you been productive to a healthy level?
          </Text>

          <View style={styles.helpListContainer}>
            {sleepPattern.map(rate => {
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
          title="Complete Final stage"
          loading={loading}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding10;

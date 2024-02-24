import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { therapistsVisits } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import {
  DashboardParamList,
} from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

type AuthNavigationProps = StackNavigationProp<
  DashboardParamList,
  'UserOnboarding4'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding4 = ({ navigation: { navigate } }: Props) => {
  const [therapistVisits, setTherapistVisits] = useState('');

  const { params } =
    useRoute<RouteProp<DashboardParamList, 'UserOnboarding4'>>();
  const {
    User: { therapyOnboardingStage },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      ever_had_therapy: therapistVisits,
    };
    const res = await therapyOnboardingStage(data);
    if (res) {
      navigate('UserOnboarding3');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={1} thirdProgress={1} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={3}
          totalCount={4}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Have you ever been to a therapist?
          </Text>

          <View style={styles.helpListContainer}>
            {therapistsVisits.map(visits => {
              return (
                <Checkbox
                  selectedCheckType={therapistVisits}
                  hideCheckBox
                  onSelectOption={setTherapistVisits}
                  key={visits.id}
                  index={visits}
                  checkTitle={visits.title}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={therapistVisits ? false : true}
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding4;

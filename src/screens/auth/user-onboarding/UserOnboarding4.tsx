import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { therapistsVisits } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding5'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding1 = ({ navigation: { navigate } }: Props) => {
  const [therapistVisits, setTherapistVisits] = useState('');

  const userProfile = useSelector((state: RootState) => state.Auth.userProfile);
  const {
    Auth: { pendingProfileCompletion },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      ...userProfile,
      mentalInfo: {
        beenToTherapy: therapistVisits?.includes('Yes') ? true : false,
      },
    };
    const res = await pendingProfileCompletion(data);
    if (res) {
      navigate('UserOnboarding5');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={0.2} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={1}
          totalCount={5}
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

export default UserOnboarding1;

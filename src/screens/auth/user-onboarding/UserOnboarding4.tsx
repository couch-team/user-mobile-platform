import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { therapistsVisits } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import {
  AuthParamList,
  DashboardParamList,
} from 'utils/types/navigation-types';
// import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from 'hooks/useAppDispatch';
import { setEverHadTherapy } from 'store/slice/preferenceSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'UserOnboarding4'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding4 = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'UserOnboarding4'>>();
  const { ever_had_therapy } = useSelector(
    (state: RootState) => state.Preference,
  );
  const dispatch = useAppDispatch();

  const continueProcess = async () => {
    navigate('UserOnboarding3', {
      token: params.token,
      email: params.email,
      password: params.password,
    });
  };

  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <ProgressHeader status={3} bars={4} />
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
                  selectedCheckType={ever_had_therapy}
                  hideCheckBox
                  onSelectOption={value => dispatch(setEverHadTherapy(value))}
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
          disabled={ever_had_therapy == ''}
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding4;

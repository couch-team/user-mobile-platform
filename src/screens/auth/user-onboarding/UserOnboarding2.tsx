import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { rates } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import {
  AuthParamList,
  DashboardParamList,
} from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from 'hooks/useAppDispatch';
import { setPhysicalStatus } from 'store/slice/preferenceSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'UserOnboarding2'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding2 = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'UserOnboarding2'>>();
  const { physical_status } = useSelector(
    (state: RootState) => state.Preference,
  );
  const dispatch = useAppDispatch();

  const continueProcess = async () => {
    // const data = {
    //   physical_status: selectedStatus,
    // };
    navigate('UserOnboarding4', {
      token: params.token,
      email: params.email,
      password: params.password,
    });
  };

  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <ProgressHeader status={2} bars={4} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Health Related Info"
          currentCount={2}
          totalCount={4}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            How would you rate your physical health?
          </Text>

          <View style={styles.helpListContainer}>
            {rates.map(rate => {
              return (
                <Checkbox
                  selectedCheckType={physical_status}
                  hideCheckBox
                  onSelectOption={value => dispatch(setPhysicalStatus(value))}
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
          disabled={physical_status ? false : true}
          isNotBottom
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding2;

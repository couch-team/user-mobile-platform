import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { LongButton, Checkbox, ProgressHeader, Loader } from 'components';
import {
  AuthParamList,
  DashboardParamList,
} from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { setGoal as setSelectedGoals } from 'store/slice/preferenceSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'UserOnboarding1'
>;
type Props = {
  navigation: AuthNavigationProps;
};

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const UserOnboarding1 = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'UserOnboarding'>>();
  const { goal: selectedGoals } = useSelector(
    (state: RootState) => state.Preference,
  );
  const [goals, setGoals] = useState<any[]>([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState(false);
  const dispatch = useAppDispatch();

  const handleSelectOption = (id: string) => {
    if (selectedGoals.includes(id)) {
      dispatch(
        setSelectedGoals(selectedGoals.filter(optionId => optionId !== id)),
      );
    } else {
      dispatch(setSelectedGoals([...selectedGoals, id]));
    }
  };

  const fetchGoals = async () => {
    try {
      setIsFetchingGoals(true);
      const tokens = params.token;
      const response = await $api.fetch('/api/auth/onboarding/goal/', tokens);
      if ($api.isSuccessful(response)) {
        setGoals(response?.data?.results);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingGoals(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const authProfileDetails = useSelector((state: RootState) => state.User);

  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <ProgressHeader status={1} bars={4} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Health Related Info"
          currentCount={1}
          totalCount={4}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Hello {authProfileDetails?.first_name}, What could we help you with
            {'\n'}
            on Couch?
          </Text>

          <View style={styles.helpListContainer}>
            <>
              {goals?.map((data: any, index: any) => (
                <Checkbox
                  key={data?.id}
                  checkTitle={data?.title}
                  index={index}
                  onSelectOption={() => handleSelectOption(data?.id)}
                  selectedCheck={selectedGoals?.includes(data?.id)}
                />
              ))}
            </>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedGoals?.length > 0 ? false : true}
          title="Continue"
          onPress={() =>
            navigate('UserOnboarding2', {
              token: params.token,
              email: params.email,
              password: params.password,
            })
          }
        />
      </View>
      <Loader loading={isFetchingGoals} color="#fff" />
    </SafeAreaView>
  );
};

export default UserOnboarding1;

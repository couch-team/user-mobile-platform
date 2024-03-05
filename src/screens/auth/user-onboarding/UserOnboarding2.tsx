import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { rates } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import {
  AuthParamList,
} from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding2'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding2 = ({ navigation: { navigate } }: Props) => {
  const { params } =
    useRoute<RouteProp<AuthParamList, 'UserOnboarding2'>>();
  const [selectedStatus, setSelectedStatus] = useState('');

  const {
    User: { physicalOnboardingStage },
  } = useDispatch();

  const continueProcess = async () => {
    const data = {
      physical_status: selectedStatus,
    };
    const res = await physicalOnboardingStage(data);
    if (res) {
      navigate('UserOnboarding4');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader status={2}/>
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

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { sleepPattern } from '../../../constants';
import Checkbox from '../../../components/base/check-box';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding10'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding10 = ({ navigation }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const {
    Auth: { login },
  } = useDispatch();
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
          onPress={() => login()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding10;

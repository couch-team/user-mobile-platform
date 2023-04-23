import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { functionState } from '../../../constants';
import Checkbox from '../../../components/base/check-box';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding7'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding7 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={0.8} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={4}
          totalCount={5}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Has any traumatic event happened within the past few weeks or
            months?
          </Text>

          <View style={styles.helpListContainer}>
            {functionState.map(rate => {
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
          onPress={() => navigate('UserOnboarding8')}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding7;

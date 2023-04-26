import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { healthyLevel } from '../../../constants/data';
import Checkbox from '../../../components/base/check-box';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding9'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding9 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
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
          onPress={() => navigate('UserOnboarding10')}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding9;

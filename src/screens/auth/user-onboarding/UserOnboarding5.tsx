import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { anxiousState } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding5'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding5 = ({ navigation: { navigate } }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} secondProgress={0.4} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Mental Related Info"
          currentCount={2}
          totalCount={5}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Over the last two weeks, have you been bothered by feeling nervous,
            anxious or on edge?
          </Text>

          <View style={styles.helpListContainer}>
            {anxiousState.map(rate => {
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
          onPress={() => navigate('UserOnboarding6')}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding5;

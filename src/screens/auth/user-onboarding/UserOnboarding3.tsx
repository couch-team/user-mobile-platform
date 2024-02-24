import React, { useState } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { medicalConditions } from 'constants/data';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  FormTextInput,
  LongButton,
  Checkbox,
  ProgressHeader,
} from 'components';
import { Images } from 'theme/config';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<
DashboardParamList,
  'UserOnboarding3'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding3 = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<DashboardParamList, 'UserOnboarding4'>>();

  const [selectedOptions, setSelectedOptions] = useState<any>('');
  const [referral, setReferral] = useState('');

  const {
    User: { onboardUser },
  } = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.loading.effects.User.onboardUser,
  );

  const goal = useSelector((state: RootState) => state.User.goalOnboarding);
  const physical = useSelector((state: RootState) => state.User.physicalOnboarding);
  const therapy = useSelector((state: RootState) => state.User.therapyOnboarding);

  const continueProcess =  async () => {
 
    const data = {
     ...goal,
     ...physical,
     ...therapy,
      referral_channel: selectedOptions || referral,
    };
    console.log('data before onboarding',data)
    const res = await onboardUser(data);
    
      navigate('CompleteOnboarding1');

  };
  // console.log(selectedOptions)
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader
        secondProgress={1}
        thirdProgress={1}
        fourthProgress={1}
        firstProgress={1}
      />
      <OnboardingHeader
        headerTitle="Health Related Info"
        currentCount={4}
        totalCount={4}
      />
      <View style={styles.bodyContainer}>
        <Text style={styles.mainBodyText}>How did you hear about us?</Text>

        <View style={styles.helpListContainer}>
          <FlatList
            data={medicalConditions}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <Checkbox
                  key={item.id}
                  checkTitle={item.title}
                  index={index}
                  checkBoxStyle={styles.checkboxStyle}
                  onSelectOption={() => setSelectedOptions(item.title)}
                  checkTitleStyle={styles.checkboxTextStyle}
                  selectedCheck={selectedOptions?.includes(item.title)}
                />
              );
            }}
          />
        </View>
        <KeyboardAvoidingView behavior="position">
          <FormTextInput
            label="Not on the list?"
            formLabelTextStyle={styles.formLabelTextStyle}
            placeholder="Please specify"
            onChangeText={(text: string) => setReferral(text)}
            inputIcon={Images['help-circle']}
          />
        </KeyboardAvoidingView>
      </View>

      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedOptions?.length > 0 || referral ? false : true}
          title="Complete"
          loading={loading}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding3;

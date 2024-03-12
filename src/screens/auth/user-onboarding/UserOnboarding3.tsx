import React, { useState } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { medicalConditions, referral_mediums } from 'constants/data';
import { AuthParamList, DashboardParamList } from 'utils/types/navigation-types';
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
import { RootState } from 'store';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { setGoal, setReferralChannel } from 'store/slice/preferenceSlice';
import { setPreference } from 'store/slice/userSlice';
import { showMessage } from 'react-native-flash-message';
import { fetchUserDetails } from 'store/actions/userDetails';

type AuthNavigationProps = StackNavigationProp<
DashboardParamList,
  'UserOnboarding3'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding3 = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<DashboardParamList, 'UserOnboarding4'>>();
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { goal, ever_had_therapy, physical_status, referral_channel } = useSelector((state: RootState) => state.Preference);
  const dispatch = useAppDispatch();


  const continueProcess =  async () => {
    try{
      setIsSubmitting(true)
      const response = await $api.post('/api/user/preference/', {
        goal,
        ever_had_therapy,
        physical_status,
        referral_channel
      })
      if($api.isSuccessful(response)){
        dispatch(setPreference(response?.data))
        navigate('CompleteOnboarding1');
      }
      else{
        if(response?.response?.status === 400){
          dispatch(fetchUserDetails())
          showMessage({
            type: 'info',
            message: "Preference already exists",
            duration: 3000,
          })
          navigate('DashboardHome')
        }
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <ProgressHeader
        status={4}
        bars={4}
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
                  onSelectOption={() => dispatch(setReferralChannel(item.title))}
                  checkTitleStyle={styles.checkboxTextStyle}
                  selectedCheck={referral_channel == item.title}
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
            onChangeText={(text: string) => dispatch(setReferralChannel(text))}
            inputIcon={Images['help-circle']}
            value={referral_mediums.includes(referral_channel) ? "" :referral_channel}
          />
        </KeyboardAvoidingView>
      </View>

      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={!referral_channel}
          title="Complete"
          loading={isSubmitting}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding3;

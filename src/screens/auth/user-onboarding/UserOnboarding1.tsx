import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
// import { helpLists } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

type AuthNavigationProps = StackNavigationProp<
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
  const [selectedOptions, setSelectedOptions] = useState<React.Key[]>([]);

  const handleSelectOption = (id: React.Key) => {
    if (selectedOptions.includes(id)) {
     
      setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
    } else {

      setSelectedOptions([...selectedOptions, id]);
    }
  };
  const {
    Auth: { getGoalLists },
  } = useDispatch();

  const {
    User: { goalOnboardingStage },
  } = useDispatch();

 
  React.useEffect(function () {
    getGoalLists();
  }, []);

  const goalists = useSelector((state: RootState) => state.Auth.goalists?.results);
// console.log(goalists,'goallist')
  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile,
  );

  const continueProcess =  async () => {
    const data = {
      goal: selectedOptions,
    };
    const res = await goalOnboardingStage(data)
    if(res){
      navigate('UserOnboarding2');
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={1} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Health Related Info"
          currentCount={1}
          totalCount={4}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Hello {authProfileDetails?.first_name}, What could we help you with
            on Couch?
          </Text>

          <View style={styles.helpListContainer}>
            <>
              {goalists?.map(
                (
                  data: any,
                  index: any,
                ) => (
                  <Checkbox
                    key={data?.id}
                    checkTitle={data?.title}
                    index={index}
                    onSelectOption={() => handleSelectOption(data?.id)}
                    selectedCheck={selectedOptions?.includes(data?.id)}
                  />
                ),
              )}
            </>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedOptions?.length > 0 ? false : true}
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding1;

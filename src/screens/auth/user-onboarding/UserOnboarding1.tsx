import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { helpLists } from '../../../constants';
import Checkbox from '../../../components/base/check-box';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const forceUpdate = useForceUpdate();

  const selectItem = (index: any) => {
    let helperArray = selectedOptions;
    let itemIndex = helperArray.indexOf(index);
    if (helperArray?.includes(index)) {
      helperArray?.splice(itemIndex, 1);
    } else {
      helperArray.push(index);
    }
    setSelectedOptions(helperArray);
    forceUpdate();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader firstProgress={0.35} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OnboardingHeader
          headerTitle="Health Related Info"
          currentCount={1}
          totalCount={3}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.mainBodyText}>
            Hello Daniella, What could we help you with on Couch?
          </Text>

          <View style={styles.helpListContainer}>
            {helpLists.map((helpList, index) => {
              return (
                <Checkbox
                  key={helpList.id}
                  checkTitle={helpList.title}
                  index={index}
                  onSelectOption={selectItem}
                  selectedCheck={selectedOptions?.includes(index)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedOptions?.length > 0 ? false : true}
          title="Continue"
          onPress={() => navigate('UserOnboarding2')}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding1;

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { helpLists } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
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

  const continueProcess = async () => {
    const data = {
      goals: selectedOptions?.[0],
    };
    navigate('UserOnboarding2', { data });
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
            Hello Daniella, What could we help you with on Couch?
          </Text>

          <View style={styles.helpListContainer}>
            {helpLists.map((helpList, index) => {
              return (
                <Checkbox
                  key={helpList.id}
                  checkTitle={helpList.title}
                  index={index}
                  onSelectOption={() => selectItem(helpList.title)}
                  selectedCheck={selectedOptions?.includes(helpList.title)}
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
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding1;

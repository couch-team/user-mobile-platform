import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { traumaticEvents } from 'constants/data';
import { LongButton, Checkbox, ProgressHeader } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForceUpdate } from './UserOnboarding1';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding8'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding8 = ({ navigation: { push } }: Props) => {
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
      <ProgressHeader firstProgress={1} secondProgress={1} />
      <OnboardingHeader
        headerTitle="Mental Related Info"
        currentCount={5}
        totalCount={5}
      />
      <View style={styles.bodyContainer}>
        <Text style={styles.mainBodyText}>
          Really sorry Daniella, what kind of traumatic event was it?
        </Text>

        <View style={styles.helpListContainer}>
          <FlatList
            data={traumaticEvents}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <Checkbox
                  key={item.id}
                  checkTitle={item.title}
                  index={index}
                  checkBoxStyle={styles.checkboxStyle}
                  onSelectOption={selectItem}
                  checkTitleStyle={styles.checkboxTextStyle}
                  selectedCheck={selectedOptions?.includes(index)}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedOptions?.length > 0 ? false : true}
          title="Complete This Stage "
          onPress={() =>
            push('CompleteOnboarding1', { url: 'UserOnboarding9' })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding8;

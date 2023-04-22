import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressHeader from '../../../components/base/progress-header';
import { styles } from './style';
import OnboardingHeader from './components/OnboardingHeader';
import { medicalConditions } from '../../../constants';
import Checkbox from '../../../components/base/check-box';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForceUpdate } from './UserOnboarding1';
import FormTextInput from '../../../components/base/form-input';
import { Images } from '../../../theme/config';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'UserOnboarding3'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding3 = ({ navigation: { navigate } }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [goodCondition, setGoodCondition] = useState(false);
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
      <ProgressHeader firstProgress={1} />
      <OnboardingHeader
        headerTitle="Health Related Info"
        currentCount={3}
        totalCount={3}
      />
      <View style={styles.bodyContainer}>
        <Text style={styles.mainBodyText}>
          Do you have any of these chronic medical conditions?
        </Text>

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
                  onSelectOption={selectItem}
                  checkTitleStyle={styles.checkboxTextStyle}
                  selectedCheck={selectedOptions?.includes(index)}
                />
              );
            }}
          />
        </View>
        <KeyboardAvoidingView behavior="position">
          <FormTextInput
            label="Not on the list?"
            formLabelTextStyle={styles.formLabelTextStyle}
            placeholder="Do write it here..."
            inputIcon={Images['help-circle']}
          />
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setGoodCondition(!goodCondition)}
        style={styles.radioIconContainerStyle}>
        <Image
          source={goodCondition ? Images['active-radio'] : Images.radio}
          resizeMode="contain"
          style={styles.radioIcon}
        />
        <Text style={styles.radioIconText}>
          I Possess none of these chronic medical conditions
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedOptions?.length > 0 || goodCondition ? false : true}
          title="Complete This Stage "
          onPress={() => navigate('CompleteOnboarding1')}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserOnboarding3;

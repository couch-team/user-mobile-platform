import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { Colors, Images } from 'theme/config';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressHeader, LongButton, HeaderText, HeaderBar } from 'components';
import { wp } from 'constants/layout';
import { useAppRoute } from 'hooks/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddMood2 = ({ navigation: { navigate, goBack } }: Props) => {
  const { params } = useAppRoute();
  const [thoughts, setThoughts] = useState('');

  const {
    User: { addUserMood },
  } = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.loading.effects.User.addUserMood,
  );

  const continueProcess = async () => {
    const data = {
      mood: params.selectedMood,
      reason: thoughts,
    };
    const res = await addUserMood(data);
    if (res) {
      navigate('CompleteAddMood');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerRight={
          <NotificationIcon
            tintColor={Colors.COUCH_BLUE}
            sharedImage={Images.x}
            onPressIcon={() => goBack()}
          />
        }
      />
      <ScrollView>
        <ProgressHeader
          progressWidth={wp(98)}
          firstProgress={1}
          secondProgress={1}
        />
        <HeaderText
          text={`You are ${params?.selectedMood}`}
          hasSubText="Mind to tell us the secret"
          headerTextStyle={styles.headerTextStyle}
        />
        <View style={styles.unitInputContainer}>
          <TextInput
            placeholder="Write your thoughts here..."
            style={[styles.textInputBoxContainer]}
            textAlignVertical="top"
            multiline={true}
            value={thoughts}
            placeholderTextColor={Colors.COUCH_BLUE_1800}
            onChangeText={(text: string) => setThoughts(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          title="Continue"
          disabled={thoughts ? false : true}
          loading={loading}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMood2;

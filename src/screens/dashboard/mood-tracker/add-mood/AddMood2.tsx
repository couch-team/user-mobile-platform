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
import { RootState } from 'store';
import { $api } from 'services';

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
  const [ isLoading, setIsLoading ] = useState(false);


  const continueProcess = async() => {
    try{
      setIsLoading(true)
      const response = await $api.post('/api/mood/log/', {
        mood: params.selectedMood,
        reason: thoughts,
      })
      if($api.isSuccessful(response)){
        navigate('CompleteAddMood',  response );
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
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
          status={2}
        />
        <HeaderText
          text={`You are ${params?.selectedMood?.toLowerCase()}`}
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
            onChangeText={(text: string) =>
              text.length <= 250 ? setThoughts(text) : null
            }
          />
          <Text style={styles.textCount}>{thoughts?.length}/250</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          title="Add to mood log"
          disabled={thoughts ? false : true}
          loading={isLoading}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMood2;

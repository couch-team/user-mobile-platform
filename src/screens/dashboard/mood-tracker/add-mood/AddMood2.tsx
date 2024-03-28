import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { Colors, Images } from 'theme/config';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { ProgressHeader, LongButton, HeaderText, HeaderBar } from 'components';
import { wp } from 'constants/layout';
import { useAppRoute } from 'hooks/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { $api } from 'services';
import { HELP_CIRCLE } from 'assets/svg';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchMoods } from 'store/actions/mood';

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
  const dispatch = useAppDispatch()

  const continueProcess = async() => {
    try{
      setIsLoading(true)
      const response = await $api.post('/api/mood/log/', {
        emotion_id: params?.emotion_id,
        description: thoughts,
      })
      if($api.isSuccessful(response)){
        dispatch(fetchMoods(1));
        navigate('CompleteAddMood',  response?.data );
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  };

  const isHappy = params?.mood?.toLowerCase() === "happy"
  const isExcited = params?.mood?.toLowerCase() === "excited"
  const isSad = params?.mood?.toLowerCase() === "sad"
  const isAngry = params?.mood?.toLowerCase() === "angry"

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
          bars={3}
        />
        <HeaderText
          text={ (isHappy || isExcited) ? `You are ${params?.emotion?.toLowerCase()}` : "Hey, you could talk to us"}
          hasSubText={ (isHappy || isExcited) ? "Mind to tell us the secret" : `What makes you feel ${params?.emotion?.toLowerCase()} today?` }
          headerTextStyle={styles.headerTextStyle}
        />
        <View style={styles.unitInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Feel free to express yourself (Optional)</Text>
            <HELP_CIRCLE/>
          </View>
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
          <Text style={styles.textCount}>{thoughts?.length || 0}/250</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          title="Add to mood log"
          loading={isLoading}
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMood2;

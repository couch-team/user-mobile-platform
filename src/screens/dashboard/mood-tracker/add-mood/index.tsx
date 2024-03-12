import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, Images } from 'theme/config';
import { LongButton, HeaderText, ProgressHeader, HeaderBar, Loader } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { $api } from 'services';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Notifications'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

interface MoodItemProps {
  item: any;
  borderColor: string;
  onPressMood: ( emotion_id: string, mood: string, color: string) => void;
}

const AddMood = ({ navigation: { navigate, goBack } }: Props) => {
  const [ selectedEmotionId, setSelectedEmotionId ] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const { first_name } = useSelector((state: RootState) => state.User);
  const [ emotions, setEmotions ] = useState<any[]>([]);
  const [ emotionsLoading, setEmotionsLoading ] = useState(false);

  const fetchEmotions = async() => {
    try{
      setEmotionsLoading(true)
      const response = await $api.fetch('/api/mood/emotion/')
      if($api.isSuccessful(response)){
        setEmotions(response?.data)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setEmotionsLoading(false)
    }
  }

  useEffect(() => {
    fetchEmotions()
  },[])
  
  const MoodItem = ({ item, borderColor, onPressMood }: MoodItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onPressMood(item?.id, item?.title, borderColor )}
        style={[
          styles.moodItemContainer,
          { borderColor },
          item.title === selectedEmotion && {
            backgroundColor: borderColor,
          },
        ]}>
        <Text
          style={[
            styles.moodItemText,
            item.title === selectedEmotion && styles.selectedMoodTextStyle,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const continueProcess = async () => {
    navigate('AddMood2', { mood: selectedMood, emotion: selectedEmotion, emotion_id: selectedEmotionId });
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
        <ProgressHeader status={1} bars={3}/>
        <HeaderText
          text={`Hey ${ first_name }`}
          hasSubText="How do you feel today?"
          headerTextStyle={styles.headerTextStyle}
        />
        {  emotions?.length > 0 && emotions?.map((items, index) => {
          return (
            <View style={styles.moodContainer} key={index}>
              {
                items?.emotions?.length > 0 && items?.emotions?.map((item: any) => {
                  return(
                    <MoodItem
                      item={item}
                      key={item?.id}
                      borderColor={items?.colour}
                      onPressMood={() => {
                        setSelectedEmotionId(item?.id)
                        setSelectedEmotion(item?.title);
                        setSelectedMood(items?.title);
                      }}
                    />
                  )
                })
              }
            </View>
          );
        })}
        <View style={styles.emotionsPadding}></View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedEmotion ? false : true}
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
      <Loader loading={emotionsLoading} color='#fff'/>
    </SafeAreaView>
  );
};

export default AddMood;

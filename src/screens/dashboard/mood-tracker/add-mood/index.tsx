import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import NotificationIcon from 'screens/dashboard/home/components/NotificationIcon';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, Images } from 'theme/config';
import ProgressHeader from 'components/base/progress-header';
import { wp } from 'constants/layout';
import HeaderText from 'components/base/header-text';
import { todaysFeeling } from 'constants/data';
import LongButton from 'components/base/long-button';

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
  onPressMood: (mood: string, color: string) => void;
}

const AddMood = ({ navigation: { navigate, goBack } }: Props) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedMoodColor, setSelectedMoodColor] = useState<string>('');

  const MoodItem = ({ item, borderColor, onPressMood }: MoodItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onPressMood(item.title, borderColor)}
        style={[
          styles.moodItemContainer,
          { borderColor },
          item.title === selectedMood && {
            backgroundColor: borderColor,
          },
        ]}>
        <Text
          style={[
            styles.moodItemText,
            item.title === selectedMood && styles.selectedMoodTextStyle,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSelectMood = async (
    mood: React.SetStateAction<string>,
    color: React.SetStateAction<string>,
  ) => {
    setSelectedMood(mood);
    setSelectedMoodColor(color);
  };

  const continueProcess = async () => {
    navigate('AddMood2', { selectedMood, moodColor: selectedMoodColor });
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
        <ProgressHeader progressWidth={wp(98)} firstProgress={1} />
        <HeaderText
          text="Hey John"
          hasSubText="How do you feel today?"
          headerTextStyle={styles.headerTextStyle}
        />
        {todaysFeeling?.map((item, index) => {
          return (
            <View style={styles.moodContainer} key={index}>
              {item.feelings.map(feelings => {
                return (
                  <MoodItem
                    item={feelings}
                    key={feelings.id}
                    borderColor={item.color}
                    onPressMood={onSelectMood}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <LongButton
          isNotBottom
          disabled={selectedMood ? false : true}
          title="Continue"
          onPress={() => continueProcess()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMood;

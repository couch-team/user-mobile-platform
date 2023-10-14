import { HeaderBar } from 'components';
import React, { useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { NoteOption, RightHeader } from './components';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from 'theme/config';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'AddJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const AddJournal = ({ navigation: { goBack } }: Props) => {
  const [title, setTitle] = useState('');
  const [noteTakerOption, setNoteTakerOption] = useState([]);

  console.log(noteTakerOption);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerRight={
          <RightHeader
            pressConfirmButton={() => goBack()}
            pressCloseButton={() => goBack()}
          />
        }
      />
      <ScrollView>
        <View style={styles.noteOptionBodyContainer}>
          <TextInput
            placeholder="Title you Note..."
            value={title}
            placeholderTextColor={Colors.COUCH_GREEN_400}
            style={styles.titleTextStyle}
            onChangeText={(text: string) => setTitle(text)}
          />
          <View style={styles.noteBodyContainer}>
            {noteTakerOption.map((option, index) => {
              if (option === 'text') {
                return <TextInput key={index} />;
              } else if (option === 'video') {
                return <View key={index} />;
              } else if (option === 'image') {
                return <View key={index} />;
              }
            })}
          </View>
        </View>
      </ScrollView>
      <NoteOption
        setNoteTakerOption={setNoteTakerOption}
        noteTakerOption={noteTakerOption}
      />
    </SafeAreaView>
  );
};

export default AddJournal;

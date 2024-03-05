import { HeaderBar } from 'components';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { RightHeader } from '../add-journal/components';

import { DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RichEditor
} from 'react-native-pell-rich-editor';
import { Colors } from 'theme/config';
import { useDispatch, useSelector } from 'react-redux';
import { $api } from 'services';
import { JournalType, fetchJournals, setJournals } from 'store/slice/journalSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import { RootState } from 'store';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'EditJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const EditJournal = ({ route, navigation: { goBack, navigate } }: Props) => {
  const { selectedItem } = route.params;
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const richText = React.useRef<any>();
  const [height, setHeight] = useState(600);
  const { journals } = useSelector((state:RootState) => state.Journal)

  const contentStyle = {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    placeholderColor: 'gray',
    contentCSSText:
    'font-size: 14px; height: 100%; line-height:26px; text-align:justify; ',
  };

  const dispatch = useAppDispatch();

  const editJournalFile = async () => {
    try {
      const formdata = new FormData();
      formdata.append('title', title || selectedItem?.title);
      formdata.append('document', description || selectedItem?.document);
      const id = selectedItem?.id;
      const response = await $api.patch( `/api/journal/log/${id}/`,formdata);
      if($api.isSuccessful(response)){
        const { data }: { data: JournalType } = response
        dispatch(setJournals(journals.map((journal) => journal.id === id ? data : journal )));
        navigate('Journal');
        dispatch(fetchJournals(1))
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleText = React.useCallback((descriptionText: string) => {
    const replaceHTML = descriptionText.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();
    setDescription(replaceWhiteSpace);
    richText.current?.insertHtml(selectedItem?.document);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        headerRight={
          <RightHeader
            pressConfirmButton={() => editJournalFile()}
            pressCloseButton={() => navigate('Journal')}
          />
        }
      />

      <View style={styles.noteOptionBodyContainer}>
        <TextInput
          placeholder="Title you Note..."
          editable
          defaultValue={selectedItem?.title || title}
          placeholderTextColor={Colors.COUCH_GREEN_400}
          style={styles.titleTextStyle}
          onChangeText={(text: string) => setTitle(text)}
        />

        <ScrollView>
          <View style={styles.noteBodyContainer}>
            <RichEditor
              ref={richText}
              onChange={descriptionText => {
                handleText(descriptionText);
              }}
              initialContentHTML={selectedItem?.document}
              editorStyle={contentStyle}
              useContainer={false}
              containerStyle={{ minHeight: height }}
              onHeightChange={e => {
                setHeight(e);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditJournal;



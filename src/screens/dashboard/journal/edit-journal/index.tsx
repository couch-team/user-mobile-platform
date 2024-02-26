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
import { useDispatch } from 'react-redux';
import Axios from 'services/Axios';

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

  const contentStyle = {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    placeholderColor: 'gray',
    contentCSSText:
    'font-size: 14px; height: 100%; line-height:26px; text-align:justify; ',
  };

  const dispatch = useDispatch();

  const {
    User: {getJournal },
  } = useDispatch();

  const editJournalFile = async () => {
    dispatch.User.setError(false);
    try {
      const formdata = new FormData();
      formdata.append('title', title || selectedItem?.title);
      formdata.append('document', description || selectedItem?.document);
      const id = selectedItem?.id;
      const editedJournal = await Axios.patch(
        `api/journal/log/${id}/`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ).then(({ data }) => data);
      dispatch.User.setState({ journalById: editedJournal });
      navigate('Journal');
      getJournal(1)
    } catch (error) {
      
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



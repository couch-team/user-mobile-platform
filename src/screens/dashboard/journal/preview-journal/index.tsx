import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { HeaderBar } from 'components';
import { styles } from './style';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Colors, Images } from 'theme/config';
import SettingsModal from './components/SettingsModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import DeleteModal from './components/DeleteModal';
import MoodViewModal from './components/MoodEditModal';
import { RichEditor } from 'react-native-pell-rich-editor';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'PreviewJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const PreviewJournal = ({ route, navigation: { goBack, navigate } }: Props) => {
  const { selectedItem } = route.params;
  const [openSettingModal, setOpenSettingModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openMoodViewModal, setOpenMoodViewModal] = React.useState(false);
  const richText = React.useRef<any>();

  const [height, setHeight] = React.useState(600);

  const contentStyle = {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    placeholderColor: 'gray',
    contentCSSText:
      'font-size: 14px; height: 100%; line-height:26px; text-align:justify; ',
  };

  function handleSettingModal() {
    setOpenSettingModal(true);
  }

  function handleMoodViewModal() {
    setOpenMoodViewModal(true);
  }

  function handleDeleteModal() {
    setOpenDeleteModal(true);
  }

  const {
    User: { deleteJournalById, getJournal },
  } = useDispatch();

  useEffect(() => {
    if (!openDeleteModal) {
      getJournal(1);
    }
  }, [openDeleteModal]);

  const handleDelete = useCallback(async () => {
    if (selectedItem?.id) {
      await deleteJournalById(selectedItem.id);
      setOpenDeleteModal(false);
      setOpenSettingModal(false);
      getJournal(1);
      navigate('Journal');
    }
  }, [selectedItem, deleteJournalById, getJournal, navigate]);

  const handleText = React.useCallback(() => {
    richText.current?.insertHtml(selectedItem?.document);
  }, []);

  const HeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={handleMoodViewModal}
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={{ uri: selectedItem?.mood?.icon_url }}
            style={styles.headerRightMood}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSettingModal}
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={Images.more}
            resizeMode="contain"
            style={styles.headerRightIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const formattedDate = moment(selectedItem?.created_at).calendar();
  const containerWidth = formattedDate.length * 10; 
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        headerRight={<HeaderRight />}
      />

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>{selectedItem?.title}</Text>
        <View style={[styles.previewButtonContainer,{ width: containerWidth }]}>
          <Text style={styles.previewButtonText}>
            Updated: {moment(selectedItem?.created_at).calendar()}
          </Text>
        </View>
        <ScrollView
         
          showsHorizontalScrollIndicator={false}>
          <View  style={styles.previewDocument}>
          <RichEditor
            ref={richText}
            onChange={handleText}
            initialContentHTML={selectedItem?.document}
            editorStyle={contentStyle}
            useContainer={false}
            disabled
            initialHeight={height}
            containerStyle={{ minHeight: height }}
            onHeightChange={e => {
              setHeight(e);
            }}
          />
          </View>
        </ScrollView>
      </View>

      <SettingsModal
        onPressEdit={() => navigate('EditJournal', { selectedItem })}
        onPressDelete={handleDeleteModal}
        isVisible={openSettingModal}
        onClose={() => setOpenSettingModal(false)}
      />
      <DeleteModal
        isVisible={openDeleteModal}
        onPressDeleteNo={() => setOpenDeleteModal(false)}
        onPressDeleteYes={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />

      <MoodViewModal
        //  onPressEditMood={() => navigate('EditJournal', { selectedItem })}
        //  onPressViewMood={handleDeleteModal}
        isVisible={openMoodViewModal}
        onClose={() => setOpenMoodViewModal(false)}
      />
    </SafeAreaView>
  );
};

export default PreviewJournal;

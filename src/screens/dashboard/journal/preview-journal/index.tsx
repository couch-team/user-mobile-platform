/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { HeaderBar } from 'components';
import { styles } from './style';
import moment from 'moment';
import { Images } from 'theme/config';
import SettingsModal from './components/SettingsModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import DeleteModal from './components/DeleteModal';
import MoodViewModal from './components/MoodEditModal';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchJournals } from 'store/slice/journalSlice';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'PreviewJournal'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const PreviewJournal = ({ route, navigation: { goBack, navigate } }: Props) => {
  const { id, color } = route.params;
  const [openSettingModal, setOpenSettingModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openMoodViewModal, setOpenMoodViewModal] = React.useState(false);
  const [isFetchingJournal, setIsFetchingJournal] = useState(false);
  const [isDeletingJournal, setIsDeletingJournal] = useState(false);
  const dispatch = useAppDispatch();
  const [journal, setJournal] = useState<any>();

  const fetchJournal = async () => {
    try {
      setIsFetchingJournal(true);
      const response = await $api.fetch(`/api/journal/log/${id}/`);
      if ($api.isSuccessful(response)) {
        setJournal(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingJournal(false);
    }
  };

  // console.log(journal);

  useEffect(() => {
    fetchJournal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!openDeleteModal) {
      dispatch(fetchJournals(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDeleteModal]);

  const deleteJournal = async () => {
    try {
      setIsDeletingJournal(true);
      const response = await $api.delete(`/api/journal/log/${id}/`);
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Journal deleted successfully',
        });
        setOpenDeleteModal(false);
        setOpenSettingModal(false);
        dispatch(fetchJournals(1));
        navigate('Journal');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeletingJournal(false);
    }
  };

  const HeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => setOpenMoodViewModal(true)}
          activeOpacity={0.6}
          style={styles.headerRightIconContainer}>
          <Image
            source={{ uri: journal?.mood?.icon_url }}
            style={styles.headerRightMood}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenSettingModal(true)}
          activeOpacity={0.6}
          style={[styles.headerRightIconContainer]}>
          <Image
            source={Images.more}
            resizeMode="contain"
            style={[styles.headerRightIcon, { tintColor: color }]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const formattedDate = moment(journal?.updated_at).calendar();
  const containerWidth = formattedDate.length * 10;
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        hasBackButton
        onPressLeftIcon={() => goBack()}
        headerRight={<HeaderRight />}
        tintColor={color}
      />

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>{journal?.title}</Text>
        <View
          style={[styles.previewButtonContainer, { width: containerWidth }]}>
          <Text style={styles.previewButtonText}>
            Updated: {moment(journal?.updated_at).calendar()}
          </Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.previewDocument}>
            <Text style={{ color: 'rgba(227, 228, 248, 1)', fontSize: 16 }}>
              {journal?.document}
            </Text>
          </View>
        </ScrollView>
      </View>

      <SettingsModal
        onPressEdit={() => navigate('EditJournal', { journal: journal })}
        onPressDelete={() => setOpenDeleteModal(true)}
        isVisible={openSettingModal}
        onClose={() => setOpenSettingModal(false)}
      />
      <DeleteModal
        isVisible={openDeleteModal}
        onPressDeleteNo={() => setOpenDeleteModal(false)}
        onPressDeleteYes={() => deleteJournal()}
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

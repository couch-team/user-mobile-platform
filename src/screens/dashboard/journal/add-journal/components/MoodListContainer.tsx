/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { BaseModal, LongButton } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchJournalMoods } from 'store/slice/moodSlice';
import { useFocusEffect } from '@react-navigation/native';

export type MoodType =
  | 'Calm'
  | 'Anxious'
  | 'Excited'
  | 'Happy'
  | 'Sad'
  | 'Angry';

const MoodModal = ({ isVisible, onSelectMood, onClose, setMoodType }: any) => {
  const { moods } = useSelector((state: RootState) => state.Mood);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchMoods(1));
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchJournalMoods(1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  // console.log(moods);

  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = (mood: any) => {
    setSelectedMood(mood);
    onSelectMood(mood.icon_url, mood.title, mood.id);
    setMoodType(mood.title);
  };

  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Mood to your Note</Text>
        <View style={styles.moodContainer}>
          {moods?.map((mood: any) => (
            <TouchableOpacity
              key={mood.id}
              activeOpacity={0.7}
              onPress={() => handleMoodSelection(mood)}>
              <View
                style={[
                  styles.imageView,
                  selectedMood === mood && {
                    borderStyle: 'dashed',
                    borderColor: Colors.YELLOW_100,
                    backgroundColor: 'transparent',
                  },
                ]}>
                <Image source={{ uri: mood.icon_url }} style={styles.image} />
              </View>
              <Text style={styles.mood}>{mood.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.button}>
        <LongButton
          isNotBottom
          disabled={!selectedMood}
          onPress={() => onClose()}
          title="Add Mood to Note"
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingVertical: hp(40),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.WHITE,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(5),
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageView: {
    margin: wp(3),
    // paddingVertical: wp(10),
    // paddingHorizontal: wp(6),
    borderWidth: 1,
    borderRadius: wp(40),
    borderColor: Colors.COUCH_GREEN_150,
    backgroundColor: Colors.COUCH_GREEN_150,
  },
  image: {
    width: wp(70),
    height: hp(70),
    resizeMode: 'contain',
  },
  mood: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.WHITE,
  },
  button: {
    marginBottom: 30,
  },
});

export default MoodModal;

/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Images, Typography } from 'theme/config';
import MoodLogged from './MoodLogged';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  data: any[];
}

const ProfileNumbersModal = ({
  visible,
  onClose,
  title,
  animationType,
}: Props) => {
  const [excitedCount, setExcitedCount] = useState(0);
  const [happyCount, setHappyCount] = useState(0);
  const [sadNeutralCount, setSadNeutralCount] = useState(0);
  const [angryCount, setAngryCount] = useState(0);

  const { moods } = useSelector((state: RootState) => state.Mood);
  useEffect(() => {
    setExcitedCount(0);
    setHappyCount(0);
    setSadNeutralCount(0);
    setAngryCount(0);

    // Count occurrences for each category
    moods.forEach(mood => {
      const moodTitle = mood.emotion.mood.title;
      if (moodTitle === 'Excited') {
        setExcitedCount(prevCount => prevCount + 1);
      } else if (moodTitle === 'Happy') {
        setHappyCount(prevCount => prevCount + 1);
      } else if (moodTitle === 'Sad' || moodTitle === 'Neutral') {
        setSadNeutralCount(prevCount => prevCount + 1);
      } else if (moodTitle === 'Angry') {
        setAngryCount(prevCount => prevCount + 1);
      }
    });
  }, [moods]);

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={[
          styles.modalBackdrop,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        ]}>
        <Pressable onPress={() => {}} style={[styles.modalContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 24,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {title}
            </Text>
            <Pressable
              style={{
                backgroundColor: 'rgba(243, 243, 252, 0.12)',
                padding: 10,
                borderRadius: 100,
              }}
              onPress={onClose}>
              <Image
                source={Images['cancel-audio']}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            <MoodLogged
              info={'Excited'}
              count={excitedCount}
              uri={
                'https://res.cloudinary.com/couchtechnologies/image/upload/v1707517293/Group_8979_bivcxw.png'
              }
            />
            <MoodLogged
              info={'Happy'}
              count={happyCount}
              uri={
                'https://res.cloudinary.com/couchtechnologies/image/upload/v1707517291/Group_8975_wrvvg2.png'
              }
            />
            <MoodLogged
              info={'Sad/Neutral'}
              count={sadNeutralCount}
              uri={
                'https://res.cloudinary.com/couchtechnologies/image/upload/v1707517293/Group_8978_ewcqgi.png'
              }
            />
            <MoodLogged
              info={'Angry'}
              count={angryCount}
              uri={
                'https://res.cloudinary.com/couchtechnologies/image/upload/v1707517292/Group_8976_wx5ske.png'
              }
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ProfileNumbersModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: Colors.white,
    width: '100%',
    // height: '95%',
    // flex: 1,
    position: 'relative',
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

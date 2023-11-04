/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { BaseModal, LongButton } from 'components';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export type MoodType =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'excited'
  | 'anxious'
  | 'calm';

interface MoodModalProps {
  isVisible: boolean;
  selectedMood?: MoodType;
  onClose: (mood?: MoodType) => void;
}

const MoodModal = ({ isVisible, selectedMood, onClose }: MoodModalProps) => {
  const [mood, setMood] = useState<MoodType>();

  useEffect(() => {
    if (isVisible) {
      setMood(selectedMood);
    }
  }, [isVisible, selectedMood]);

  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Mood to your Note</Text>
        <View style={styles.firstRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMood('happy')}>
            <View
              style={[
                styles.imageView,
                mood === 'happy' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.YELLOW_100,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_happy} style={styles.image} />
            </View>
            <Text style={styles.mood}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setMood('calm')}>
            <View
              style={[
                styles.imageView,
                mood === 'calm' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.COUCH_INFO_BLUE,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_calm} style={styles.image} />
            </View>
            <Text style={styles.mood}>Calm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMood('excited')}>
            <View
              style={[
                styles.imageView,
                mood === 'excited' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.COUCH_BLUE,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_excited} style={styles.image} />
            </View>
            <Text style={styles.mood}>Excited</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMood('anxious')}>
            <View
              style={[
                styles.imageView,
                mood === 'anxious' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.GREEN,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_anxious} style={styles.image} />
            </View>
            <Text style={styles.mood}>Anxious</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.firstRow}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setMood('sad')}>
            <View
              style={[
                styles.imageView,
                mood === 'sad' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.COUCH_GRAY,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_sad} style={styles.image} />
            </View>
            <Text style={styles.mood}>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMood('angry')}>
            <View
              style={[
                styles.imageView,
                mood === 'angry' && {
                  borderStyle: 'dashed',
                  borderColor: Colors.PEACHY_RED_200,
                  backgroundColor: Colors.COUCH_BLUE_2300,
                },
              ]}>
              <Image source={Images.mood_angry} style={styles.image} />
            </View>
            <Text style={styles.mood}>Angry</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <LongButton
          isNotBottom
          disabled={!mood}
          onPress={() => onClose(mood)}
          title="Add Mood to Note"
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    // backgroundColor: Colors.PRIMARY_MODAL_200,
    paddingTop: hp(20),
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
  },
  button: {
    marginTop: hp(20),
    paddingVertical: hp(28),
    paddingHorizontal: wp(20),
    backgroundColor: Colors.PRIMARY_DARKBLUE,
  },
  title: {
    paddingHorizontal: wp(8),
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.WHITE,
    fontSize: hp(20),
    paddingTop: hp(25),
    paddingBottom: hp(16),
    textAlign: 'center',
  },
  mood: {
    marginTop: hp(6),
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_BLUE_1100,
    fontSize: hp(12),
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  imageView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.COUCH_GREEN_150,
    backgroundColor: Colors.COUCH_GREEN_150,
  },
  firstRow: {
    marginTop: hp(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MoodModal;

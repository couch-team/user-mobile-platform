import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Colors, Images } from 'theme/config';
import { JournalType } from 'redux/types';
import { wp } from 'constants/layout';
import { styles } from './style';

type JournalItemProps = {
  item: JournalType;
};

export const JournalItem = ({ item }: JournalItemProps) => {
  const time = useMemo(() => {
    return dayjs(item.timestamp).format('hh:mmA');
  }, [item.timestamp]);

  const mood = useMemo(() => {
    let color: string;
    let image: ImageSourcePropType | undefined;
    switch (item.mood_emoji?.toString()) {
      case 'angry':
        color = Colors.PEACHY_RED_200 + '54';
        image = Images.mood_angry;
        break;
      case 'anxious':
        color = Colors.GREEN + '54';
        image = Images.mood_anxious;
        break;
      case 'calm':
        color = Colors.COUCH_INFO_BLUE + '54';
        image = Images.mood_calm;
        break;
      case 'excited':
        color = Colors.COUCH_BLUE + '54';
        image = Images.mood_excited;
        break;
      case 'happy':
        color = Colors.YELLOW_100 + '54';
        image = Images.mood_happy;
        break;
      case 'sad':
        color = Colors.COUCH_GRAY + '54';
        image = Images.mood_sad;
        break;
      default:
        color = Colors.COUCH_BLUE_800;
        image = undefined;
    }

    return { color, image };
  }, [item.mood_emoji]);
  return (
    <View
      style={[
        styles.itemMoodContainer,
        // { backgroundColor: item.bg },
      ]}>
      <View style={styles.journalHeaderContainer}>
        <View style={styles.journalBodyHeaderContainer}>
          <View
            style={[
              styles.voiceIconLengthContainer,
              !!mood.color && { backgroundColor: mood.color },
            ]}>
            <View style={styles.voiceIconContainer}>
              <Image
                source={Images.voice}
                resizeMode="contain"
                style={styles.voiceIcon}
              />
            </View>
            <Text style={styles.voiceDurationText}>0:35</Text>
          </View>
          <View
            style={[
              styles.voiceIconLengthContainer,
              { marginLeft: wp(12) },
              !!mood.color && { backgroundColor: mood.color },
            ]}>
            <View style={styles.voiceIconContainer}>
              <Image
                source={Images.frame}
                resizeMode="contain"
                style={styles.voiceIcon}
              />
            </View>
            <Text style={styles.voiceDurationText}>4</Text>
          </View>
        </View>
        {!!mood.image && (
          <View style={styles.journalMoodIconContainer}>
            <Image
              source={mood.image}
              style={styles.moodIcon}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <View style={styles.itemMoodBodyContainer}>
        <Text numberOfLines={1} style={styles.itemMoodMainText}>
          {item.notes}
        </Text>
        {/* <Text style={styles.itemMoodBodyText}>
          {item.description}
        </Text> */}
        <Text style={styles.itemMoodBodyDateText}>{time}</Text>
      </View>
    </View>
  );
};

export default JournalItem;

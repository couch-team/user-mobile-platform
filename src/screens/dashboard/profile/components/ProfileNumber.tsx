/* eslint-disable react-native/no-inline-styles */
import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { Typography } from 'theme/config';

interface Props {
  handleMarkerPress?: () => void;
  title: string;
  value?: number;
}

const ProfileNumber = ({ handleMarkerPress, title, value }: Props) => {
  return (
    <Pressable
      style={{
        backgroundColor: 'rgba(243, 243, 252, 0.04)',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 110,
      }}
      onPress={handleMarkerPress}>
      <View style={{ gap: 12 }}>
        <Text
          style={{
            color: 'rgba(227, 228, 248, 1)',
            fontSize: 20,
            fontFamily: Typography.fontFamily.SoraSemiBold,
          }}>
          {title}
        </Text>
        {(title === 'Moods Logged' || title === 'Mindful Points') && (
          <Text
            style={{
              color: 'rgba(159, 152, 178, 1)',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            View full details
          </Text>
        )}
      </View>

      <Text
        style={{
          color:
            title === 'Mindful Points'
              ? 'rgba(168, 97, 235, 1)'
              : title === 'Moods Logged'
              ? 'rgba(115, 120, 222, 1)'
              : title === 'Journal Entries'
              ? 'rgba(176, 232, 153, 1)'
              : 'rgba(255, 234, 151, 0.8)',
          fontSize: 80,
          fontFamily: Typography.fontFamily.SoraExtraBold,
          letterSpacing: -0.09,
        }}>
        {value}
      </Text>
    </Pressable>
  );
};

export default ProfileNumber;

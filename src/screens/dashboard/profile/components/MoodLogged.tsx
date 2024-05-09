/* eslint-disable react-native/no-inline-styles */
import { Image, Text, View } from 'react-native';
import React from 'react';
import { Typography } from 'theme/config';

interface Props {
  info: any;
  count: number;
  uri: any;
}

const MoodLogged = ({ info, count, uri }: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(253, 249, 238, 0.04)',
        padding: 20,
        margin: 10,
        width: '43%',
        borderRadius: 16,
      }}
      key={info.id}>
      <View
        style={{
          //   backgroundColor: 'rgba(255, 245, 203, 0.12)',
          // padding: 10,
          paddingVertical: 10,
          width: 45,
          alignItems: 'center',
          borderRadius: 100,
        }}>
        <Image
          source={{ uri: uri }}
          style={{
            width: 55,
            height: 55,
            resizeMode: 'contain',
            // tintColor:
            //   info === 'Excited'
            //     ? 'rgba(211, 176, 245, 1)'
            //     : info === 'Happy'
            //     ? 'rgba(0, 194, 136, 1)'
            //     : info === 'Sad/Neutral'
            //     ? 'rgba(255, 184, 0, 1)'
            //     : 'rgba(248, 155, 155, 1)',
          }}
        />
      </View>

      <View style={{ marginTop: 20, gap: 16 }}>
        <Text
          style={{
            color: 'rgba(227, 228, 248, 1)',
            fontFamily: Typography.fontFamily.SoraBold,
            fontSize: 24,
          }}>
          {count}
        </Text>
        <Text
          style={{
            color: 'rgba(159, 152, 178, 1)',
            fontFamily: Typography.fontFamily.SoraRegular,
            fontSize: 14,
          }}>
          {info}
        </Text>
      </View>
    </View>
  );
};

export default MoodLogged;

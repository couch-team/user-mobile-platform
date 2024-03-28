/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  title: string;
  desc: string;
  handleClick: () => void;
  id: string;
  subId: string;
  openModal: () => void;
}

const SubscriptionTypes = ({
  title,
  desc,
  handleClick,
  id,
  subId,
  openModal,
}: Props) => {
  const isSelected = subId === id; // Check if selected
  return (
    <Pressable
      style={{
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? '#8A8EE3' : '#E3E4F81F',
        borderRadius: 12,
        padding: 15,
        height: 164,
        width: 250,
        justifyContent: 'space-between',
        marginRight: 10,
      }}
      onPress={handleClick}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ gap: 10, marginTop: 10 }}>
          <Text
            style={{
              color: '#8A8EE3',
              fontSize: 20,
              fontFamily: Typography.fontFamily.SoraMedium,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: '#D0D2F4',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            {desc}
          </Text>
        </View>

        {isSelected && (
          <Image
            source={Images['subscription-mark']}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              marginBottom: 20,
            }}
          />
        )}
      </View>

      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={openModal}>
        <Text
          style={{
            color: '#8A8EE3',
            fontSize: 20,
            fontFamily: Typography.fontFamily.SoraMedium,
          }}>
          What’s in it for me
        </Text>

        <Image
          source={Images['long-arrow']}
          style={{
            width: 80,
            height: 15,
            resizeMode: 'contain',
            tintColor: '#8A8EE3',
          }}
        />
      </Pressable>
    </Pressable>
  );
};

export default SubscriptionTypes;

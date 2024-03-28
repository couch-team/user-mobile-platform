/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  cardType: string;
  cardOrigin: string;
  cardNumber: string;
  handleClick: () => void;
  id: string;
  subId: string;
  removeCard: () => void;
}

const PaymentCard = ({
  cardNumber,
  cardOrigin,
  cardType,
  handleClick,
  id,
  subId,
  removeCard,
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ gap: 20, marginTop: 20 }}>
          <Text
            style={{
              color: '#E3E4F8',
              fontSize: 16,
              fontFamily: Typography.fontFamily.SoraMedium,
            }}>
            {cardType}
          </Text>
          <View style={{ gap: 6, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={
                cardOrigin === 'masterCard'
                  ? Images['mastercard-icon']
                  : Images['visa-icon']
              }
              style={{ width: 43, height: 28, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: '#9F98B2',
                fontSize: 12,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {cardNumber}
            </Text>
          </View>
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

      <Pressable onPress={removeCard} style={{ alignItems: 'flex-end' }}>
        <View>
          <Image
            source={Images['remove-payment-card']}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
        </View>
      </Pressable>
    </Pressable>
  );
};

export default PaymentCard;

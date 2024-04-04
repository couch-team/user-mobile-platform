/* eslint-disable react-native/no-inline-styles */
import { Text, TextInput, View } from 'react-native';
import React from 'react';
import { Typography } from 'theme/config';

interface Props {
  title: string;
  placeholderText: string;
  value: string;
  onChangeText: () => void;
  keyboardType:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'number-pad'
    | 'phone-pad'
    | 'decimal-pad';
}

const ProfileCardTextInput = ({
  title,
  placeholderText,
  value,
  onChangeText,
  keyboardType,
}: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(227, 228, 248, 0.04)',
        padding: 12,
        borderRadius: 12,
        gap: 5,
        marginVertical: 5,
      }}>
      <Text
        style={{
          color: 'rgba(115, 120, 222, 1)',
          fontFamily: Typography.fontFamily.SoraRegular,
          fontSize: 14,
        }}>
        {title}
      </Text>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={'rgba(227, 228, 248, 0.4)'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          fontSize: 16,
          color: 'rgba(227, 228, 248, 1)',
          fontFamily: Typography.fontFamily.SoraRegular,
        }}
      />
    </View>
  );
};

export default ProfileCardTextInput;

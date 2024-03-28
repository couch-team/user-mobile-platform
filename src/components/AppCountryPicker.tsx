/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  value: any;
  showCountryPicker: () => void;
  label: string;
  placeholder: string;
  flag?: string;
}

const AppCountryPicker = ({
  showCountryPicker,
  label,
  placeholder,
  value,
  flag,
}: Props) => {
  return (
    <Pressable onPress={showCountryPicker} style={{ marginTop: 10 }}>
      <Text
        style={{
          color: 'rgba(227, 228, 248, 1)',
          fontFamily: Typography.fontFamily.SoraRegular,
          //   fontSize: Fonts.body3.fontSize,
          marginBottom: 5,
        }}>
        {label}
      </Text>
      <Pressable
        style={[
          styles.inputContainer,
          { backgroundColor: 'rgba(247, 247, 253, 0.08)' },
        ]}
        onPress={showCountryPicker}>
        <Text>{flag}</Text>
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={false}
          onTouchStart={showCountryPicker}
          style={[styles.input, { color: 'rgba(159, 152, 178, 1)' }]}
          placeholderTextColor={'rgba(160, 160, 160, 1)'}
        />
        <Pressable onPress={showCountryPicker}>
          <Image
            source={Images['dropdown-img']}
            style={{ width: 15, height: 15, resizeMode: 'contain' }}
          />
        </Pressable>
      </Pressable>
    </Pressable>
  );
};

export default AppCountryPicker;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 50,
    borderRadius: 64,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 8,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});

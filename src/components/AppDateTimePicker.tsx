/* eslint-disable react-native/no-inline-styles */
import { Pressable, StyleSheet, Text, TextInput, Image } from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Images, Typography } from 'theme/config';

interface Props {
  showPicker: boolean;
  value: any;
  showDateTimePicker: () => void;
  onChange: (event: any, selectedDate: any) => void;
  mode: any;
  is24Hour: boolean;
  label: string;
  placeholder: string;
  modes: any;
  display: any;
}

const AppDateTimePicker = ({
  showPicker,
  value,
  showDateTimePicker,
  onChange,
  mode,
  is24Hour = true,
  label,
  placeholder,
  modes,
  display,
}: Props) => {
  return (
    <Pressable onPress={showDateTimePicker} style={{ marginTop: 10 }}>
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
        onPress={showDateTimePicker}>
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={false}
          onTouchStart={showDateTimePicker}
          style={[styles.input, { color: 'rgba(159, 152, 178, 1)' }]}
          placeholderTextColor={'rgba(160, 160, 160, 1)'}
        />
        <Image
          source={Images['date-time-picker']}
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={modes}
          mode={mode}
          is24Hour={is24Hour}
          display={display}
          onChange={onChange}
          style={{ backgroundColor: 'white' }}
        />
      )}
    </Pressable>
  );
};

export default AppDateTimePicker;

const styles = StyleSheet.create({
  inputContainer: {
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

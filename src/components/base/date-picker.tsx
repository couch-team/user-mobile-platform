import dayjs from 'dayjs';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, Images, Typography } from '../../theme/config';
import { hp, wp } from '../../constants/layout';

interface CouchDatePickerProps {
  label?: string;
  dateValue?: any;
  openDateValue?: boolean;
  setDateValue?: any;
  onOpenPicker: (value: boolean) => void;
}



export const CouchDatePicker = ({
  label,
  dateValue,
  openDateValue,
  setDateValue,
  onOpenPicker,
}: CouchDatePickerProps) => {
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

 

  return (
    <View style={styles.formContainer}>
      <Text style={styles.dateLabelText}>{label}</Text>
      <TouchableOpacity
        onPress={() => onOpenPicker(!openDateValue)}
        activeOpacity={0.6}
        style={styles.dateInputContainer}>
        <Text
          style={[styles.dateInputText, !dateValue && styles.placeholderText]}>
          {!dateValue
            ? 'Select a Date'
            : dayjs(dateValue)?.format('DD-MM-YYYY')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.calenderIconContainer}
        onPress={() => onOpenPicker(!openDateValue)}>
        <Image
          source={Images.calendar}
          resizeMode="contain"
          style={styles.calenderIcon}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={openDateValue}
        mode="date"
        onConfirm={date => {
          onOpenPicker(!openDateValue);
          setDateValue && setDateValue(date);
        }}
        onCancel={() => {
          onOpenPicker(!openDateValue);
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  formContainer: {
    marginBottom: hp(20),
  },
  dateLabelText: {
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    color: Colors.WHITE,
  },
  calenderIcon: {
    width: wp(20),
    height: hp(20),
  },
  calenderIconContainer: {
    position: 'absolute',
    right: wp(20),
    bottom: hp(17),
  },
  dateInputContainer: {
    height: hp(54),
    width: wp(333),
    marginTop: hp(12),
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: hp(64),
    borderColor: Colors.TEXTBORDER_COLOR,
    paddingLeft: hp(18),
    backgroundColor: 'rgba(227, 228, 248, 0.12)',
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.WHITE,
  },
  placeholderText: {
    color: Colors.PLACEHOLDER_COLOR,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(14),
  },
  dateInputText: {
    color: Colors.WHITE,
    fontSize: hp(14),
    fontFamily: Typography.fontFamily.SoraMedium,
    lineHeight: hp(18),
  },
});

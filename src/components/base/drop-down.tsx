import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../theme/config';
import { styles } from './date-picker';

interface CouchDropDownProps {
  label: string;
  dropDownValue: any;
  onOpenDropDown: (event: boolean) => void;
  openDropDown: boolean;
  placeholder: string;
}

const CouchDropDown = ({
  label,
  dropDownValue,
  placeholder,
  onOpenDropDown,
  openDropDown,
}: CouchDropDownProps) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.dateLabelText}>{label}</Text>
      <TouchableOpacity
        onPress={() => onOpenDropDown(!openDropDown)}
        activeOpacity={0.6}
        style={styles.dateInputContainer}>
        <Text
          style={[
            styles.dateInputText,
            !dropDownValue && styles.placeholderText,
          ]}>
          {!dropDownValue ? placeholder : dropDownValue}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.calenderIconContainer}
        onPress={() => onOpenDropDown(!openDropDown)}>
        <Image
          source={Images['chevron-down']}
          resizeMode="contain"
          style={styles.calenderIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CouchDropDown;

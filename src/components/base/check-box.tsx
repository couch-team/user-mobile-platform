import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  View,
  TextStyle,
} from 'react-native';
import { hp, wp } from '../../constants/layout';
import { Colors, Images, Typography } from '../../theme/config';

interface CheckboxProps {
  checkTitle: string;
  checkBoxStyle?: ViewStyle;
  selectedCheck?: boolean;
  selectedCheckType?: string;
  onSelectOption: (index: any) => void;
  index: any;
  checkTitleStyle?: TextStyle;
  hideCheckBox?: boolean;
}

export const Checkbox = ({
  checkTitle,
  checkBoxStyle,
  selectedCheck,
  index,
  onSelectOption,
  hideCheckBox,
  checkTitleStyle,
  selectedCheckType,
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={hideCheckBox ? 0.6 : 1}
      onPress={() => (hideCheckBox ? onSelectOption(index.title) : null)}
      style={[
        styles.checkBoxContainer,
        selectedCheck && !hideCheckBox && styles.selectedBoxStyle,
        selectedCheckType === index.title &&
          // eslint-disable-next-line react-native/no-inline-styles
          hideCheckBox && {
            borderColor: index.color || Colors.COUCH_BLUE,
            backgroundColor: 'rgba(239, 250, 235, 0.12)',
          },
        checkBoxStyle,
      ]}>
      {hideCheckBox ? null : (
        <TouchableOpacity
          onPress={() => onSelectOption(index)}
          activeOpacity={0.6}>
          <Image
            source={selectedCheck ? Images['active-checkbox'] : Images.checkbox}
            resizeMode="contain"
            style={styles.checkBoxIcon}
          />
        </TouchableOpacity>
      )}
      <View style={styles.bodyContainer}>
        <Text
          style={[
            styles.checkTitle,
            checkTitleStyle,
            selectedCheck && styles.selectedBoxTextStyle,
            hideCheckBox && {
              color: index.color || Colors.COUCH_BLUE_50,
            },
            selectedCheckType === index.title &&
              hideCheckBox &&
              !index.color &&
              styles.selectedBoxTextStyle,
          ]}>
          {checkTitle}
        </Text>

        {hideCheckBox && selectedCheckType === index.title && (
          <Image
            source={Images.check}
            resizeMode="contain"
            style={[
              styles.checkBoxIcon,
              { tintColor: index.color || Colors.COUCH_BLUE },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    height: hp(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(16),
    paddingHorizontal: wp(16),
    borderWidth: 1.2,
    borderColor: Colors.COUCH_BLUE_400,
    marginBottom: hp(20),
  },
  selectedBoxStyle: {
    borderWidth: hp(1.6),
    borderColor: Colors.COUCH_BLUE,
  },
  selectedCheckBoxStyle: {},
  checkBoxIcon: {
    width: 22,
    height: 22,
  },
  checkTitle: {
    paddingLeft: wp(10),
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    lineHeight: hp(21),
    color: Colors.PLACEHOLDER_COLOR,
  },
  selectedBoxTextStyle: {
    fontFamily: Typography.fontFamily.SoraSemiBold,
    color: Colors.COUCH_BLUE,
  },
  bodyContainer: {
    width: wp(290),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

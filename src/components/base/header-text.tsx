import { hp, wp } from 'constants/layout';
import React from 'react';
import { View, Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography } from 'theme/config';

interface HeaderTextProps {
  text: string;
  textStyle?: TextStyle;
  hasSubText?: string;
  headerTextStyle?: ViewStyle;
  hasSubTextStyle?: TextStyle;
}

export const HeaderText = ({
  text,
  textStyle,
  hasSubText,
  headerTextStyle,
  hasSubTextStyle,
}: HeaderTextProps) => {
  return (
    <View style={[styles.headerTextContainer, headerTextStyle]}>
      <Text style={[styles.headerText, textStyle]}>{text}</Text>
      {hasSubText && (
        <Text style={[styles.subHeaderText, hasSubTextStyle]}>
          {hasSubText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextContainer: {
    marginTop: hp(15),
    marginHorizontal: wp(22),
  },
  headerText: {
    color: Colors.WHITE,
    fontFamily: Typography.fontFamily.SoraMedium,
    fontSize: hp(20),
    lineHeight: hp(25),
  },
  subHeaderText: {
    paddingTop: hp(4),
    color: Colors.COUCH_TEXT_COLOR,
    fontFamily: Typography.fontFamily.SoraRegular,
    fontSize: hp(14),
    lineHeight: hp(18),
  },
});

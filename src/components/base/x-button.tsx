import { hp, wp } from 'constants/layout';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Images } from 'theme/config';

interface XButtonProps {
  xButtonStyle?: ViewStyle;
  onXButtonPress?: () => void;
}

export const XButton = ({ xButtonStyle, onXButtonPress }: XButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onXButtonPress}
      style={[styles.xIconContainer, xButtonStyle]}
      activeOpacity={0.5}>
      <Image source={Images.x} resizeMode="contain" style={styles.xIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  xIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: Colors.COUCH_BLUE_1200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  xIcon: {
    width: wp(20),
    height: hp(20),
  },
});

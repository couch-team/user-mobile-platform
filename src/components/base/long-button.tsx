import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { getBottomSpace, hp, wp } from '../../constants/layout';
import { Colors, Typography } from '../../theme/config';

interface LongButtonProps {
  loading?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  isNotBottom?: boolean;
  disabled?: boolean;
}

const LongButton = ({
  loading,
  title,
  titleStyle,
  buttonStyle,
  containerStyle,
  onPress,
  disabled,
  isNotBottom,
}: LongButtonProps) => {
  return (
    <View style={!isNotBottom && [styles.containerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.buttonStyle,
          buttonStyle,
          disabled && styles.disabledStyle,
        ]}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.WHITE} />
        ) : (
          <Text
            style={[
              styles.title,
              titleStyle,
              disabled && styles.titleDisabledStyle,
            ]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: hp(60) + getBottomSpace(),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontSize: hp(16),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  titleDisabledStyle: {},
  buttonStyle: {
    height: hp(60),
    width: wp(327),
    backgroundColor: Colors.COUCH_BLUE,
    borderRadius: hp(64),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  disabledStyle: {
    backgroundColor: Colors.COUCH_BLUE,
    opacity: 0.2,
  },
});

export default LongButton;

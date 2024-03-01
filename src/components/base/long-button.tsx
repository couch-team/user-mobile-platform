import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Image,
  ImageStyle,
} from 'react-native';
import { getBottomSpace, hp, wp } from '../../constants/layout';
import { Colors, Images, Typography } from '../../theme/config';

interface LongButtonProps {
  loading?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  isNotBottom?: boolean;
  disabled?: boolean;
  hasLongArrow?: boolean;
  longArrowStyle?: ImageStyle;
  icon?: any;
}

export const LongButton = ({
  loading,
  title,
  titleStyle,
  buttonStyle,
  containerStyle,
  onPress,
  disabled,
  hasLongArrow,
  isNotBottom,
  longArrowStyle,
  icon,
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
        ) : hasLongArrow ? (
          <View style={styles.longArrowContainer}>
            <Text
              style={[
                styles.title,
                titleStyle,
                disabled && styles.titleDisabledStyle,
              ]}>
              {title}
            </Text>
            <Image
              source={Images['long-arrow']}
              resizeMode="contain"
              style={[styles.longArrow, longArrowStyle]}
            />
          </View>
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <View>{icon}</View>
            <Text
              style={[
                styles.title,
                titleStyle,
                disabled && styles.titleDisabledStyle,
              ]}>
              {title}
            </Text>
          </View>
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
  longArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  longArrow: {
    width: wp(53),
    marginLeft: wp(16),
    height: hp(10),
  },
});

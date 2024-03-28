import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { deviceHeight, deviceWidth } from 'constants/layout';
import { Colors } from 'theme/config';

export function Loader({ loading, color, fullPageLoaderStyle }: {
  loading: boolean;
  fullPageLoaderStyle?: ViewStyle;
  color?: string,
}) {
  return loading ? (
    <View style={[styles.fullPageLoader, fullPageLoaderStyle]}>
      <ActivityIndicator size={'small'} color={color || Colors.COUCH_BLUE} />
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  fullPageLoader: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

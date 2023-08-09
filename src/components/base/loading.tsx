import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { deviceHeight, deviceWidth } from 'constants/layout';
import { Colors } from 'theme/config';

export function Loader(props: {
  loading: boolean;
  fullPageLoaderStyle?: ViewStyle;
}) {
  const { loading, fullPageLoaderStyle } = props;
  return loading ? (
    <View style={[styles.fullPageLoader, fullPageLoaderStyle]}>
      <ActivityIndicator size={'small'} color={Colors.COUCH_BLUE} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/config';
import { hp, wp } from '../../constants/layout';

export const ProgressHeader = ({ status }: { status: number }) => {
  return (
    <View style={styles.progressHeaderContainer}>
      <View
        style={[
          styles.progressBar,
          status >= 1 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      />
      <View
        style={[
          styles.progressDot,
          status > 1 && { backgroundColor: Colors.GREEN_100 },
        ]}
      />
      <View
        style={[
          styles.progressBar,
          status >= 2 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      />
      <View
        style={[
          styles.progressDot,
          status > 2 && { backgroundColor: Colors.GREEN_100 },
        ]}
      />
      <View
        style={[
          styles.progressBar,
          status >= 3 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(20),
    marginTop: hp(20) && hp(40),
    height: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  progressBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#EEEFFB14',
    borderRadius: 64,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.COUCH_CREAME,
  },
});

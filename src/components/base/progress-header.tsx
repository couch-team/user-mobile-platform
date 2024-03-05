import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Image, StyleSheet } from 'react-native';
import { Colors, Images } from '../../theme/config';
import { hp, wp } from '../../constants/layout';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';

export const ProgressHeader = ({ status }: { status: number }) => {
  return (
    <View style={styles.progressHeaderContainer}>
      <View
        style={[
          styles.progressBar,
          status >= 1 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      ></View>
      <View 
        style={[
          styles.progressDot,
          status > 1 && { backgroundColor: Colors.GREEN_100 },
        ]}
      ></View>
      <View 
        style={[
          styles.progressBar,
          status >= 2 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      ></View>
      <View 
        style={[
          styles.progressDot,
          status > 2 && { backgroundColor: Colors.GREEN_100 },
        ]}
      ></View>
      <View         
      style={[
          styles.progressBar,
          status >= 3 && { backgroundColor: Colors.COUCH_BLUE },
        ]}
      ></View>
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

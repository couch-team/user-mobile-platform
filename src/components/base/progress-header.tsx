/* eslint-disable react/self-closing-comp */
import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/config';
import { hp, wp } from '../../constants/layout';

export const ProgressHeader = ({
  status,
  bars,
}: {
  status: number;
  bars: number;
}) => {
  return (
    <View style={styles.progressHeaderContainer}>
      {Array.from({ length: bars }, (_, index) => index)?.map(index => {
        return (
          <Fragment key={index}>
            <View
              style={[
                styles.progressBar,
                status >= index + 1 && { backgroundColor: Colors.COUCH_BLUE },
              ]}></View>
            {bars !== index + 1 && (
              <View
                style={[
                  styles.progressDot,
                  status > index + 1 && { backgroundColor: Colors.GREEN_100 },
                ]}></View>
            )}
          </Fragment>
        );
      })}
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

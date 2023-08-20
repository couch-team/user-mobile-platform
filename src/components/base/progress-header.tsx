import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Image, StyleSheet } from 'react-native';
import { Colors, Images } from '../../theme/config';
import { hp, wp } from '../../constants/layout';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';

interface ProgressHeaderProps {
  firstProgress: number;
  secondProgress?: number;
  thirdProgress?: number;
  fourthProgress?: number;
  progressWidth?: number;
}

export const ProgressHeader = ({
  firstProgress,
  secondProgress,
  thirdProgress,
  fourthProgress,
  progressWidth,
}: ProgressHeaderProps) => {
  return (
    <View style={styles.progressHeaderContainer}>
      <Progress.Bar
        progress={firstProgress}
        unfilledColor={Colors.COUCH_BLUE_700}
        color={Colors.COUCH_BLUE}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
      <Image
        source={Images.ellipse}
        resizeMode="contain"
        style={[
          styles.ellipseIcon,
          firstProgress === 1 && { tintColor: Colors.GREEN_100 },
        ]}
      />
      <Progress.Bar
        progress={secondProgress}
        color={Colors.COUCH_BLUE}
        unfilledColor={Colors.COUCH_BLUE_700}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
      <Image
        source={Images.ellipse}
        resizeMode="contain"
        style={[
          styles.ellipseIcon,
          secondProgress === 1 && { tintColor: Colors.GREEN_100 },
        ]}
      />
      <Progress.Bar
        progress={thirdProgress}
        color={Colors.COUCH_BLUE}
        unfilledColor={Colors.COUCH_BLUE_700}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
      <Image
        source={Images.ellipse}
        resizeMode="contain"
        style={[
          styles.ellipseIcon,
          thirdProgress === 1 && { tintColor: Colors.GREEN_100 },
        ]}
      />
      <Progress.Bar
        progress={fourthProgress}
        color={Colors.COUCH_BLUE}
        unfilledColor={Colors.COUCH_BLUE_700}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(20),
    marginTop: hasDynamicIsland() && hasNotch() ? hp(20) : hp(40),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ellipseIcon: {
    width: 10,
    height: 10,
  },
});

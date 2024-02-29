import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import * as Progress from 'react-native-progress';
import React from 'react'
import { styles } from '../style';
import { Colors, Images } from '../../../../theme/config';
import { hp, wp } from 'constants/layout';

interface ResetPasswordHeaderProps {
  firstProgress: number;
  secondProgress?: number;
  thirdProgress?: number;
  progressWidth?: number;
}


export default function ResetPasswordHeader({
  firstProgress,
  secondProgress,
  thirdProgress,
  progressWidth,
}: ResetPasswordHeaderProps) {
  return (
    <View style={styles.progressHeaderContainer}>
      <Progress.Bar
        progress={firstProgress}
        unfilledColor={Colors.WHITE}
        color={Colors.COUCH_BLUE}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
      <Progress.Bar
        progress={secondProgress}
        color={Colors.COUCH_BLUE}
        unfilledColor={Colors.WHITE}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
      <Progress.Bar
        progress={thirdProgress}
        color={Colors.COUCH_BLUE}
        unfilledColor={Colors.WHITE}
        borderWidth={0}
        height={hp(10)}
        width={progressWidth || wp(70)}
      />
    </View>
  )
}

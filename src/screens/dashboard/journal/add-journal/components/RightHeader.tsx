import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';
import { useDispatch } from 'react-redux';

interface RightHeaderProps {
  activeColor?: string;
  pressCloseButton: () => void;
  pressConfirmButton: () => void;
}

export const RightHeader = ({
  activeColor,
  pressConfirmButton,
  pressCloseButton,
}: RightHeaderProps) => {

 

  return (
    <View style={styles.rightHeaderContainer}>
      <TouchableOpacity
        onPress={pressCloseButton}
        activeOpacity={0.9}
        style={styles.closeIconContainer}>
        <Image
          source={Images.x}
          resizeMode="contain"
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={pressConfirmButton}
        style={[
          styles.closeIconContainer,
          styles.checkColor,
          !!activeColor && { backgroundColor: activeColor },
        ]}>
        <Image
          source={Images.check}
          resizeMode="contain"
          style={[styles.closeIcon, styles.tintColor]}
        />
      </TouchableOpacity>
    </View>
  );
};

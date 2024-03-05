import React from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';

interface RightHeaderProps {
  activeColor?: string;
  pressCloseButton: () => void;
  pressConfirmButton: () => void;
  loading?: boolean;
  disabled: boolean,
}

export const RightHeader = ({
  activeColor,
  pressConfirmButton,
  pressCloseButton,
  loading,
  disabled
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
        disabled={disabled}
        style={[
          styles.closeIconContainer,
          styles.checkColor,
          !!activeColor && { backgroundColor: activeColor },
        ]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Image
            source={Images.check}
            resizeMode="contain"
            style={[styles.closeIcon, styles.tintColor]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

import React from 'react';
import { Image, ImageSourcePropType, Pressable } from 'react-native';
import { styles } from '../style';
import { Images } from 'theme/config';

interface NotificationIconProps {
  navigate?: any;
  sharedImage?: ImageSourcePropType;
  tintColor?: string;
  onPressIcon?: () => void;
}

const NotificationIcon = ({
  navigate,
  sharedImage,
  tintColor,
  onPressIcon,
}: NotificationIconProps) => {
  return (
    <Pressable
      onPress={() =>
        navigate ? navigate('Notifications') : onPressIcon && onPressIcon()
      }
      style={styles.notificationIconContainer}>
      <Image
        source={sharedImage || Images.notification}
        resizeMode="contain"
        style={[styles.notificationIcon, { tintColor }]}
      />
    </Pressable>
  );
};

export default NotificationIcon;

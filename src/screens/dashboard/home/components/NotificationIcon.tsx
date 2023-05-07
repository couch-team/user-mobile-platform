import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      onPress={() =>
        navigate ? navigate('Notifications') : onPressIcon && onPressIcon()
      }
      activeOpacity={0.5}
      style={styles.notificationIconContainer}>
      <Image
        source={sharedImage || Images.notification}
        resizeMode="contain"
        style={[styles.notificationIcon, { tintColor }]}
      />
    </TouchableOpacity>
  );
};

export default NotificationIcon;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import { Images } from 'theme/config';

interface NotificationIconProps {
  navigate: any;
}

const NotificationIcon = ({ navigate }: NotificationIconProps) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('Notifications')}
      activeOpacity={0.5}
      style={styles.notificationIconContainer}>
      <Image
        source={Images.notification}
        resizeMode="contain"
        style={styles.notificationIcon}
      />
    </TouchableOpacity>
  );
};

export default NotificationIcon;

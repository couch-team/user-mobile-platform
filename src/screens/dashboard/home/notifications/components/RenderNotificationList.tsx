import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../style';

interface RenderNotificationListProps {
  item: any;
}

function timeAgo(date: Date) {
  const now = new Date();
  const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

  if (secondsPast < 60) {
      return 'Just Now';
  }
  if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (secondsPast <= 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (secondsPast <= 2592000) {
      const days = Math.floor(secondsPast / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (secondsPast <= 31104000) {
      const months = Math.floor(secondsPast / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(secondsPast / 31104000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

const RenderNotificationList = ({ item }: RenderNotificationListProps) => {
  return (
    <View style={styles.notificationListBodyContainer}>
      <View
        key={item.id}
        style={[
          styles.notificationBodyContainer,
          styles.newNotificationContainer,
        ]}>
        {/* <View style={styles.notificationIconContainer}>
          <Image
            source={notification.icon}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
        </View> */}
        <View style={styles.notificationBodyTextContainer}>
          <Text
            numberOfLines={1}
            style={styles.notificationBodyMainTitle}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.notificationBodyMainText}>
            {item?.message}
          </Text>
          <Text style={styles.notificationTimeText}>
            {timeAgo(item?.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderNotificationList;

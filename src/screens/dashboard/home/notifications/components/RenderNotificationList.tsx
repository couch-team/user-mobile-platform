import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../style';

interface RenderNotificationListProps {
  item: any;
}

const RenderNotificationList = ({ item }: RenderNotificationListProps) => {
  console.log(item,'notification');
  return (
    <View style={styles.notificationListBodyContainer}>
      {item?.newNotifications?.length > 0 && (
        <View style={styles.newNotificationListContainer}>
          <Text style={styles.notificationHeaderText}>New notifications</Text>
          {item?.newNotifications?.map((notification: any) => {
            return (
              <View
                key={notification.id}
                style={[
                  styles.notificationBodyContainer,
                  styles.newNotificationContainer,
                ]}>
                <View style={styles.notificationIconContainer}>
                  <Image
                    source={notification.icon}
                    resizeMode="contain"
                    style={styles.notificationIcon}
                  />
                </View>
                <View style={styles.notificationBodyTextContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.notificationBodyMainText}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTimeText}>
                    {notification.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
      {item?.notificationHistory?.length > 0 && (
        <View style={styles.newNotificationListContainer}>
          <Text style={styles.notificationHeaderText}>New notifications</Text>
          {item?.notificationHistory?.map((notification: any) => {
            return (
              <View
                key={notification.id}
                style={styles.notificationBodyContainer}>
                <View style={styles.notificationIconContainer}>
                  <Image
                    source={notification.icon}
                    resizeMode="contain"
                    style={styles.notificationIcon}
                  />
                </View>
                <View style={styles.notificationBodyTextContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.notificationBodyMainText}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTimeText}>
                    {notification.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default RenderNotificationList;

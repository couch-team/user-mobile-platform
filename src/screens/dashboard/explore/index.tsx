import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderBar, HeaderText } from 'components';
import NotificationIcon from '../home/components/NotificationIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { exploreOptions } from 'constants/data';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Explore'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Explore = ({ navigation: { navigate } }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar headerRight={<NotificationIcon navigate={navigate} />} />
      <HeaderText
        text="Explore"
        hasSubText="What would you like to do today?..."
      />
      <View style={styles.bodyContainer}>
        <FlatList
          data={exploreOptions}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={<View style={{ paddingBottom: 120 }}></View>}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => item.screen && navigate(item.screen as any)}
                style={styles.exploreItemContainerStyle}
                activeOpacity={0.6}
                key={index}>
                <View style={styles.exploreIconContainer}>
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={[styles.exploreIcon, { tintColor: item.color }]}
                  />
                </View>
                <View style={styles.exploreInfoContainer}>
                  <Text style={[styles.exploreMainText, { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.exploreBodyText}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;

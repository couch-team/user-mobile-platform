import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import HeaderBar from 'components/base/header-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import HeaderText from 'components/base/header-text';
import { therapyOptions } from 'constants/data';

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'Therapy'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Therapy = ({ navigation: { goBack, navigate } }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <HeaderText
        text="Therapy"
        hasSubText="it’s a beautiful morning Today..."
      />
      <View style={styles.bodyContainer}>
        <FlatList
          data={therapyOptions}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.exploreItemContainerStyle}
                activeOpacity={0.6}
                onPress={() => item.url && navigate(item.url)}
                key={index}>
                <View style={styles.exploreIconContainer}>
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={[styles.exploreIcon, { tintColor: item.color }]}
                  />
                </View>
                <View style={styles.exploreInfoContainer}>
                  <Text
                    style={[
                      styles.exploreMainText,
                      { color: item.color || item.textColor },
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.exploreBodyText}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Therapy;

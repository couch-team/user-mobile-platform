/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Images, Typography } from 'theme/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { hp, wp } from 'constants/layout';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'More'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const More = ({ navigation }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(6, 12, 35, 1)',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <Pressable
        style={styles.headerLeftIconContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={Images['arrow-left-circle']}
          resizeMode="contain"
          style={[styles.backIcon]}
        />
      </Pressable>

      <View style={{ marginTop: 20, gap: 8 }}>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 20,
            fontFamily: Typography.fontFamily.SoraBold,
          }}>
          Support
        </Text>
        <Text
          style={{
            color: 'rgba(159, 152, 178, 1)',
            fontSize: 14,
            fontFamily: Typography.fontFamily.SoraRegular,
          }}>
          Send Us a Mail. we respond fast and easy!
        </Text>
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  headerLeftIconContainer: {
    width: 30,
    padding: 20,
    height: 36,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

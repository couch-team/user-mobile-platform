import { hp, wp } from 'constants/layout';
import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TextStyle,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import { Colors, Typography } from 'theme/config';

interface HeaderTextProps {
  text: string;
  textStyle?: TextStyle;
  hasSubText?: string;
  headerTextStyle?: ViewStyle;
  hasSubTextStyle?: TextStyle;
  iconImage?: any;
  bannerImage?: ReactNode | any;
  bannerIcon?: any;
}

export const HeaderText = ({
  text,
  textStyle,
  hasSubText,
  headerTextStyle,
  hasSubTextStyle,
  iconImage,
  bannerImage,
  bannerIcon
}: HeaderTextProps) => {
  return (
    <View style={[styles.headerTextContainer, headerTextStyle]}>
      {hasSubText && (
        <View style={styles.bannerImageContainer}>
          <View>
            <Text style={[styles.headerText, textStyle]}>{text}</Text>
            <View style={styles.iconImageContainer}>
              {iconImage ? (
                <Image
                  source={iconImage}
                  resizeMode="contain"
                  style={styles.iconImageStyle}
                />
              ) : (
                ''
              )}
              <Text style={[styles.subHeaderText, hasSubTextStyle]}>
                {hasSubText}
              </Text>
            </View>
          </View>
          {
            bannerImage
              &&
            <Image
              source={bannerImage}
              resizeMode="contain"
              style={styles.bannerImageStyle}
            />
          }
          {
            bannerIcon
              &&
              <View style={styles.bannerIcon}>{bannerIcon}</View>
          }
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextContainer: {
    marginTop: hp(15),
    marginHorizontal: wp(22),
  },
  headerText: {
    color: Colors.COUCH_BLUE_1100,
    fontFamily: "Sora-Semibold",
    fontWeight:"600",
    fontSize: 24,
    lineHeight: 31,
  },
  subHeaderText: {
    paddingTop: hp(4),
    color: Colors.COUCH_TEXT_COLOR,
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.48,
  },
  iconImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconImageStyle: {
    width: wp(20),
    height: hp(20),
  },
  bannerImageStyle: {
    width: wp(100),
    height: hp(100),
  },
  bannerIcon: {
    position: 'absolute',
    right: -20,
  }
});

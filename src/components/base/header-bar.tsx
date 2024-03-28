import { deviceWidth, hp, wp } from 'constants/layout';
import React, { ReactElement } from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Colors, Images, Typography } from 'theme/config';

interface HeaderBarProps {
  onPressLeftIcon?: () => void;
  hasBackButton?: boolean;
  hasLeftButton?: ImageSourcePropType;
  headerTitle?: string;
  hasBorderBottom?: boolean;
  backgroundColor?: string;
  onPressRightIcon?: () => void;
  rightIcon?: ImageSourcePropType;
  rightHeader?: string;
  headerLeft?: React.ReactNode;
  headerRight?: ReactElement;
  tintColor?: string;
}

export const HeaderBar = ({
  onPressLeftIcon,
  onPressRightIcon,
  hasBackButton,
  hasBorderBottom,
  backgroundColor,
  rightHeader,
  rightIcon,
  hasLeftButton,
  headerLeft,
  headerRight,
  headerTitle,
  tintColor,
}: HeaderBarProps) => {
  const renderHeaderLeft = () => {
    if (headerLeft) {
      return <View style={styles.headerLeftContainer}>{headerLeft}</View>;
    }

    if (hasBackButton) {
      return (
        <>
          <Pressable
            style={[styles.headerLeftIconContainer]}
            onPress={onPressLeftIcon}>
            <Image
              source={Images['arrow-left-circle']}
              resizeMode="contain"
              style={[styles.backIcon, { tintColor }]}
            />
          </Pressable>
        </>
      );
    }
    if (hasLeftButton) {
      return (
        <Pressable
          style={[styles.headerLeftIconContainer]}
          onPress={onPressLeftIcon}>
          <Image
            source={hasLeftButton}
            resizeMode="contain"
            style={[styles.backIcon]}
          />
        </Pressable>
      );
    }
  };

  const renderHeaderTitle = () => {
    if (headerTitle) {
      return <Text style={[styles.headerTitle]}>{headerTitle}</Text>;
    }
  };

  const renderHeaderRight = () => {
    if (rightIcon) {
      return (
        <Pressable
          style={[styles.headerRightIconContainer]}
          onPress={onPressRightIcon}>
          <Image
            source={rightIcon}
            resizeMode="contain"
            style={[styles.backIcon]}
          />
        </Pressable>
      );
    }
    if (rightHeader) {
      return (
        <Text style={[styles.headerRightIconContainer, styles.headerTitle]}>
          {rightHeader}
        </Text>
      );
    }
    if (headerRight) {
      return (
        <View style={[styles.headerRightIconContainer]}>{headerRight}</View>
      );
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.PRIMARY} />
      <View style={[styles.headerContainer, { backgroundColor }]}>
        <View
          style={[
            styles.navBar,
            hasBorderBottom && styles.borderBottomWidth,
            { backgroundColor },
          ]}>
          {renderHeaderLeft()}
          {renderHeaderTitle()}
          {renderHeaderRight()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: wp(24),
    height: hp(24),
  },
  headerLeftIconContainer: {
    position: 'absolute',
    left: wp(16),
    width: 56,
    height: 56,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightIconContainer: {
    position: 'absolute',
    right: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftContainer: {
    position: 'absolute',
    left: wp(16),
  },
  headerContainer: {
    backgroundColor: Colors.WHITE,
    width: deviceWidth,
    marginTop: 0 || hp(15),
  },
  dropDownArrow: {
    width: wp(20),
    height: hp(20),
    marginLeft: wp(10),
  },
  navBar: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    height: hp(55),
    marginTop: hp(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  borderBottomWidth: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  headerTitle: {
    fontSize: hp(16),
    fontFamily: Typography.fontFamily.SoraMedium,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.WHITE,
  },
});

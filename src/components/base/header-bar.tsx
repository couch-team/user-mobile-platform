import { deviceWidth, hp, wp } from 'constants/layout';
import React, { ReactElement } from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';
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
  headerRight?: ReactElement;
}

const HeaderBar = ({
  onPressLeftIcon,
  onPressRightIcon,
  hasBackButton,
  hasBorderBottom,
  backgroundColor,
  rightHeader,
  rightIcon,
  hasLeftButton,
  headerRight,
  headerTitle,
}: HeaderBarProps) => {
  const renderHeaderLeft = () => {
    if (hasBackButton) {
      return (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.headerLeftIconContainer]}
            onPress={onPressLeftIcon}>
            <Image
              source={Images['arrow-left-circle']}
              resizeMode="contain"
              style={[styles.backIcon]}
            />
          </TouchableOpacity>
        </>
      );
    }
    if (hasLeftButton) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.headerLeftIconContainer]}
          onPress={onPressLeftIcon}>
          <Image
            source={hasLeftButton}
            resizeMode="contain"
            style={[styles.backIcon]}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.headerRightIconContainer]}
          onPress={onPressRightIcon}>
          <Image
            source={rightIcon}
            resizeMode="contain"
            style={[styles.backIcon]}
          />
        </TouchableOpacity>
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
  headerContainer: {
    backgroundColor: Colors.WHITE,
    width: deviceWidth,
    marginTop: hasDynamicIsland() || hasNotch() ? 0 : hp(15),
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

export default HeaderBar;

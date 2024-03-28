import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { LongButton, BaseModal } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface PrivacyModalProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const PrivacyModal = ({
  isVisible,
  onClose,
  onComplete,
}: PrivacyModalProps) => {

  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile,
  );
  
  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View>
          <View style={styles.shieldIconContainer}>
            <Image
              source={Images.shield}
              resizeMode="contain"
              style={styles.shieldIcon}
            />
          </View>
          <Text style={styles.profileName}>Hey {authProfileDetails?.first_name},</Text>
          <Text style={styles.headerText}>
            we care about your privacy as much as you do.
          </Text>
          <Text style={styles.instructionText}>
            We understand your love for privacy. And would love to assure you
            that all data submitted on the couch platform is guaranteed a 100%
            security.
          </Text>
          <Image
            source={Images.line}
            resizeMode="contain"
            style={styles.lineIcon}
          />

          <LongButton
            onPress={() => onComplete()}
            isNotBottom
            buttonStyle={styles.buttonStyle}
            title="Awesome, proceed"
          />
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_MODAL_100,
    paddingVertical: hp(16),
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
    paddingBottom: hp(50),
  },
  shieldIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: Colors.COUCH_BLUE_600,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(20),
    borderRadius: 100,
  },
  shieldIcon: {
    width: wp(50),
    height: hp(50),
  },
  profileName: {
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.COUCH_BLUE,
    fontSize: hp(14),
    paddingTop: hp(31),
    textAlign: 'center',
  },
  headerText: {
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.WHITE,
    fontSize: hp(24),
    textAlign: 'center',
  },
  instructionText: {
    paddingTop: hp(30),
    paddingHorizontal: wp(20),
    color: Colors.PLACEHOLDER_COLOR,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraRegular,
    lineHeight: hp(20),
    fontSize: hp(12),
  },
  lineIcon: {
    marginTop: hp(40),
    alignSelf: 'center',
    width: wp(61),
    height: hp(12),
  },
  buttonStyle: {
    marginTop: hp(40),
  },
});

export default PrivacyModal;

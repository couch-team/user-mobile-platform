import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { BaseModal } from 'components';
import { RecordIcon } from 'assets/svg/record';

interface VoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const VoiceModal = ({ isVisible, onClose }: VoiceModalProps) => {
  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View>
          <View style={styles.dateBtn}>
            <Text style={styles.dateText}>Today</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.record}>
            <RecordIcon />
          </TouchableOpacity>
          <View style={styles.dateBtn}>
            <Text style={styles.tapText}>Tap Icon to Record</Text>
          </View>
          <View style={styles.optionContainer}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images['note-pause']}
                resizeMode="contain"
                style={styles.option}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.stop}>
              <Image
                source={Images['note-stop']}
                resizeMode="contain"
                style={styles.option}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.optionContainer, styles.footerOption]}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images['note-retry']}
                resizeMode="contain"
                style={styles.optionLarge}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.cancel}>
              <Image
                source={Images['note-cancel']}
                resizeMode="contain"
                style={styles.optionLarge}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images['note-check']}
                resizeMode="contain"
                style={styles.optionLarge}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_MODAL_100,
    paddingTop: hp(25),
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
    paddingBottom: hp(50),
  },
  dateBtn: {
    minHeight: hp(38),
    alignSelf: 'center',
    borderRadius: hp(50),
    paddingVertical: hp(12),
    paddingHorizontal: wp(14),
    backgroundColor: Colors.COUCH_GREEN_300,
  },
  dateText: {
    fontSize: hp(12),
    color: Colors.DATE_COLOR,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  tapText: {
    fontSize: hp(12),
    color: Colors.COUCH_INFO_BLUE,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  record: {
    marginTop: hp(28),
    marginBottom: hp(40),
  },
  optionContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: hp(64),
    backgroundColor: Colors.COUCH_BLUE_1500,
  },
  option: {
    width: 48,
    height: 48,
  },
  footerOption: {
    backgroundColor: undefined,
  },
  optionLarge: {
    width: 56,
    height: 56,
  },
  stop: {
    marginLeft: wp(8),
  },
  cancel: {
    marginHorizontal: wp(16),
  },
});

export default VoiceModal;

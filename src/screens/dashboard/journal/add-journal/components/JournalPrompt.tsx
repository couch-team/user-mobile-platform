import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { BaseModal } from 'components';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface JournalPromptModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const JournalPromptModal = ({
  isVisible,
  onClose,
}: JournalPromptModalProps) => {
  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.headerLeftIconContainer}
            onPress={onClose}>
            <Image
              source={Images['arrow-left-circle']}
              resizeMode="contain"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.dateBtn}>
            <Text style={styles.dateText}>Today</Text>
          </View>
          <Text style={styles.title}>Journal prompt:</Text>
          <Text style={styles.headerText}>
            What makes you get up every morning to do the things you do.
          </Text>
          <Text style={styles.instructionText}>
            Use these cool ideas as inspiration for journaling
          </Text>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    backgroundColor: Colors.PRIMARY_MODAL_100,
    paddingVertical: hp(16),
    borderTopLeftRadius: hp(16),
    borderTopRightRadius: hp(16),
    paddingBottom: hp(50),
  },
  backIcon: {
    width: wp(24),
    height: hp(24),
  },
  headerLeftIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: wp(8),
    fontFamily: Typography.fontFamily.SoraBold,
    color: Colors.COUCH_BLUE,
    fontSize: hp(20),
    paddingVertical: hp(28),
    textAlign: 'center',
  },
  headerText: {
    paddingHorizontal: wp(8),
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.COUCH_BLUE_1100,
    fontSize: hp(18),
    textAlign: 'center',
  },
  instructionText: {
    paddingHorizontal: wp(8),
    paddingTop: hp(80),
    color: Colors.FOOTER_COLOR,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.SoraSemiBold,
    lineHeight: hp(20),
    fontSize: hp(12),
  },
  dateBtn: {
    marginTop: hp(18),
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
});

export default JournalPromptModal;

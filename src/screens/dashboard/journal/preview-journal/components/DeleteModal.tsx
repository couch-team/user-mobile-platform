import {  StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BaseModal, LongButton } from 'components';
import { wp, hp } from 'constants/layout';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPressDeleteNo?: () => any;
  onPressDeleteYes?: () => any;
}

export default function DeleteModal({
  isVisible,
  onClose,
  onPressDeleteNo,
  onPressDeleteYes,
}: SettingsModalProps) {
  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={{ marginTop: wp(50), marginLeft: wp(24) }}>
        <Text style={{ color: '#E3E4F8', fontSize: wp(16), fontWeight: '700' }}>
          Are you sure to delete this note? this action cannot be reverted.
        </Text>

        <Text style={{ color: '#9F98B2', fontSize: wp(14), marginTop: wp(10), lineHeight: wp(20) }}>
          This would terminate the video session and any minutes left in the
          therapy session would not be available anymore
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <LongButton
            onPress={onPressDeleteYes}
            titleStyle={{
              fontWeight: '900',
              fontSize: wp(14),
              color: "#F78282"
            }}
            title="Yes, Delete Note"
            buttonStyle={styles.buttonStyleYes}
          />
        </View>
        <View>
          <LongButton
            onPress={onPressDeleteNo}
            title="No, This was a Mistake"
            titleStyle={{ color: '#8A8EE3', fontWeight: '900', fontSize: wp(14) }}
            buttonStyle={styles.buttonStyleNo}
          />
        </View>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: wp(160),
    width: wp(50),
    height: hp(30),
    marginTop: wp(250),
  },
  buttonStyleYes: {
    marginBottom: hp(100),
    backgroundColor: "#E5000029",
  },
  buttonStyleNo: {
    backgroundColor: '#E6E7F914',
  },
  editIcon: {
    height: hp(34),
  },
});

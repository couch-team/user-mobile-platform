/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LongButton } from 'components';
import { wp, hp } from 'constants/layout';
import { Colors, Images, Typography } from 'theme/config';
import DeleteModal from './DeleteModal';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPressEdit?: () => any;
  onPressDelete?: () => any;
}

export default function SettingsModal({
  isVisible,
  onClose,
  onPressEdit,
  onPressDelete,
}: SettingsModalProps) {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={[
          styles.modalBackdrop,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        ]}>
        <Pressable onPress={() => {}} style={[styles.modalContainer]}>
          <View style={{ marginTop: wp(50), marginLeft: wp(24) }}>
            <Text
              style={{ color: 'white', fontSize: wp(16), fontWeight: '900' }}>
              More Options
            </Text>
          </View>
          <View style={styles.container}>
            <View>
              <LongButton
                onPress={onPressEdit}
                icon={
                  <Image
                    source={Images.edit}
                    resizeMode="contain"
                    style={styles.editIcon}
                  />
                }
                titleStyle={{
                  fontWeight: '900',
                  fontSize: wp(14),
                  color: '#A2A5E9',
                }}
                title="Edit Note"
                buttonStyle={styles.buttonStyle}
              />
            </View>
            <View>
              <LongButton
                onPress={onPressDelete}
                icon={
                  <Image
                    source={Images.delete}
                    resizeMode="contain"
                    style={styles.editIcon}
                  />
                }
                title="Delete Note"
                titleStyle={{
                  color: '#F56969',
                  fontWeight: '900',
                  fontSize: wp(14),
                }}
                buttonStyle={styles.button2Style}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
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
  buttonStyle: {
    marginBottom: hp(100),
    backgroundColor: Colors.COUCH_BLUE_1000,
  },
  button2Style: {
    backgroundColor: Colors.COUCH_BLUE_1000,
  },
  editIcon: {
    height: hp(34),
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: Colors.white,
    width: '100%',
    height: '40%',
    // flex: 1,
    position: 'relative',
    // bottom: 0,
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

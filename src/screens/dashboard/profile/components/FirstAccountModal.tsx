/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  visible: boolean;
  onClose: () => void;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  onClick?: () => void;
  setSecondModal: () => void;
}

const FirstAccountModal = ({
  visible,
  onClose,
  animationType,
  setSecondModal,
}: Props) => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={[
          styles.modalBackdrop,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        ]}>
        <Pressable onPress={() => {}} style={[styles.modalContainer]}>
          <Image
            source={Images['modal-img']}
            style={{ width: '100%', height: 239, resizeMode: 'contain' }}
          />

          <Text style={{ color: 'white', fontSize: 18 }}>
            Why would you like to change your email address?
          </Text>

          <View style={{ gap: 20, marginTop: 20 }}>
            <Pressable
              style={{
                backgroundColor: 'rgba(238, 239, 251, 0.08)',
                borderRadius: 64,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onClose();
                setSecondModal();
              }}>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                No longer have access to this email address
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: 'rgba(238, 239, 251, 0.08)',
                borderRadius: 64,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onClose();
                setSecondModal();
              }}>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                Email address has been compromised
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: 'rgba(238, 239, 251, 0.08)',
                borderRadius: 64,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onClose();
                setSecondModal();
              }}>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                Mistakenly registered using this email address
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FirstAccountModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

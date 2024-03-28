/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';
import { FormTextInput } from 'components';

interface Props {
  visible: boolean;
  onClose: () => void;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  modalEmail: string;
  setModalEmail: (text: string) => void;
  setShowThirdModal: () => void;
}

const SecondAccountModal = ({
  visible,
  onClose,
  animationType,
  modalEmail,
  setModalEmail,
  setShowThirdModal,
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
            Kindly Enter new email address
          </Text>

          <View style={{ marginTop: 20 }}>
            <FormTextInput
              label="Email address"
              editable
              placeholder="Enter your email"
              // autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text: string) => setModalEmail(text)}
              value={modalEmail}
              containerStyle={{ width: '100%' }}
            />

            <Pressable
              style={{
                backgroundColor: 'rgba(115, 120, 222, 1)',
                padding: 12,
                borderRadius: 64,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !modalEmail ? 0.4 : 1,
                marginTop: 10,
              }}
              onPress={() => {
                onClose();
                setShowThirdModal();
              }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 16,
                }}>
                Continue
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SecondAccountModal;

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

/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  visible: boolean;
  onClose: () => void;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  takePicture: () => void;
  pickImage: () => Promise<void>;
}

const ProfilePictureModal = ({
  visible,
  onClose,
  animationType,
  takePicture,
  pickImage,
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
          <Text
            style={{
              fontFamily: Typography.fontFamily.SoraMedium,
              fontSize: 20,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Change Profile Picture
          </Text>

          <View style={{ marginTop: 30, gap: 20 }}>
            <Pressable
              style={{
                backgroundColor: 'rgba(247, 247, 253, 0.1)',
                padding: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 256,
                gap: 12,
              }}
              onPress={() => {
                onClose();
                pickImage();
              }}>
              <Image
                source={Images['select-image']}
                style={{ width: 36, height: 36, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 16,
                  color: 'rgba(115, 120, 222, 1)',
                }}>
                Select Image from Gallery
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: 'rgba(247, 247, 253, 0.1)',
                padding: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 256,
                gap: 12,
              }}
              onPress={() => {
                onClose();
                takePicture();
              }}>
              <Image
                source={Images['take-picture']}
                style={{ width: 36, height: 36, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 16,
                  color: 'rgba(255, 184, 0, 1)',
                }}>
                Take a picture
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ProfilePictureModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: Colors.white,
    width: '100%',
    height: 250,
    // flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

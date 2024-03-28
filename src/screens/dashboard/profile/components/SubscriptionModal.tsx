/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  visible: boolean;
  onClose: () => void;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  subType: string;
  subDesc: string;
}

const SubscriptionModal = ({
  visible,
  onClose,
  animationType,
  subType,
  subDesc,
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
          <View
            style={{
              backgroundColor: subType === 'Freemuium' ? '#7378DE' : '#0F1141',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              paddingVertical: 40,
              borderTopLeftRadius: 20,
              borderTopEndRadius: 20,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 32,
                fontFamily: Typography.fontFamily.SoraBold,
              }}>
              {subType}
            </Text>
            <Text
              style={{
                color: subType === 'Freemium' ? '#9F98B2' : '#E3E4F8',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              }}>
              {subDesc}
            </Text>
          </View>

          <View
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            <Image
              source={Images['subscription-modal-icon']}
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: '#E3E4F8',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              }}>
              Pro Plan , Monthly — May
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 20,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            <Image
              source={Images['subscription-modal-icon']}
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: '#E3E4F8',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              }}>
              Pro Plan , Monthly — May
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 20,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            <Image
              source={Images['subscription-modal-icon']}
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: '#E3E4F8',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraRegular,
              }}>
              Pro Plan , Monthly — May
            </Text>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 20 }}>
            <Pressable
              style={{
                backgroundColor: 'rgba(115, 120, 222, 1)',
                padding: 12,
                borderRadius: 64,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                onClose();
              }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 16,
                }}>
                Start Subscription
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SubscriptionModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'relative',
    // paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

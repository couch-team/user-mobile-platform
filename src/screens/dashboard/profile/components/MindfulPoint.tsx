/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  animationType: 'none' | 'slide' | 'fade' | undefined;
}

const MIndfulPoint = ({ onClose, title, visible, animationType }: Props) => {
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        ]}>
        <Pressable onPress={() => {}} style={[styles.modalContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 24,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {title}
            </Text>
            <Pressable
              style={{
                backgroundColor: 'rgba(243, 243, 252, 0.12)',
                padding: 10,
                borderRadius: 100,
              }}
              onPress={onClose}>
              <Image
                source={Images['cancel-audio']}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: 'rgba(243, 232, 252, 0.04)',
              margin: 20,
              padding: 15,
              borderRadius: 16,
              gap: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(226, 202, 248, 0.08)',
                  padding: 10,
                  borderRadius: 100,
                }}>
                <Image
                  source={Images.heart}
                  style={{ width: 36, height: 34, resizeMode: 'contain' }}
                />
              </View>

              <View />
            </View>

            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontSize: 23,
                fontFamily: Typography.fontFamily.SoraRegular,
                lineHeight: 28,
              }}>
              Earn points when you use free and premium tools to earn a free
              subscription, some merch and other cool items!!
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MIndfulPoint;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'relative',
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
    paddingBottom: 30,
  },
});

/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  data: any[];
}

const ProfileNumbersModal = ({
  visible,
  onClose,
  title,
  animationType,
  data,
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {data?.map(info => (
              <View
                style={{
                  backgroundColor: 'rgba(253, 249, 238, 0.04)',
                  padding: 20,
                  margin: 10,
                  width: '43%',
                  borderRadius: 16,
                }}
                key={info.id}>
                <View
                  style={{
                    backgroundColor: 'rgba(255, 245, 203, 0.12)',
                    // padding: 10,
                    paddingVertical: 10,
                    width: 45,
                    alignItems: 'center',
                    borderRadius: 100,
                  }}>
                  <Image
                    source={info.imgUrl}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      tintColor:
                        info.title === 'Podcasts Saved'
                          ? 'rgba(249, 114, 211, 1)'
                          : info.title === 'Podcasts Played'
                          ? 'rgba(0, 194, 136, 1)'
                          : info.title === 'Replies you’ve given'
                          ? 'rgba(255, 184, 0, 1)'
                          : undefined,
                    }}
                  />
                </View>

                <View style={{ marginTop: 20, gap: 16 }}>
                  <Text
                    style={{
                      color: 'rgba(227, 228, 248, 1)',
                      fontFamily: Typography.fontFamily.SoraBold,
                      fontSize: 24,
                    }}>
                    {info.value}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(159, 152, 178, 1)',
                      fontFamily: Typography.fontFamily.SoraRegular,
                      fontSize: 14,
                    }}>
                    {info.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ProfileNumbersModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: Colors.white,
    width: '100%',
    // height: '95%',
    // flex: 1,
    position: 'relative',
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});

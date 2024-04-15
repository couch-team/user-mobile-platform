/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Image, Modal, Pressable } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { Images } from 'theme/config';

interface JournalPromptModalProps {
  showPreviewImage: boolean;
  onClose: () => void;
  currentIndex: number;
  previewImages: string[];
}

const ImageSlideShow = ({
  showPreviewImage,
  onClose,
  currentIndex,
  previewImages,
}: JournalPromptModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPreviewImage}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={[
          {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        ]}>
        <Pressable
          style={{
            backgroundColor: 'rgba(227, 228, 248, 0.4)',
            padding: 7,
            borderRadius: 64,
            position: 'absolute',
            right: 10,
            top: 50,
          }}
          onPress={onClose}>
          <Image
            source={Images['cancel-image']}
            style={{ width: 22, height: 22, resizeMode: 'contain' }}
          />
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onClose}>
          <Swiper
            loop={false}
            showsButtons={false}
            scrollEnabled={true}
            index={currentIndex}
            showsPagination={false}>
            {previewImages.map((image, index) => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onClose}
                key={index}>
                <Pressable>
                  <Image
                    source={{ uri: image }}
                    key={index}
                    style={{
                      width: Dimensions.get('window').width,
                      height: 400,
                      borderRadius: 8,
                      resizeMode: 'cover',
                      overflow: 'hidden',
                    }}
                  />
                </Pressable>
              </Pressable>
            ))}
          </Swiper>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ImageSlideShow;

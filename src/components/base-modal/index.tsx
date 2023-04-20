import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Platform,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';

interface BaseModalProps {
  visible?: boolean;
  children: any;
  onClose?: () => void;
  containerStyles?: any;
  removeBackTap?: boolean;
}

const BaseModal = ({
  visible,
  children,
  onClose,
  containerStyles,
  removeBackTap,
}: BaseModalProps) => {
  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      animationIn="slideInUp"
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={[styles.container, containerStyles]}
      propagateSwipe={true}
      backdropOpacity={0.8}
      // eslint-disable-next-line prettier/prettier
      onBackdropPress={removeBackTap ? () => { } : onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : undefined}
          enabled
          style={styles.generalContainer}
          pointerEvents="box-none">
          <View style={[styles.dialogContainer]}>{children}</View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BaseModal;

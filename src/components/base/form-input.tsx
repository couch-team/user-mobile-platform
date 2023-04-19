import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { Colors, Images, Typography } from '../../theme/config';
import { hp, wp } from '../../constants/layout';

interface FormTextInputProps extends RNTextInputProps {
  label?: string;
  value?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  show?: boolean;
  showPassword?: () => void;
  inputIcon?: ImageSourcePropType;
}

const FormTextInput = forwardRef<RNTextInput, FormTextInputProps>(
  (
    {
      label,
      value,
      containerStyle,
      isPassword,
      show,
      showPassword,
      inputIcon,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    return (
      <View style={styles.formInputContainer}>
        <View style={styles.formLabelContainer}>
          <Text style={styles.formLabelText}>{label}</Text>
          {inputIcon && (
            <TouchableOpacity>
              <Image
                source={inputIcon}
                resizeMode="contain"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <RNTextInput
          style={[
            styles.textInput,
            focused && styles.focusedStyle,
            containerStyle,
          ]}
          focusable={true}
          value={value}
          selectionColor={Colors.COUCH_BLUE}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={show}
          placeholderTextColor={Colors.PLACEHOLDER_COLOR}
          {...{ ref }}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity style={styles.lock} onPress={showPassword}>
            <Image
              source={Images['eye-off']}
              resizeMode="contain"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    height: hp(54),
    width: wp(333),
    borderWidth: 1,
    borderRadius: hp(64),
    borderColor: Colors.TEXTBORDER_COLOR,
    paddingLeft: hp(18),
    fontFamily: Typography.fontFamily.SoraRegular,
    color: Colors.WHITE,
  },
  formInputContainer: {
    marginBottom: hp(24),
  },
  formLabelContainer: {
    marginBottom: hp(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formLabelText: {
    fontSize: hp(14),
    lineHeight: hp(18),
    fontFamily: Typography.fontFamily.SoraMedium,
    color: Colors.COUCH_BLUE,
  },
  eyeIcon: {
    width: wp(16),
    height: hp(16),
  },
  focusedStyle: {
    borderWidth: 2,
    borderColor: Colors.COUCH_BLUE,
    shadowColor: 'rgba(243, 243, 252, 0.12)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  lock: {
    position: 'absolute',
    right: hp(20),
    bottom: hp(15),
    height: hp(20),
    width: hp(20),
  },
  lockText: {
    position: 'absolute',
    right: hp(10),
    top: hp(16),
    backgroundColor: Colors.PRIMARY,
    padding: hp(12),
    borderRadius: hp(8),
  },
  text: {
    color: Colors.WHITE,
  },
});

export default FormTextInput;

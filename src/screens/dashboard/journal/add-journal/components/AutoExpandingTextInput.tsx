import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './style';
import { Colors } from 'theme/config';

export const AutoExpandingTextInput = (props: TextInputProps) => {
  const [height, setHeight] = useState<number>();
  return (
    <TextInput
      {...props}
      multiline
      placeholder="Enter your content"
      placeholderTextColor={Colors.COUCH_GREEN_400}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      style={[styles.inputStyle, props.style, { height: height }]}
    />
  );
};

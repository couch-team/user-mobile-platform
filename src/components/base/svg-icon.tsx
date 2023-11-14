import React from 'react';
import { View } from 'react-native';
import { NumberProp, SvgXml } from 'react-native-svg';
import { getMarkup } from 'assets/svg/markup';

type Props = {
  name: string;
  color?: string;
  width?: NumberProp;
  height?: NumberProp;
};

const SvgImage = ({ color, name }: Props) => (
  <SvgXml xml={getMarkup(color)[name]} />
);

export const SVGIcon = ({ name, color, width, height }: Props) => {
  return (
    <View pointerEvents="none">
      <SvgImage color={color} name={name} width={width} height={height} />
    </View>
  );
};

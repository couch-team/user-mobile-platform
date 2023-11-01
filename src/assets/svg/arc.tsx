import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export interface IconsProps {
  width: number;
  height: number;
}

export function ArcIcon({ width, height }: IconsProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 430 41" fill="none">
      <Circle cx="215" cy="900" r="900" fill="#0C0E34" />
    </Svg>
  );
}

ArcIcon.defaultProps = {
  height: 41,
  width: 430,
};

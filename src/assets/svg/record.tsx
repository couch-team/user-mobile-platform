import React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { Colors } from 'theme/config';

export interface IconsProps {
  width: number;
  height: number;
  primaryColor: string;
  secondaryColor: string;
}

export function RecordIcon({
  width,
  height,
  primaryColor,
  secondaryColor,
}: IconsProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 236 320" fill="none">
      <Circle cx="118" cy="90" r="90" fill={primaryColor} fillOpacity="0.04" />
      <Path
        d="M151.541 74.9891C154.023 74.6402 156.317 76.342 156.662 78.7976C159.469 98.7752 146.472 117.424 127.142 122.4L128.398 131.339C128.743 133.79 127.008 136.062 124.526 136.411C122.039 136.761 119.75 135.054 119.405 132.603L118.149 123.664C98.1914 124.209 80.5574 109.866 77.7497 89.8879C77.4046 87.4323 79.1401 85.1643 81.6223 84.8155C84.1045 84.4666 86.3979 86.1684 86.743 88.624C89.0739 105.209 104.636 116.783 121.435 114.422C138.23 112.062 149.999 96.6466 147.668 80.0615C147.323 77.6059 149.059 75.3379 151.541 74.9891ZM112.287 43.46C121.546 42.1587 130.211 47.2079 133.778 55.2603C134.268 56.3643 133.56 57.6275 132.355 57.7968L127.099 58.5356C125.511 58.7587 124.399 60.21 124.619 61.7775C124.841 63.3539 126.31 64.4425 127.897 64.2194L132.745 63.5381C134.35 63.3125 135.834 64.4125 136.057 65.9978C136.28 67.583 135.156 69.0496 133.551 69.2752L128.704 69.9565C127.116 70.1795 126.005 71.6353 126.226 73.2073C126.446 74.7747 127.916 75.8678 129.503 75.6447L134.351 74.9634C135.956 74.7378 137.44 75.8378 137.664 77.4275C137.886 79.0083 136.762 80.4749 135.157 80.7005L130.309 81.3818C128.722 81.6049 127.611 83.0606 127.832 84.6326C128.052 86.2 129.521 87.2886 131.108 87.0656L136.108 86.3628C137.341 86.1897 138.389 87.2558 138.165 88.4647C136.613 96.7701 129.844 103.554 120.909 104.809L119.286 105.038C108.13 106.605 97.832 98.9465 96.2843 87.9342L93.2682 66.4734C91.7199 55.4567 99.5077 45.256 110.664 43.6881L112.287 43.46Z"
        fill={secondaryColor}
      />
      <G opacity="0.08">
        <Rect y="220" width="10" height="100" rx="5" fill={primaryColor} />
        <Rect
          x="30"
          y="240"
          width="10"
          height="60"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="60"
          y="229.5"
          width="10"
          height="81"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="83"
          y="220"
          width="10"
          height="100"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="113"
          y="240"
          width="10"
          height="60"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="143"
          y="229.5"
          width="10"
          height="81"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="166"
          y="220"
          width="10"
          height="100"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="196"
          y="240"
          width="10"
          height="60"
          rx="5"
          fill={primaryColor}
        />
        <Rect
          x="226"
          y="229.5"
          width="10"
          height="81"
          rx="5"
          fill={primaryColor}
        />
      </G>
    </Svg>
  );
}

RecordIcon.defaultProps = {
  height: 320,
  width: 236,
  primaryColor: Colors.COUCH_BLUE_1100,
  secondaryColor: Colors.COUCH_BLUE,
};

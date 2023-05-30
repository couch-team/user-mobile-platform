import React from 'react';
import { View, Image } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';

export const Watch = () => {
  return (
    <View style={styles.recommendedSectionContainer}>
      <Image
        source={Images.videos}
        resizeMode="contain"
        style={styles.videoImage}
      />
    </View>
  );
};

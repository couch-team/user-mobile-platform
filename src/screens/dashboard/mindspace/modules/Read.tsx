import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';
import { categories } from 'constants/data';

export const Read = () => {
  return (
    <View style={styles.recommendedSectionContainer}>
      <Image
        source={Images.videos}
        resizeMode="contain"
        style={styles.videoImage}
      />
      <Text style={styles.categoriesHeaderText}>Categories</Text>
      <View style={styles.categoriesListContainer}>
        {categories?.map(category => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.categoryListItemContainer}>
              <View style={styles.voiceNoteIconContainer}>
                <Image
                  source={Images.paper}
                  resizeMode="contain"
                  style={[
                    styles.voiceNoteIcon,
                    { tintColor: category.tintColor },
                  ]}
                />
              </View>
              <Text style={styles.categoryListText}>{category.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

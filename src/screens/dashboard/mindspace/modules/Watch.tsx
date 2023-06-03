import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';
import { categories } from 'constants/data';
import HeaderText from 'components/base/header-text';

export const Watch = () => {
  return (
    <View style={styles.recommendedSectionContainer}>
      <Image
        source={Images.videos}
        resizeMode="contain"
        style={styles.videoImage}
      />
      <Text style={[styles.categoriesHeaderText, styles.noPaddingHorizontal]}>
        Categories
      </Text>
      <View style={styles.categoriesListContainer}>
        {categories?.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.categoryListItemContainer}>
              <View style={styles.voiceNoteIconContainer}>
                <Image
                  source={Images['voice-note']}
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
      <View style={styles.recentlyReadContainer}>
        <View style={styles.recentlyReadHeaderContainer}>
          <HeaderText
            text="Recently Watched"
            textStyle={styles.textStyle}
            headerTextStyle={styles.headerTextStyle}
            hasSubText="Track your mood and feel better"
          />
          <TouchableOpacity style={styles.arrowIconContainer}>
            <Image
              source={Images['arrow-right-circle']}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

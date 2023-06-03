/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';
import { categories, recentlyRead } from 'constants/data';
import HeaderText from 'components/base/header-text';
import { navigation } from 'navigation/utils';

export const Read = () => {
  return (
    <View style={styles.recommendedSectionContainer}>
      <Image
        source={Images.text}
        resizeMode="contain"
        style={[styles.videoImage, { marginHorizontal: 0 }]}
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
      <View style={styles.recentlyReadContainer}>
        <View style={styles.recentlyReadHeaderContainer}>
          <HeaderText
            text="Recently Read"
            textStyle={styles.textStyle}
            headerTextStyle={styles.headerTextStyle}
            hasSubText="Track your mood and feel better"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RecentlyPlayedText')}
            style={styles.arrowIconContainer}>
            <Image
              source={Images['arrow-right-circle']}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.readItemListContainer}>
          {recentlyRead.map(read => {
            return (
              <View key={read.id} style={styles.singleReadItemContainer}>
                <Image
                  source={read.image}
                  resizeMode="contain"
                  style={styles.readImage}
                />
                <Text style={styles.readTextTitle}>{read.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

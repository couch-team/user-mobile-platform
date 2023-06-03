import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from 'theme/config';
import { styles } from './style';
import { categories, recentlyWatched } from 'constants/data';
import HeaderText from 'components/base/header-text';
import { RecentlyWatchedVideo } from '../components';

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
                  source={Images.play}
                  resizeMode="contain"
                  style={[
                    styles.voiceNoteIcon,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { tintColor: category.tintColor, left: 2 },
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.arrowIconContainer}>
            <Image
              source={Images['arrow-right-circle']}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recentlyReadContainer}>
          {recentlyWatched.map((watched, index) => {
            return <RecentlyWatchedVideo key={index} watched={watched} />;
          })}
        </View>
      </View>
    </View>
  );
};

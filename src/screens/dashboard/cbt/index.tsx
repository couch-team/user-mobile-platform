import { HeaderBar } from 'components/base/header-bar';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderText } from 'components/base/header-text';
import { cbtData } from 'constants/data';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

type ScreenProps = StackScreenProps<DashboardParamList, 'Cbt'>;

const Cbt = ({ navigation: { navigate, goBack } }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
            <HeaderText
              text="CBT Exercises"
              hasSubText="Join Individuals of like minds and share."
            />
          </>
        )}
        data={cbtData}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate('SingleCbt', { item })}
              style={styles.cbtItemContainer}
              key={index}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.cbtImageStyle}
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.45),', 'rgba(0, 0, 0, 0.45),']}
                style={styles.cbtImageGradientStyle}>
                <View>
                  <Text style={styles.cbtHeaderTitleText}>{item?.title}</Text>
                  <Text style={styles.cbtSubHeaderText}>
                    {item?.description}
                  </Text>
                  <View style={styles.cbtItemFeaturesContainer}>
                    {item?.options?.map(option => {
                      return (
                        <View style={styles.cbtItemBodyContainer} key={option}>
                          <Text style={styles.cbtItemText}>{option}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Cbt;

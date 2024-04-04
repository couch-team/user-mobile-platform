import { HeaderBar } from 'components/base/header-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { HeaderText } from 'components/base/header-text';
import { DashboardParamList } from 'utils/types/navigation-types';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { $api } from 'services';
import { Colors, Images } from 'theme/config';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { groupTransactions } from 'utils';
import { fetchCbts } from 'store/actions/cbt';
import useAppDispatch from 'hooks/useAppDispatch';

type ScreenProps = StackScreenProps<DashboardParamList, 'Cbt'>;

const Cbt = ({ navigation: { navigate, goBack } }: ScreenProps) => {
  const dispatch = useAppDispatch();
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(() => {
    dispatch(fetchCbts(currentPage))
  }, [ currentPage ]);

  const { cbts, isFetchingCbts, hasFetchedCbts, reached_end } = useSelector((state: RootState) => state.Cbt);

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
        onEndReached={() => !reached_end && !isFetchingCbts && setCurrentPage(currentPage + 1)}
        data={cbts}
        ListEmptyComponent={
          !isFetchingCbts
            ?
          <View style={styles.emptyMoodTrackerContainer}>
          <View style={styles.emptyMoodIconContainer}>
            <Image
              source={Images['empty-mood']}
              resizeMode="contain"
              style={styles.emptyMoodIcon}
            />
          </View>
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyMainText}>
              No cbt exercises yet
            </Text>
            <Text style={styles.emptyBodyText}>
              Cbt exercises will be added soon
            </Text>
          </View>
        </View>
          :
          <View></View>
        }
        ListFooterComponent={
          reached_end 
            ?  
            cbts?.length > 0
              ?           
              <View style={styles.reachedEndContainer}>
                <Text style={styles.reachedEnd}>You have reached the end! 🎉</Text>
              </View>
              :
              <View style={styles.reachedEndContainer}></View>
            :
            (hasFetchedCbts && isFetchingCbts)
              ?
              <View style={styles.reachedEndContainer}>
                <ActivityIndicator size={'small'} color={Colors.WHITE}/>
              </View>
              :
              <View style={styles.reachedEndContainer}></View>
        }
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate('SingleCbt', { id: item?.id })}
              style={styles.cbtItemContainer}
              key={index}>
              <Image
                source={{ uri: item?.background_url }}
                resizeMode="cover"
                style={styles.cbtImageStyle}
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.45),', 'rgba(0, 0, 0, 0.45),']}
                style={styles.cbtImageGradientStyle}>
                <View>
                  <Text style={styles.cbtHeaderTitleText}>{item?.title}</Text>
                  <Text style={styles.cbtSubHeaderText}>
                    {item?.sub_title}
                  </Text>
                  <View style={styles.cbtItemFeaturesContainer}>
                    {item?.tags?.map((tag: any)=> {
                      return (
                        <View style={styles.cbtItemBodyContainer} key={tag}>
                          <Text style={styles.cbtItemText}>{tag}</Text>
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

import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardParamList } from 'utils/types/navigation-types';
import { styles } from './style';
import { MindSpaceHeader } from './components';
import { Listen, Read, Watch } from './modules';
import { HeaderBar, HeaderText } from 'components';

type ScreenProps = StackScreenProps<DashboardParamList, 'MindSpace'>;

const MindSpace = ({ navigation: { navigate, goBack } }: ScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderText
          text="Mindspace"
          hasSubText="Podcasts, Videos and other media to ease your mind"
        />
        <MindSpaceHeader
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <View style={styles.sectionListStyle}>
          {
            activeIndex === 0 
            ? 
              <View>
                <Listen />
              </View>
            :
            activeIndex === 1 
              ? 
              <View>
                <Watch />
              </View>
              :
              <View>
                <Read />
              </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MindSpace;

import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import { AuthParamList, DashboardParamList, RootNavigationRoutes } from 'utils/types/navigation-types';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { RouteProp, useNavigation } from '@react-navigation/native';

type AuthNavigationProps = StackNavigationProp<
AuthParamList,
  'CompleteOnboarding1'
>;
type Props = {
  navigation: AuthNavigationProps & DashboardParamList;

};


const CompleteOnboarding1 = ({ navigation }: Props) => {
 
  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile,
  );
  const {
    Auth: { accessDashboard,getAuthenticate },
  } = useDispatch();

  React.useEffect(() => {
    getAuthenticate()
  }, [])
  
  const continueProcess = async () => {
    accessDashboard();
    navigation.navigate("DashboardHome")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={Images['logo-white']}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.instructionTextContainer}>
          <Text style={styles.instructionBodyText}>
            {authProfileDetails?.first_name}, thanks for sharing...
          </Text>
          <Text style={[styles.instructionText, styles.topPadding]}>
            Your health details has been saved and be rest assured we would give
            the best recommendations to help you stay healthy, fit and looking
            your younger self in no time!
          </Text>
        </View>
      </View>
      <ImageBackground
        source={Images.boxes}
        resizeMode="contain"
        style={styles.boxesIcon}>
        <Image
          source={Images.gradient}
          resizeMode="cover"
          style={styles.gradientImage}
        />
        <LongButton
          buttonStyle={styles.nextStageButtonStyle}
          title="Continue to Dashboard"
          onPress={() => continueProcess()}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CompleteOnboarding1;

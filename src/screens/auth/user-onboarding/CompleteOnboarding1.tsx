import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import {
  AuthParamList,
  DashboardParamList,
  // RootNavigationRoutes,
} from 'utils/types/navigation-types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchUserDetails } from 'store/actions/userDetails';
// import { RouteProp, useNavigation } from '@react-navigation/native';

type AuthNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CompleteOnboarding1'
>;
type Props = {
  navigation: DashboardParamList & AuthNavigationProps;
};

const CompleteOnboarding1 = ({ navigation: { navigate } }: Props) => {
  const authProfileDetails = useSelector(
    (state: RootState) => state.User,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueProcess = async () => {
    navigate('DashboardHome'); // Fix: Correct the screen name to 'Dashboard'
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

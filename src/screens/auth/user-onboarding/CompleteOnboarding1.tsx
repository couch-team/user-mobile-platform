import React, { useEffect, useState } from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteProp, useNavigation } from '@react-navigation/native';
import { login as loginAction } from 'store/actions/login';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'CompleteOnboarding1'
>;
type Props = {
  navigation: DashboardParamList & AuthNavigationProps;
};

const CompleteOnboarding1 = ({ navigation }: Props) => {
  const { params } =
    useRoute<RouteProp<AuthParamList, 'CompleteOnboarding1'>>();
  const authProfileDetails = useSelector((state: RootState) => state.User);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokens = params.token;
    dispatch(fetchUserDetails(tokens));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueProcess = async () => {
    login();
    // navigate('DashboardHome'); // Fix: Correct the screen name to 'Dashboard'
  };

  const login = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        loginAction({
          email: params.email || '',
          password: params?.password || '',
        }),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
          loading={isLoading}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CompleteOnboarding1;

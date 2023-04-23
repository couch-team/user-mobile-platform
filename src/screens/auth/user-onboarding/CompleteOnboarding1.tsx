import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from '../../../theme/config';
import LongButton from 'components/base/long-button';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'CompleteOnboarding1'
>;
type Props = {
  navigation: AuthNavigationProps;
  route: any;
};

const CompleteOnboarding1 = ({ navigation: { navigate }, route }: Props) => {
  const url = route.params?.url;
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
            Daniella, thanks for sharing...
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
          title="Continue to Next Stage"
          onPress={() => navigate(url || 'UserOnboarding4')}
        />
        <LongButton
          buttonStyle={styles.saveProgressButtonStyle}
          title="Save progress"
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CompleteOnboarding1;
